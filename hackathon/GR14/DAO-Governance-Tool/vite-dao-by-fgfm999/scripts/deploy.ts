import * as vuilder from "@vite/vuilder"
import * as dotenv from "dotenv"
import { constant } from "@vite/vitejs"

dotenv.config()
// testnet
const config = {
  http: "https://buidl.vite.net/gvite",
  space: {
    title: "Naruto DAO",
    token: constant.Vite_TokenId,
    quorum: 1_000,
    votingPeriod: 21600 // 6 hours
  }
}
async function main() {
  const provider = vuilder.newProvider(config.http)

  const deployer = vuilder.newAccount(process.env.MNEMONICS!, 0, provider)

  const compiledContracts = await vuilder.compile("Space.solpp")
  const space = compiledContracts.Space
  space.setDeployer(deployer).setProvider(provider)
  await space.deploy({
    responseLatency: 1,
    params: [
      config.space.title,
      config.space.token,
      config.space.quorum,
      config.space.votingPeriod,
    ]
  })
  console.log(`deployed Space address: ${space.address}`)
}

main().then(() => console.log("done")).catch((e) => console.log(e))