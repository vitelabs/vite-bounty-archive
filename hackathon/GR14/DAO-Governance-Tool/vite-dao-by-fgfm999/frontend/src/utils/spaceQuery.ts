import ViteQuery from "./viteQuery";

class Query extends ViteQuery {
  getProposal (params: Array<string>) {
    return new Promise((resolve, reject) => {
      this._query(params, 'getProposal').then((res: any) => {
        const proposal = this._decodeResult('getProposal', res)
        resolve(proposal)
      }).catch((e: Error) => reject(e))
    })
  }

  getProposals( params: Array<number>) {
    return new Promise((resolve, reject) => {
      this._query(params, 'getProposalsPaging').then(async (res: any) => {
        if (!res) return

        const promises = res[0].map(async (id: string) => {
          return await this.getProposal([id])
        })

        const proposals = await Promise.all(promises)

        resolve(proposals)
      }).catch((e: Error) => reject(e))
    })
  }

  getName() {
    return new Promise((resolve, reject) => {
      this._query([], 'name').then((res: any) => {
        resolve(res[0])
      }).catch((e: Error) => reject(e))
    })
  }

  getDetail(address: string) {
    return new Promise((resolve, reject) => {
      this._query([address], 'detail').then((res: any) => {
        const detailObj = this._decodeResult('detail', res)

        resolve(detailObj)
      }).catch((e: Error) => reject(e))
    })
  }

  getVotes(params: Array<string>) {
    return new Promise((resolve, reject) => {
      this._query(params, 'votes').then(async (res: any) => {
        const votes = this._decodeResult('votes', res)

        console.log('votes', votes)
        resolve(votes)
      })
    })
  }
}

export default Query
