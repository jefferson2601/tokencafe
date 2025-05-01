const hre = require("hardhat");
const fs = require("fs");

async function main() {
  try {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with:", deployer.address);

    // GasPrice pode variar na Holesky, mas 1 gwei geralmente é suficiente
    const overrides = {
      gasPrice: hre.ethers.parseUnits("1", "gwei"),
    };

    // Deploy CafeX
    const CafeX = await hre.ethers.getContractFactory("CafeX");
    const cafeX = await CafeX.deploy({ ...overrides });
    await cafeX.waitForDeployment();
    const cafeXAddress = await cafeX.getAddress();
    console.log("CafeX deployed to:", cafeXAddress);

    // Deploy CafeY
    const CafeY = await hre.ethers.getContractFactory("CafeY");
    const cafeY = await CafeY.deploy({ ...overrides });
    await cafeY.waitForDeployment();
    const cafeYAddress = await cafeY.getAddress();
    console.log("CafeY deployed to:", cafeYAddress);

    // Deploy CafeTokenSale
    const CafeTokenSale = await hre.ethers.getContractFactory("CafeTokenSale");
    const cafeTokenSale = await CafeTokenSale.deploy(cafeXAddress, cafeYAddress, { ...overrides });
    await cafeTokenSale.waitForDeployment();
    const cafeTokenSaleAddress = await cafeTokenSale.getAddress();
    console.log("CafeTokenSale deployed to:", cafeTokenSaleAddress);

    // Transferir tokens para o contrato de vendas
    console.log("Transferindo tokens...");

    const transferAmountX = hre.ethers.parseUnits("1500000", await cafeX.decimals());
    const transferAmountY = hre.ethers.parseUnits("2000000", await cafeY.decimals());

    const tx1 = await cafeX.transfer(cafeTokenSaleAddress, transferAmountX, { ...overrides });
    await tx1.wait();
    console.log(`Tokens CafeX transferidos: ${transferAmountX.toString()}`);

    const tx2 = await cafeY.transfer(cafeTokenSaleAddress, transferAmountY, { ...overrides });
    await tx2.wait();
    console.log(`Tokens CafeY transferidos: ${transferAmountY.toString()}`);

    // Aguarda blocos para verificação
    console.log("Aguardando blocos antes da verificação...");
    await new Promise((resolve) => setTimeout(resolve, 30000));

    // Verifica contratos na Holesky Etherscan
    console.log("Verificando contratos na Holesky...");

    await hre.run("verify:verify", {
      address: cafeXAddress,
      constructorArguments: [],
    });

    await hre.run("verify:verify", {
      address: cafeYAddress,
      constructorArguments: [],
    });

    await hre.run("verify:verify", {
      address: cafeTokenSaleAddress,
      constructorArguments: [cafeXAddress, cafeYAddress],
    });

    // Salva os endereços
    const addresses = {
      cafeX: cafeXAddress,
      cafeY: cafeYAddress,
      cafeTokenSale: cafeTokenSaleAddress,
    };

    fs.writeFileSync("contract-addresses.json", JSON.stringify(addresses, null, 2));
    console.log("Endereços salvos em contract-addresses.json");

  } catch (error) {
    console.error("Erro no deploy:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Erro no deploy:", error);
    process.exit(1);
  });
