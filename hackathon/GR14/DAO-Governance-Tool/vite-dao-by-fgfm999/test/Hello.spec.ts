// import { expect } from "chai";
import * as vuilder from "@vite/vuilder";
import config from "./vite.config.json";
import { abi } from "@vite/vitejs";

var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

let provider: any;
let deployer: any;


async function deployHello() {
  const compiledContracts = await vuilder.compile("contracts/test/Hello.solpp");

  const hello = compiledContracts.Hello;
  hello.setDeployer(deployer).setProvider(provider);
  await hello.deploy({})
  console.log(`deployed hello ${hello.address}`)
  return hello

}

describe.skip("test Space", () => {
  let hello: any;
  before(async () => {
    provider = vuilder.newProvider(config.networks.local.http);
    deployer = vuilder.newAccount(config.networks.local.mnemonic, 0, provider);
    console.log('deployer', deployer.address);
    hello = await deployHello()
  })


  it("str1", async () => {
    const result = await hello.query("strArr1", []) //   Error: [Error] decode, params should be hex-string.
    console.log("result", result)
  })

  it("str2", async () => {
    const result = await hello.query("strArr2", []) //   Error: [Error] decode, params should be hex-string.
    console.log("result", result)
  })

  it("str3", async () => {
    const result = await hello.query("strArr3", [])
    const decoded = abi.decodeParameter("string[]", result[0]) //    Error: [Error] decode, params should be hex-string.
  })

  it.only("str4", async () => {
    const result = await hello.query("strArr4", [])
    const decoded = abi.decodeParameter("bytes[]", result[0]) //    Error: [Error] decode, params should be hex-string.
    console.log("decoded", decoded)
  })
})