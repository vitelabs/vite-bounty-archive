const { expect } = require("chai");
const vuilder = require("@vite/vuilder");
import config from "./deploy.config.json";

const deploy = async (_creationFee: any) => {
    const provider = vuilder.newProvider(config.http);
    // await provider.request("ledger_getSnapshotChainHeight");
    const deployer = vuilder.newAccount(config.mnemonic, 0, provider);

    // compile
    const compiledContracts = await vuilder.compile("SunkCostGame.solpp");
    expect(compiledContracts).to.have.property("SunkCostGame");

    // deploy
    let sunkCostGame = compiledContracts.SunkCostGame;
    sunkCostGame.setDeployer(deployer).setProvider(provider);
    await sunkCostGame.deploy({ params: [_creationFee], responseLatency: 1 });
    expect(sunkCostGame.address).to.be.a("string");
    console.log(sunkCostGame.address);

    // stake quota
    // await deployer.stakeForQuota({beneficiaryAddress: sunkCostGame.address, amount:"2001000000000000000000"});

    return;
};

deploy(10);
