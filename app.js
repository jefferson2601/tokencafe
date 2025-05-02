console.log('Aplicação iniciada!');

let web3;
let contract;
const contractAddress = "0x21d188E99c1fFdE442B5fdead52eD7f545929588"; // substitua pelo endereço real
const contractABI = [{"inputs":[{"internalType":"address","name":"_cafeX","type":"address"},{"internalType":"address","name":"_cafeY","type":"address"},{"internalType":"address","name":"_cafeZ","type":"address"},{"internalType":"address","name":"_milhoX","type":"address"},{"internalType":"address","name":"_sojaA","type":"address"},{"internalType":"address","name":"_sojaT","type":"address"},{"internalType":"address","name":"_trigoX","type":"address"},{"internalType":"address","name":"_trigoY","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},
{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},
{"inputs":[],"name":"CAFE_X_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"CAFE_Y_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"CAFE_Z_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"MILHO_X_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"SOJA_A_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"SOJA_T_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"TRIGO_X_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"TRIGO_Y_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfCafeX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfCafeY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfCafeZ","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfMilhoX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfSojaA","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfSojaT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfTrigoX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOfTrigoY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyCafeX","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyCafeY","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyCafeZ","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyMilhoX","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buySojaA","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buySojaT","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyTrigoX","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyTrigoY","outputs":[],"stateMutability":"payable","type":"function"},
{"inputs":[],"name":"cafeX","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"cafeY","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"cafeZ","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"milhoX","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"sojaA","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"sojaT","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"trigoX","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"trigoY","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},
{"inputs":[],"name":"withdrawETH","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"}
];
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
      const cafeZ = await contract.methods.balanceOfCafeZ(address).call();
      const milhoX = await contract.methods.balanceOfMilhoX(address).call();
      const sojaA = await contract.methods.balanceOfSojaA(address).call();
      const sojaT = await contract.methods.balanceOfSojaT(address).call();
      const trigoX = await contract.methods.balanceOfTrigoX(address).call();
      const trigoY = await contract.methods.balanceOfTrigoY(address).call();

      document.getElementById('cafeXBalance').textContent = cafeX;
      document.getElementById('cafeYBalance').textContent = cafeY;
      document.getElementById('cafeZBalance').textContent = cafeZ;
      document.getElementById('milhoXBalance').textContent = milhoX;
      document.getElementById('sojaABalance').textContent = sojaA;
      document.getElementById('sojaTBalance').textContent = sojaT;
      document.getElementById('trigoXBalance').textContent = trigoX;
      document.getElementById('trigoYBalance').textContent = trigoY;
  } catch (err) {
      console.error('Erro ao buscar saldos dos tokens:', err);
  }
}

// Comprar Café X
async function buyCafeX() {
    const amount = document.getElementById('cafeXAmount').value;
    if (!amount || amount <= 0) {
        alert('Digite uma quantidade válida para comprar Café TX.');
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
            console.log('Hash da transação de Café TX:', hash);
        })
        .on('receipt', async function(receipt) {
            try {
                console.log('Transação de Café TX confirmada!', receipt);
                alert('Compra de Café TX concluída!');
                await loadTokenBalances(accounts[0]);
            } catch (innerError) {
                console.error('Erro ao carregar saldo após Café TX:', innerError);
            }
        })
        .on('error', function(error) {
            console.error('Sucesso na transação de Café TX:', error);
            alert('Erro ao comprar Café TX.');
        });

    } catch (error) {
        console.error('Erro inesperado na compra de Café TX:', error);
        alert('Erro ao comprar Café TX.');
    }
}

//comprar token cafeTY
async function buyCafeY() {
  const amount = document.getElementById('cafeYAmount').value;
  if (!amount || amount <= 0) {
      alert('Digite uma quantidade válida para comprar Café TY.');
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
          console.log('Hash da transação de Café TY:', hash);
      })
      .on('receipt', async function(receipt) {
          try {
              console.log('Transação de Café TY confirmada!', receipt);
              alert('Compra de Café TY concluída!');
              await loadTokenBalances(accounts[0]);
          } catch (innerError) {
              console.error('Erro ao carregar saldo após Café TY:', innerError);
          }
      })
      .on('error', function(error) {
          console.error('Erro na transação de Café TY:', error);
          alert('Erro ao comprar Café TY.');
      });

  } catch (error) {
      console.error('Erro inesperado na compra de Café TY:', error);
      alert('Erro ao comprar Café TY.');
  }
}

//comprar token cafeTZ
async function buyCafeZ() {
  const amount = document.getElementById('cafeZAmount').value;
  if (!amount || amount <= 0) {
      alert('Digite uma quantidade válida para comprar Café TZ.');
      return;
  }

  try {
      const accounts = await web3.eth.getAccounts();
      const pricePerToken = await contract.methods.CAFE_Z_PRICE().call();
      const totalPrice = web3.utils.toBN(pricePerToken).mul(web3.utils.toBN(amount));

      contract.methods.buyCafeZ(amount).send({
          from: accounts[0],
          value: totalPrice
      })
      .on('transactionHash', function(hash) {
          console.log('Hash da transação de Café TZ:', hash);
      })
      .on('receipt', async function(receipt) {
          try {
              console.log('Transação de Café TZ confirmada!', receipt);
              alert('Compra de Café TZ concluída!');
              await loadTokenBalances(accounts[0]);
          } catch (innerError) {
              console.error('Erro ao carregar saldo após Café TZ:', innerError);
          }
      })
      .on('error', function(error) {
          console.error('Erro na transação de Café TZ:', error);
          alert('Erro ao comprar Café TZ.');
      });

  } catch (error) {
      console.error('Erro inesperado na compra de Café TZ:', error);
      alert('Erro ao comprar Café TZ.');
  }
}

//comprar token milhoTX.');
async function buyMilhoX() {
  const amount = document.getElementById('milhoXAmount').value;
  if (!amount || amount <= 0) {
      alert('Digite uma quantidade válida para comprar Milho TX.');
      return;
  }

  try {
      const accounts = await web3.eth.getAccounts();
      const pricePerToken = await contract.methods.MILHO_X_PRICE().call();
      const totalPrice = web3.utils.toBN(pricePerToken).mul(web3.utils.toBN(amount));

      contract.methods.buyMilhoX(amount).send({
          from: accounts[0],
          value: totalPrice
      })
      .on('transactionHash', function(hash) {
          console.log('Hash da transação de Milho TX:', hash);
      })
      .on('receipt', async function(receipt) {
          try {
              console.log('Transação de Milho TX confirmada!', receipt);
              alert('Compra de Milho TX concluída!');
              await loadTokenBalances(accounts[0]);
          } catch (innerError) {
              console.error('Erro ao carregar saldo após Milho TX:', innerError);
          }
      })
      .on('error', function(error) {
          console.error('Erro na transação de Milho TX:', error);
          alert('Erro ao comprar Milho TX.');
      });

  } catch (error) {
      console.error('Erro inesperado na compra de Milho TX:', error);
      alert('Erro ao comprar Milho TX.');
  }
}
//comprar token SojaTA.');
async function buySojaA() {
  const amount = document.getElementById('sojaAAmount').value;
  if (!amount || amount <= 0) {
      alert('Digite uma quantidade válida para comprar Soja TA.');
      return;
  }

  try {
      const accounts = await web3.eth.getAccounts();
      const pricePerToken = await contract.methods.SOJA_A_PRICE().call();
      const totalPrice = web3.utils.toBN(pricePerToken).mul(web3.utils.toBN(amount));

      contract.methods.buySojaA(amount).send({
          from: accounts[0],
          value: totalPrice
      })
      .on('transactionHash', function(hash) {
          console.log('Hash da transação de Soja TA:', hash);
      })
      .on('receipt', async function(receipt) {
          try {
              console.log('Transação de Soja TA confirmada!', receipt);
              alert('Compra de Soja TA concluída!');
              await loadTokenBalances(accounts[0]);
          } catch (innerError) {
              console.error('Erro ao carregar saldo após Soja TA:', innerError);
          }
      })
      .on('error', function(error) {
          console.error('Erro na transação de Soja TA:', error);
          alert('Erro ao comprar Soja TA.');
      });

  } catch (error) {
      console.error('Erro inesperado na compra de Soja TA:', error);
      alert('Erro ao comprar Soja TA.');
  }
}

//comprar token sojaTT

async function buySojaT() {
  const amount = document.getElementById('sojaTAmount').value;
  if (!amount || amount <= 0) {
      alert('Digite uma quantidade válida para comprar Soja TT.');
      return;
  }

  try {
      const accounts = await web3.eth.getAccounts();
      const pricePerToken = await contract.methods.SOJA_T_PRICE().call();
      const totalPrice = web3.utils.toBN(pricePerToken).mul(web3.utils.toBN(amount));

      contract.methods.buySojaT(amount).send({
          from: accounts[0],
          value: totalPrice
      })
      .on('transactionHash', function(hash) {
          console.log('Hash da transação de Soja TT:', hash);
      })
      .on('receipt', async function(receipt) {
          try {
              console.log('Transação de Soja TT confirmada!', receipt);
              alert('Compra de Soja TT concluída!');
              await loadTokenBalances(accounts[0]);
          } catch (innerError) {
              console.error('Erro ao carregar saldo após Soja TT:', innerError);
          }
      })
      .on('error', function(error) {
          console.error('Erro na transação de Soja TT:', error);
          alert('Erro ao comprar Soja TT.');
      });

  } catch (error) {
      console.error('Erro inesperado na compra de Soja TT:', error);
      alert('Erro ao comprar Soja TT.');
  }
}
//comprar token trigoTX.');
async function buyTrigoX() {
  const amount = document.getElementById('TrigoXAmount').value;
  if (!amount || amount <= 0) {
      alert('Digite uma quantidade válida para comprar Trigo TX.');
      return;
  }

  try {
      const accounts = await web3.eth.getAccounts();
      const pricePerToken = await contract.methods.TRIGO_X_PRICE().call();
      const totalPrice = web3.utils.toBN(pricePerToken).mul(web3.utils.toBN(amount));

      contract.methods.buyTrigoX(amount).send({
          from: accounts[0],
          value: totalPrice
      })
      .on('transactionHash', function(hash) {
          console.log('Hash da transação de Trigo TX:', hash);
      })
      .on('receipt', async function(receipt) {
          try {
              console.log('Transação de Trigo TX confirmada!', receipt);
              alert('Compra de Trigo TX concluída!');
              await loadTokenBalances(accounts[0]);
          } catch (innerError) {
              console.error('Erro ao carregar saldo após Trigo TX:', innerError);
          }
      })
      .on('error', function(error) {
          console.error('Erro na transação de Trigo TX:', error);
          alert('Erro ao comprar Trigo TX.');
      });

  } catch (error) {
      console.error('Erro inesperado na compra de Trigo TX:', error);
      alert('Erro ao comprar Trigo TX.');
  }
}
//comprar token trigoTY
async function buyTrigoY() { 
  const amount = document.getElementById('TrigoYAmount').value;
  if  (!amount || amount <= 0) {
      alert('Digite uma quantidade válida para comprar Trigo TY.');
      return;
  }
  try {
    const accounts = await web3.eth.getAccounts();
    const pricePerToken = await contract.methods.TRIGO_Y_PRICE().call();
    const totalPrice = web3.utils.toBN(pricePerToken).mul(web3.utils.toBN(amount));

    contract.methods.buyTrigoY(amount).send({
        from: accounts[0],
        value: totalPrice
    })
    .on('transactionHash', function(hash) {
        console.log('Hash da transação de Trigo TY:', hash);
    })
    .on('receipt', async function(receipt) {
        try {
            console.log('Transação de Trigo TY confirmada!', receipt);
            alert('Compra de Trigo TY concluída!');
            await loadTokenBalances(accounts[0]);
        } catch (innerError) {
            console.error('Erro ao carregar saldo após Trigo TY:', innerError);
        }
    })
    .on('error', function(error) {
        console.error('Erro na transação de Trigo TY:', error);
        alert('Erro ao comprar Trigo TY.');
    });

} catch (error) {
    console.error('Erro inesperado na compra de Trigo TY:', error);
    alert('Erro ao comprar Trigo TY.');
}
}




// Eventos
document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
document.getElementById('buyCafeXButton').addEventListener('click', buyCafeX);
document.getElementById('buyCafeYButton').addEventListener('click', buyCafeY);
document.getElementById('buyCafeZButton').addEventListener('click', buyCafeZ);
document.getElementById('buyMilhoXButton').addEventListener('click', buyMilhoX);
document.getElementById('buySojaAButton').addEventListener('click', buySojaA);
document.getElementById('buySojaTButton').addEventListener('click', buySojaT);
document.getElementById('buyTrigoXButton').addEventListener('click', buyTrigoX);
document.getElementById('buyTrigoYButton').addEventListener('click', buyTrigoY);

