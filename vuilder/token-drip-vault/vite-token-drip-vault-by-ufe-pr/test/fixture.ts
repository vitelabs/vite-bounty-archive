import chai from "chai";
const vite = require("@vite/vuilder");
import nodeCfg from "./vite.node.json";

chai.use(require("chai-as-promised"));
vite.loadViteConfig(nodeCfg);
let node;

export async function mochaGlobalSetup() {
  node = await vite.startLocalNetwork(nodeCfg);
  console.log("Test environment is ready.");
}
export async function mochaGlobalTeardown() {
  await node.stop();
  console.log("Test environment cleared.");
  process.exit();
}
