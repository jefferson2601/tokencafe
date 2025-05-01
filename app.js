console.log('Aplicação iniciada!');

let web3;
let contract;
const contractAddress = "0x1BB1ac8585846178C337eC71D1fA5E3E899B7b8f"; // substitua pelo endereço real
const contractABI = [{
    "inputs":[
      {"internalType":"address","name":"_cafeX","type":"address"},
      {"internalType":"address","name":"_cafeY","type":"address"}
    ],
    "stateMutability":"nonpayable",
    "type":"constructor"
  },
  {
    "anonymous":false,
    "inputs":[
      {"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},
      {"indexed":true,"internalType":"address","name":"newOwner","type":"address"}
    ],
    "name":"OwnershipTransferred",
    "type":"event"
  },
  {
    "inputs":[],
    "name":"CAFE_X_PRICE",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"CAFE_Y_PRICE",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"account","type":"address"}],
    "name":"balanceOfCafeX",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"account","type":"address"}],
    "name":"balanceOfCafeY",
    "outputs":[{"internalType":"uint256","name":"","type":"uint256"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],
    "name":"buyCafeX",
    "outputs":[],
    "stateMutability":"payable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],
    "name":"buyCafeY",
    "outputs":[],
    "stateMutability":"payable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"cafeX",
    "outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"cafeY",
    "outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"owner",
    "outputs":[{"internalType":"address","name":"","type":"address"}],
    "stateMutability":"view",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"renounceOwnership",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[{"internalType":"address","name":"newOwner","type":"address"}],
    "name":"transferOwnership",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"withdrawETH",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "inputs":[],
    "name":"withdrawTokens",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
  }];
// Inicialização do Web3
if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    console.log('MetaMask detectado.');
} else {
    alert('MetaMask não detectado. Por favor, instale a extensão para continuar.');
}

// Conectar carteira e carregar dados
async function connectWallet() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const address = accounts[0];
        console.log('Carteira conectada:', address);

        document.getElementById('walletAddress').textContent = address;
        document.getElementById('walletInfo').classList.remove('hidden');

        contract = new web3.eth.Contract(contractABI, contractAddress);

        await loadEthBalance(address);
        await loadTokenBalances(address);

    } catch (error) {
        console.error('Erro ao conectar carteira:', error.message || error);
        alert('Erro ao conectar à carteira. Verifique o MetaMask.');
    }
}

// Criar uma nova carteira
//async function createNewWallet() {
   // try {
     //   const newAccount = web3.eth.accounts.create();
      //  const privateKey = newAccount.privateKey;
      //  const address = newAccount.address;

        // Exibe a chave privada e o endereço da nova carteira
       // document.getElementById('privateKey').textContent = privateKey;
        //document.getElementById('newWalletAddress').textContent = address;
        //document.getElementById('newWalletInfo').classList.remove('hidden');

        //alert('Nova carteira criada! Guarde sua chave privada em um local seguro.');
    //} catch (error) {
      //  console.error('Erro ao criar nova carteira:', error);
      //  alert('Erro ao criar nova carteira.');
   // }
//}//

// Carregar saldo de ETH
async function loadEthBalance(address) {
    try {
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEth = web3.utils.fromWei(balanceWei, "ether");
        document.getElementById('ethBalance').textContent = parseFloat(balanceEth).toFixed(4);
    } catch (err) {
        console.error('Erro ao buscar saldo de ETH:', err);
    }
}

// Carregar saldos dos tokens Café X e Y
async function loadTokenBalances(address) {
    try {
        const cafeX = await contract.methods.balanceOfCafeX(address).call();
        const cafeY = await contract.methods.balanceOfCafeY(address).call();

        document.getElementById('cafeXBalance').textContent = cafeX;
        document.getElementById('cafeYBalance').textContent = cafeY;
    } catch (err) {
        console.error('Erro ao buscar saldos dos tokens:', err);
    }
}

// Comprar token genérico
async function buyToken(type) {
    const inputId = type === 'X' ? 'cafeXAmount' : 'cafeYAmount';
    const amount = document.getElementById(inputId).value;

    if (!amount || amount <= 0) {
        return alert('Insira uma quantidade válida.');
    }

    const price = type === 'X' ? web3.utils.toWei("0.001", "ether") : web3.utils.toWei("0.0005", "ether");
    const totalPrice = web3.utils.toBN(price).mul(web3.utils.toBN(amount));  // Multiplicação correta de preços com a quantidade

    try {
        const accounts = await web3.eth.getAccounts();
        const methodName = type === 'X' ? 'buyCafeX' : 'buyCafeY';

        // Passando o valor total (totalPrice) e o amount para a função
        await contract.methods[methodName](web3.utils.toBN(amount)).send({
            from: accounts[0],
            value: totalPrice
        });

        alert(`Compra de Café ${type} concluída com sucesso!`);
        await loadTokenBalances(accounts[0]);

    } catch (error) {
        console.error(`Erro ao comprar Café ${type}:`, error);
        alert(`Falha na compra de Café ${type}.`);
    }
}

// Listeners
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
document.getElementById('createWalletButton').addEventListener('click', createNewWallet);
document.getElementById('buyCafeXButton').addEventListener('click', () => buyToken('X'));
document.getElementById('buyCafeYButton').addEventListener('click', () => buyToken('Y'));
