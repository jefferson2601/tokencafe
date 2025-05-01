Ótimo! O seu `README.md` está bem estruturado, mas como você fez melhorias no projeto (como uso da **rede Holesky**, deploy funcional, e melhorias no contrato), aqui está uma **versão atualizada e aprimorada** do seu `README.md`, com um toque mais profissional e atual:

---

```markdown
# ☕ Token Café - Plataforma de Tokenização com Web3

Uma plataforma Web3 temática onde usuários podem comprar tokens representando diferentes tipos de café (CafeX e CafeY) diretamente com ETH na rede Holesky.

## 🚀 Funcionalidades

- 🔐 Dois tokens ERC-20: CafeX e CafeY
- 💳 Compra de tokens diretamente com ETH (smart contract `payable`)
- 🧾 Visualização de saldo de tokens em tempo real
- 🔗 Integração com carteira MetaMask
- 💻 Interface Web simples e intuitiva
- 🌐 Deploy completo na rede de testes Holesky

## ⚙️ Tecnologias Utilizadas

- Solidity (Smart Contracts)
- Hardhat (Ambiente de desenvolvimento)
- OpenZeppelin (Segurança e padrões)
- HTML, CSS e JavaScript (Front-end)
- ethers.js (Integração Web3)

## 🧰 Pré-requisitos

- Node.js (versão 14 ou superior)
- MetaMask instalado
- ETH de teste na rede **Holesky**

## 📦 Instalação do Projeto

1. Clone o repositório:

```bash
git clone https://github.com/jefferson2601/tokencafe.git
cd tokencafe
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` com suas variáveis:

```env
HOLESKY_RPC_URL=https://holesky.infura.io/v3/SUA_INFURA_KEY
PRIVATE_KEY=SUA_CHAVE_PRIVADA
```

## 📤 Deploy dos Contratos

1. Compile os contratos:

```bash
npx hardhat compile
```

2. Faça o deploy para a rede Holesky:

```bash
npx hardhat run scripts/deploy.js --network holesky
```

3. Após o deploy, atualize os endereços no arquivo `app.js`:

```js
const CAFE_X_ADDRESS = '0x...';         // Endereço do contrato CafeX
const CAFE_Y_ADDRESS = '0x...';         // Endereço do contrato CafeY
const TOKEN_SALE_ADDRESS = '0x...';     // Endereço do contrato TokenSale
```

## 🧪 Testando a Aplicação Local

1. Inicie o servidor:

```bash
npx http-server
```

2. Acesse `http://localhost:8080` no navegador

3. Conecte sua MetaMask à rede Holesky

4. Compre tokens e veja o saldo ser atualizado 🎉

## 🔐 Segurança

- Proteção contra reentrancy (OpenZeppelin `ReentrancyGuard`)
- Controle de acesso com `Ownable`
- Uso de `require()` para validações e segurança de transações

## 👨‍💻 Desenvolvedor

- Jefferson 🧑‍💻  
- GitHub: [@jefferson2601](https://github.com/jefferson2601)

## 📄 Licença

MIT License
```

---

Se quiser, posso já criar esse `README.md` atualizado pra você e salvar no projeto local, é só pedir.

Quer que eu faça isso agora?