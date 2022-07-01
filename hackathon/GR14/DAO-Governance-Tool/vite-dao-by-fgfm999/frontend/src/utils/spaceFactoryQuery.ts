import ViteQuery from "./viteQuery";

class SpaceFactoryQuery extends ViteQuery {
  getSpacesPaging(params: Array<number>) {
    return new Promise((resolve, reject) => {
      this._query(params, 'getSpacesPaging').then((res: any) => {
        resolve(res[0])
      }).catch((e: Error) => reject(e))
    })
  }
}

export default SpaceFactoryQuery
