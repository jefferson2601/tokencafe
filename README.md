# Token Café - Plataforma de Tokenização

Uma plataforma Web3 para tokenização temática de café, permitindo a compra e venda de tokens digitais representando diferentes tipos de café.

## Características

- Dois tokens ERC-20: Café X e Café Y
- Interface simples e intuitiva
- Integração com MetaMask
- Compra de tokens usando ETH
- Visualização de saldos em tempo real

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MetaMask instalado no navegador
- ETH na rede de testes Sepolia

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/token-cafe.git
cd token-cafe
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/SEU_PROJETO_ID
PRIVATE_KEY=SUA_CHAVE_PRIVADA
```

## Deploy dos Contratos

1. Compile os contratos:
```bash
npx hardhat compile
```

2. Faça o deploy na rede Sepolia:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

3. Após o deploy, atualize os endereços dos contratos no arquivo `app.js`:
```javascript
const CAFE_X_ADDRESS = '0x...'; // Endereço do contrato CafeX
const CAFE_Y_ADDRESS = '0x...'; // Endereço do contrato CafeY
const CAFE_TOKEN_SALE_ADDRESS = '0x...'; // Endereço do contrato CafeTokenSale
```

## Executando a Aplicação

1. Inicie um servidor local:
```bash
npx http-server
```

2. Abra o navegador e acesse `http://localhost:8080`

3. Conecte sua carteira MetaMask à rede Sepolia

4. Comece a comprar tokens!

## Segurança

- Os contratos utilizam as melhores práticas de segurança do OpenZeppelin
- Proteção contra reentrancy attacks
- Verificações de overflow
- Controle de acesso adequado

## Licença

MIT 