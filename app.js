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
// Inicializa Web3
if (typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    console.log('MetaMask detectado.');
} else {
    alert('MetaMask não detectado. Instale a extensão para continuar.');
}

// Conecta a carteira e carrega os dados
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

// Carrega saldo ETH
async function loadEthBalance(address) {
    try {
        const balanceWei = await web3.eth.getBalance(address);
        const balanceEth = web3.utils.fromWei(balanceWei, "ether");
        document.getElementById('ethBalance').textContent = parseFloat(balanceEth).toFixed(4);
    } catch (err) {
        console.error('Erro ao buscar saldo de ETH:', err);
    }
}

// Carrega saldos dos tokens
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

// Comprar Café X
async function buyCafeX() {
    const amount = document.getElementById('cafeXAmount').value;
    if (!amount || amount <= 0) {
        alert('Digite uma quantidade válida para comprar Café X.');
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        const pricePerToken = await contract.methods.CAFE_X_PRICE().call();
        const totalPrice = web3.utils.toBN(pricePerToken).mul(web3.utils.toBN(amount));

        contract.methods.buyCafeX(amount).send({
            from: accounts[0],
            value: totalPrice
        })
        .on('transactionHash', function(hash) {
            console.log('Hash da transação de Café X:', hash);
        })
        .on('receipt', async function(receipt) {
            try {
                console.log('Transação de Café X confirmada!', receipt);
                alert('Compra de Café X concluída!');
                await loadTokenBalances(accounts[0]);
            } catch (innerError) {
                console.error('Erro ao carregar saldo após Café X:', innerError);
            }
        })
        .on('error', function(error) {
            console.error('Erro na transação de Café X:', error);
            alert('Erro ao comprar Café X.');
        });

    } catch (error) {
        console.error('Erro inesperado na compra de Café X:', error);
        alert('Erro ao comprar Café X.');
    }
}

// Comprar Café Y
async function buyCafeY() {
    const amount = document.getElementById('cafeYAmount').value;
    if (!amount || amount <= 0) {
        alert('Digite uma quantidade válida para comprar Café Y.');
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        const pricePerToken = await contract.methods.CAFE_Y_PRICE().call();
        const totalPrice = web3.utils.toBN(pricePerToken).mul(web3.utils.toBN(amount));

        contract.methods.buyCafeY(amount).send({
            from: accounts[0],
            value: totalPrice
        })
        .on('transactionHash', function(hash) {
            console.log('Hash da transação de Café Y:', hash);
        })
        .on('receipt', async function(receipt) {
            console.log('Transação de Café Y confirmada!', receipt);
            alert('Compra de Café Y concluída!');
            await loadTokenBalances(accounts[0]);
        })
        .on('error', function(error) {
            console.error('Erro na transação de Café Y:', error);
            alert('Erro ao comprar Café Y.');
        });

    } catch (error) {
        console.error('Erro inesperado na compra de Café Y:', error);
        alert('Erro ao comprar Café Y.');
    }
}

// Eventos
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
document.getElementById('buyCafeXButton').addEventListener('click', buyCafeX);
document.getElementById('buyCafeYButton').addEventListener('click', buyCafeY);
