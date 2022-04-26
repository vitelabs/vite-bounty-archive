import aiohttp
import os

node_rpc = "http://0.0.0.0:48132" if os.environ.get("local") else os.environ.get("VITE_NODE_RPC")


async def new_wallet(password):
    global node_rpc
    async with aiohttp.ClientSession() as session:
        async with session.post(node_rpc,
                                headers={"Content-Type": "application/json"},
                                json={
                                    "jsonrpc": "2.0",
                                    "id": 2,
                                    "method": "wallet_createEntropyFile",
                                    "params": [password]
                                }) as resp:
            return (await resp.json())["result"]["primaryAddress"]
