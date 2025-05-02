const hre = require("hardhat");
const fs = require("fs");

async function main() {
  try {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with:", deployer.address);

    const overrides = {
      gasPrice: hre.ethers.parseUnits("1", "gwei"),
    };

    // -------- Deploy dos Tokens Individuais --------
    const tokens = [
      "CafeTX",
      "CafeTY",
      "CafeTZ",
      "MilhoTX",
      "SojaTA",
      "SojaTT",
      "TrigoTX",
      "TrigoTY",
    ];

    const deployed = {};

    for (const tokenName of tokens) {
      const Token = await hre.ethers.getContractFactory(tokenName);
      const token = await Token.deploy({ ...overrides });
      await token.waitForDeployment();
      const address = await token.getAddress();
      deployed[tokenName] = { instance: token, address };
      console.log(`${tokenName} deployed to:`, address);
    }

    // -------- Deploy do contrato CafeTokenSale --------
    const CafeTokenSale = await hre.ethers.getContractFactory("CafeTokenSale");
    const cafeTokenSale = await CafeTokenSale.deploy(
      deployed.CafeTX.address,
      deployed.CafeTY.address,
      deployed.CafeTZ.address,
      deployed.MilhoTX.address,
      deployed.SojaTA.address,
      deployed.SojaTT.address,
      deployed.TrigoTX.address,
      deployed.TrigoTY.address,
      { ...overrides }
    );
    await cafeTokenSale.waitForDeployment();
    const cafeTokenSaleAddress = await cafeTokenSale.getAddress();
    console.log("CafeTokenSale deployed to:", cafeTokenSaleAddress);

    // -------- Transferência de tokens --------
    console.log("Transferindo tokens...");
    const transfers = [
      { name: "CafeTX", amount: "1500000" },
      { name: "CafeTY", amount: "2000000" },
      { name: "CafeTZ", amount: "1800000" },
      { name: "MilhoTX", amount: "1200000" },
      { name: "SojaTA", amount: "1700000" },
      { name: "SojaTT", amount: "1600000" },
      { name: "TrigoTX", amount: "1900000" },
      { name: "TrigoTY", amount: "1400000" },
    ];

    for (const { name, amount } of transfers) {
      const token = deployed[name].instance;
      const decimals = await token.decimals();
      const transferAmount = hre.ethers.parseUnits(amount, decimals);
      const tx = await token.transfer(cafeTokenSaleAddress, transferAmount, { ...overrides });
      await tx.wait();
      console.log(`Tokens ${name} transferidos: ${transferAmount.toString()}`);
    }

    // -------- Verificação no Etherscan --------
    console.log("Aguardando blocos antes da verificação...");
    await new Promise((resolve) => setTimeout(resolve, 30000));

    console.log("Verificando contratos na Holesky...");

    for (const name of tokens) {
      const contractPath = `contracts/${name.replace(/[A-Z][a-z]+$/, "")}.sol:${name}`;
      await hre.run("verify:verify", {
        address: deployed[name].address,
        constructorArguments: [],
        contract: contractPath,
      });
    }

    await hre.run("verify:verify", {
      address: cafeTokenSaleAddress,
      constructorArguments: [
        deployed.CafeTX.address,
        deployed.CafeTY.address,
        deployed.CafeTZ.address,
        deployed.MilhoTX.address,
        deployed.SojaTA.address,
        deployed.SojaTT.address,
        deployed.TrigoTX.address,
        deployed.TrigoTY.address,
      ],
      contract: "contracts/CafeTokenSale.sol:CafeTokenSale",
    });

    // -------- Salvar endereços --------
    const addresses = {
      CafeTokenSale: cafeTokenSaleAddress,
      ...Object.fromEntries(tokens.map((name) => [name, deployed[name].address])),
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
