import { ViteAPI, abi as abiUtil } from "@vite/vitejs"
import HTTP_RPC from "@vite/vitejs-http"

export class ViteClient {
  provider: any // a Provider 

  constructor(rpcOrURL: string | any) {
    let rpc = rpcOrURL
    if (typeof rpcOrURL === "string") {
      rpc = new HTTP_RPC(rpcOrURL)
    }

    this.provider = new ViteAPI(rpc, () => {
      console.log("vite connected");
    });

  }

  async contractQuery(address: string, rawData: any) {
    const data = Buffer.from(rawData, "hex").toString("base64")
    return this.provider.request("contract_query", { address, data })

  }

  async getAccountBlock(hash: string) {
    return this.provider.request("ledger_getAccountBlockByHash", hash);
  }

  async isConfirmed(hash: string) {
    const blk = await this.getAccountBlock(hash)
    return blk?.confirmedHash !== null
  }

  async isReceived(hash: string) {
    const blk = await this.getAccountBlock(hash)
    return blk?.receiveBlockHash !== null
  }
}

export class Contrat {
  address: string
  abi: any
  provider: any

  constructor(address: string, abi: any, provider: any) {
    this.address = address
    this.abi = abi
    this.provider = provider
  }

  async query(meth: string, params: any[]) {
    const methodAbi = this.abi.find((x) => x.name === meth)
    let rawData = abiUtil.encodeFunctionCall(methodAbi, params)
    const data = Buffer.from(rawData, "hex").toString("base64")

    const result = await this.provider.request("contract_query", { address: this.address, data })
    if (!result) {
      throw new Error(`contract call failed. ${this.address}: ${meth}`)
    }
    const hexResult = Buffer.from(result, 'base64').toString("hex")
    const outputTypes = methodAbi.outputs.map((o) => o.type)
    return abiUtil.decodeParameters(outputTypes, hexResult)

  }

}

// from vuilder.utils
// example
// await waitFor(() => {
//    return client.isReceived(hash);
// }, "Wait for receiving deploy request", 1000);
export async function waitFor(conditionFn: () => Promise<boolean>, description: string = '', pollInterval: number = 1000) {
  process.stdout.write(description);
  const poll = (resolve: any) => {
    conditionFn().then((result) => {
      if (result) {
        console.log(' OK');
        resolve();
      } else {
        process.stdout.write('.');
        setTimeout(_ => poll(resolve), pollInterval);
      }
    }).catch(() => {
      process.stdout.write('.');
      setTimeout(_ => poll(resolve), pollInterval);
    });
  }
  return new Promise(poll);
}

