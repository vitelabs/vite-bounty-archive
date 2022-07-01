// import { expect } from "chai";
import * as vuilder from "@vite/vuilder";
import config from "./vite.config.json";
import { constant, abi } from "@vite/vitejs";

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

let provider: any;
let deployer: any;


async function deploySpaceFactory() {
  const compiledContracts = await vuilder.compile("SpaceFactory.solpp");

  const factory = compiledContracts.SpaceFactory;
  factory.setDeployer(deployer).setProvider(provider);
  await factory.deploy({})
  console.log(`deployed space ${factory.address}`)
  return factory
}

describe("test SpaceFactory", () => {
  before(async () => {
    provider = vuilder.newProvider(config.networks.local.http);
    deployer = vuilder.newAccount(config.networks.local.mnemonic, 0, provider);
    console.log('deployer', deployer.address);
  })

  it("test newSpace", async () => {
    const factory = await deploySpaceFactory()

    {
      const result = await factory.query("spaceCount", [])
      expect(result[0]).to.equal("0")
    }

    await factory.call("newSpace", ["vite_441d38db2b0b1db1ec5bc2338c92c28df2b0e9b68cfb878b39"], {})
    await factory.call("newSpace", ["vite_8552f811e667939cc30eb3598f74ac569b69392703ad7aeb1e"], {})

    await expect(
      factory.call("newSpace", ["vite_8552f811e667939cc30eb3598f74ac569b69392703ad7aeb1e"], {})
    ).to.eventually.be.rejectedWith("revert");

    {
      const result = await factory.query("spaceCount", [])
      expect(result[0]).to.equal("2")
    }

  })

  it.only("test paging", async () => {
    const factory = await deploySpaceFactory()

    const spaces = [
      "vite_441d38db2b0b1db1ec5bc2338c92c28df2b0e9b68cfb878b39",
      "vite_8552f811e667939cc30eb3598f74ac569b69392703ad7aeb1e",
      "vite_61214664a1081e286152011570993a701735f5c2c12198ce63",
      "vite_bb6ad02107a4422d6a324fd2e3707ad53cfed9359378a78792",
      "vite_ce18b99b46c70c8e6bf34177d0c5db956a8c3ea7040a1c1e25"
    ]

    for (const space of spaces) {
      await factory.call("newSpace", [space], {})
    }

    let page = 1
    let pageSize = 2

    {
      const result = await factory.query("getSpacesPaging", [(page - 1) * pageSize, pageSize])
      expect(result[0].length).to.equal(2)
      expect(result[0][0]).to.equal(spaces[0])
      expect(result[0][1]).to.equal(spaces[1])
    }

    {
      page = 3
      const result = await factory.query("getSpacesPaging", [(page - 1) * pageSize, pageSize])
      expect(result[0].length).to.equal(1)
      expect(result[0][0]).to.equal(spaces[4])
    }


  })

}) 