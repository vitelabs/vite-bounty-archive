type Abi = {
  inputs?: Array<object>;
  type?: string;
  name?: string;
  outputs?: Array<OutputItem>;
  anonymous?: boolean;
  stateMutability?: string;
}

type OutputItem = {
  internalType: string
  name: string
  type: string
}

class ViteQuery {
  address: string
  viteApi: any
  abi: Array<Abi>

  constructor(viteApi: any, address: string, abi: Array<Abi>) {
    this.address = address
    this.viteApi = viteApi
    this.abi = abi
  }

  _query(params: any, methodName: string) {
    return new Promise((resolve, reject) => {
      this.viteApi.queryContractState({
        address: this.address,
        abi: this.abi,
        methodName,
        params
      }).then((res: any) => {
        console.log(methodName, res)

        resolve(res)
      }).catch((e: Error) => reject(e))
    })
  }

  _decodeResult(methodName: string, res: Array<any>) {
    const methodAbi = this.abi.find((x: any) => x.name === methodName && x.type === 'function')

    let result: object|null = null

    if (methodAbi && methodAbi.outputs) {
      result = {}

      methodAbi.outputs.forEach((item: { name: string, type: string }, index: number) => {
        if (result) {
          const value = res[index]
          // @ts-ignore
          result[item.name] = type.indexOf('uint') !== -1 ? value - 0 : value
        }
      })
    }

    return result
  }
}

export default ViteQuery
