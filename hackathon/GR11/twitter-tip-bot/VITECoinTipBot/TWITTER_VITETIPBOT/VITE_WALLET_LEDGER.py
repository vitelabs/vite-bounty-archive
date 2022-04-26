import asyncio
import websockets
import json



'''
===================================
=== CHECK BALANCE VITE ============
===================================
'''

async def vite_checkAccountBalance(_account):
    print('VIEW vite_checkAccountBalance 1 >>> data to send: ')
    data_vite_account = "{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"ledger_getAccountByAccAddr\",\"params\":[\""+ _account +"\"]}"  # vite_501c501ad9e47b913db6009aa58b396edc5c47a801bf38cb40
    print(' data_vite_account ======')
    print(data_vite_account)

    async with websockets.connect("ws://localhost:41420") as websocket:
        await websocket.send(data_vite_account)
        resp1 = await websocket.recv()
        # get response: 
        resp2 = json.loads(resp1)
        #print(type(resp2))
        print('user balance: ')
        print(resp2) # ['result']['totalNumber']
        #print(" {}".format(resp1))
        userBalance = str(resp2['result']['totalNumber'])
        return str(userBalance)

#asyncio.run(vite_checkAccountBalance(str('vite_a8c92ce8c7762570b2a2d4713cab66c92aff14bd80b8620654')))



'''

=========================
=== NEW ACCOUNT VITE ====
=========================

'''

def updateUserAccountOnJSONDB(_userid, _useraccount):
    with open(str(Path(__file__).parent.absolute())+ '/LOCALDB/VITE_TIPBOT_DB.json', 'r+') as jfile2:
        print('update...')
        jsondb = json.load(jfile2)
        for reg in jsondb:
            if reg['userId'] == _userid:
                reg['account'] = str(_useraccount)
                jfile2.seek(0)
                json.dump(jsondb, jfile2, indent=4)
                jfile2.truncate()
    print('===>>> JSDONDB updated. userid: ', _userid)



def generateNewPassword():
    print('generating new password for new user...')
    numberOfChars_min = 4
    numberOfChars_max = 8
    especialChars = ["@", "@3", "@6", "@9", "1@", "a-", "-B", "ihj8@", "Jkl", "q9", "t7b", "", "2-u-", "=2w", "w=3", "n=s", "hy", "-@--", "a@t", "gt@", "9-@", "ed9", "pqc", "mck", "yc6", "hc-", "ic8", "drt", "-O-b", "g-dt", "-di", "us7", "8au", "0a9"]
    numberOfChars_pass = randint(numberOfChars_min, numberOfChars_max)
    #print('generating numberOfChars_pass: ', numberOfChars_pass)
    now_dt = datetime.now()
    #ts_dt = datetime.timestamp(now_dt)
    newdt = str(datetime.timestamp(now_dt)).replace('.', '', 900).replace('.', '', 900)
    #print('new datetime : ', newdt)
    newPassword = ""
    while  len(newPassword) <= numberOfChars_pass:
        newPassword += str(especialChars[randint(0, len(especialChars)-1)])
        #print('adding data to new password: ', newPassword)

    newPassword +=  newdt
    print('new password generated : ', newPassword)
    return str(newPassword)



def registerUser_JSONDB(new_dict):
    try:
        with open(str(Path(__file__).parent.absolute())+ '/LOCALDB/VITE_TIPBOT_DB.json', 'r+') as jfile2:
            jsondb = json.load(jfile2)
            jsondb.append(new_dict)
            print('read ====ok')
            print(jsondb)
            with open(str(Path(__file__).parent.absolute())+ '/LOCALDB/VITE_TIPBOT_DB.json', 'w') as jfile3:
                print('json loaded::: ', jsondb)
                json.dump(jsondb, jfile3)
                print('new dict inserted on jsondb...')
    except Exception as err:
        pass
        print('error while saving new user account on JSONDB')





async def vite_generateNewVITEAccount(_password, _userid):
    print('*****vite_generateNewVITEAccount 1 >>> data to send: ')
    data_vite_account = "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"wallet_newMnemonicAndEntropyStore\",\"params\":[\""+ _password +"\"]}"
    #print(' data_vite_account ======')
    #print(data_vite_account)
    try:
        async with websockets.connect("ws://localhost:41420") as websocket:
            await websocket.send(data_vite_account)
            resp1 = await websocket.recv()
            # get response: 
            resp2 = json.loads(resp1)

            addrReturn = resp2['result']['primaryAddr']
            mnemonicReturn = resp2['result']['mnemonic']

            now_dt = datetime.now()
            #ts_dt = datetime.timestamp(now_dt)
            newdt = str(datetime.timestamp(now_dt)).replace('.', '', 900).replace('.', '', 900)

            json_new_account = [{
                "viteAddr":str(addrReturn),
                "mnemonic":str(mnemonicReturn),
                "password":str(_password),
                "userId":_userid,
                "datetimeGenerated":str(newdt)
            }]

            r2 = json.loads(json_new_account)
            with open(str(Path(__file__).parent.absolute())+ '/LOCALDB/viteaccounts/'+ str(_userid) +'.json', 'w') as jfile:
                json.dump(r2, jfile)
                print('new acount successfully saved on LOCALDB.: ', str(Path(__file__).parent.absolute())+ '/LOCALDB/viteaccounts/'+ str(_userid) +'.json')
            
            registerUser_JSONDB(json_new_account[0])

            return str(addrReturn)

    except Exception as err:
        pass
        return str("0")



# asyncio.run(vite_generateNewVITEAccount(_password, _userid))

# asyncio.run(vite_checkAccountBalance(str('vite_501c501ad9e47b913db6009aa58b396edc5c47a801bf38cb40')))





async def vite_generateNewVITEAccount_UPDATE(_password, _userid):
    print('*****vite_generateNewVITEAccount 1 >>> data to send: ')
    data_vite_account = "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"wallet_newMnemonicAndEntropyStore\",\"params\":[\""+ _password +"\"]}"
    #print(' data_vite_account ======')
    #print(data_vite_account)
    try:
        async with websockets.connect("ws://localhost:41420") as websocket:
            await websocket.send(data_vite_account)
            resp1 = await websocket.recv()
            # get response: 
            resp2 = json.loads(resp1)

            addrReturn = resp2['result']['primaryAddr']
            mnemonicReturn = resp2['result']['mnemonic']

            now_dt = datetime.now()
            #ts_dt = datetime.timestamp(now_dt)
            newdt = str(datetime.timestamp(now_dt)).replace('.', '', 900).replace('.', '', 900)

            json_new_account = [{
                "viteAddr":str(addrReturn),
                "mnemonic":str(mnemonicReturn),
                "password":str(_password),
                "userId":_userid,
                "datetimeGenerated":newdt
            }]

            r2 = json.loads(json_new_account)
            with open(str(Path(__file__).parent.absolute())+ '/LOCALDB/viteaccounts/'+ str(_userid) +'.json', 'w') as jfile:
                json.dump(r2, jfile)
                print('new acount successfully saved on LOCALDB.: ', str(Path(__file__).parent.absolute())+ '/LOCALDB/viteaccounts/'+ str(_userid) +'.json')
            
            # registerUser_JSONDB(json_new_account[0])
            updateUserAccountOnJSONDB(_userid, addrReturn)

            return str(addrReturn)

    except Exception as err:
        pass
        return str("0")









'''

==============================
=== payment process
==============================


*****vite_PAY 1 >>> data to send: 
=====>>> resp subscribe
{'jsonrpc': '2.0', 'id': 1, 'result': '0xb58bc3e76a98585ac16b754524ce433a'}


*****vite_check_PAY 1 >>> data to send: 
=====>>> resp vite_check_PAY
{'jsonrpc': '2.0', 'id': 2, 'result': {'result': None, 'subscription': '0xb58bc3e76a98585ac16b754524ce433a'}}

'''


def transferContractGeneratedForUSER(_userid):
    print('does user has transfer contract?:::')
    with open(str(Path(__file__).parent.absolute())+ '/LOCALDB/VITE_TIPBOT_DB.json', 'r') as jfile2:
        print('read transferContractGeneratedForUSER...')
        jsondb = json.load(jfile2)
        for reg in jsondb:
            if str(reg['userId']) == str(_userid):
                if reg['walletStatus'] == 0:
                    print('user doesnt have transfer contract. CREATE TRANSFER CONTRACT')

                    # after created update JSONDB
                    print('>>> TRANSFER CONTRACT created o/')

                    # after created... CALL TRANSFER CONTRACT.


                else:
                    print('user already have transfer contract >>> CALL TRANSFER CONTRACT.')













async def vite_PAY(_userid, tip_destinatary_account, _amount): # _userid = who will send the vite to tip_destinatary_account
    print('*****vite_PAY 1 >>> data to send: ')

    data_vite_account = "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"subscribe_newLogsFilter\",\"params\":[{\"addrRange\":{\""+ tip_destinatary_account +"\":{\"fromHeight\":\"0\",\"toHeight\":\"0\"}}}]}"

    try:
        async with websockets.connect("ws://localhost:41420") as websocket:
            await websocket.send(data_vite_account)
            resp1 = await websocket.recv()
            # get response: 
            resp2 = json.loads(resp1)
            print('tip process - step 1 ok.')
            print('=====>>> resp subscribe')
            print(resp2)
            print(resp2['result'])
            subscription_id = resp2['result']


            # ============== CREATE / CALL CONTRACT functions ===========
            # if user has conctract deployed >>> CALL tranfer contract
            #
            # if user hasn't contract deployed >>> CREATE contract
            


            # ======= SUBSCRIPTION DONE - ok. Now lets create or call transfer contract.
            if len(str(subscription_id))>3:
                print('ok lets create / call constract for transfer vite.')
                # CHECK IF USER HAS TRANSFER CONTRACT DEPLOYED.
                return str(subscription_id)


            return str("1")

    except Exception as err:
        pass
        return str("0")

#asyncio.run(vite_PAY(123, str('vite_a8c92ce8c7762570b2a2d4713cab66c92aff14bd80b8620654'), 10))








import datetime 
from datetime import time

#time.sleep(10)




'''

====================================
=== CONTRACT CREATION PROCESS HERE
====================================

ledger_getLatestBlock

{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "ledger_getLatestBlock",
    "params": [
        "vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68"
    ]
}




'''



async def vite_ledger_getLatestBlock(_account):
    print('*****vite_ledger_getLatestBlock 1 >>> data to send: ')

    #data_vite_account = "{\"jsonrpc\":\"2.0\",\"id\":3,\"method\":\"ledger_getLatestBlock\",\"params\":[\"vite_098dfae02679a4ca05a4c8bf5dd00a8757f0c622bfccce7d68\"]}"
    data_vite_account = "{\"jsonrpc\":\"2.0\",\"id\":3,\"method\":\"ledger_getLatestBlock\",\"params\":[\""+ _account +"\"]}"

    try:
        async with websockets.connect("ws://localhost:41420") as websocket:
            await websocket.send(data_vite_account)
            resp1 = await websocket.recv()
            # get response: 
            blockInfo = json.loads(resp1)
            print('=====>>> resp vite_ledger_getLatestBlock')
            print(blockInfo)

            print('=====>>> resp hash')
            blockHash = str(blockInfo['result']['hash'])
            print(blockHash)
            print('=====>>> resp block blockheight')
            blockHeight = str(blockInfo['result']['height'])
            print(blockHeight)

            return blockHash, blockHeight

    except Exception as err:
        pass
        return str("0"), str("0")







async def vite_contract_getCreateContractToAddress(_account):
    print('*****vite_contract_getCreateContractToAddress 1 >>> data to send: ')

    blockHash, blockHeight = asyncio.run(vite_ledger_getLatestBlock(_account))

    data_vite_account = "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"contract_getCreateContractToAddress\",\"params\":[\""+ _account +"\",\""+ blockHeight +"\",\""+ blockHash +"\",\""+ blockHash +"\"]}"

    try:
        async with websockets.connect("ws://localhost:41420") as websocket:
            await websocket.send(data_vite_account)
            resp1 = await websocket.recv()
            # get response: 
            blockInfo = json.loads(resp1)
            print('=====>>> resp ')
            print(blockInfo['result'])
            addressResult = blockInfo['result']

            return str(addressResult)

    except Exception as err:
        pass
        return str("0")


'''
will return ======= >>>

{  
   "jsonrpc":"2.0",
   "id":1,
   "result": "vite_22f4f195b6b0f899ea263241a377dbcb86befb8075f93eeac8"
}

'''


'''
=======================
======================= THIS IS OUR TRANSFER VITE STANDARD CONTRACT
=======================

contract code:

608060405234801561001057600080fd5b50610161806100206000396000f3fe608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c208885914610046575b600080fd5b6100896004803603602081101561005c57600080fd5b81019080803574ffffffffffffffffffffffffffffffffffffffffff16906020019092919050505061008b565b005b8074ffffffffffffffffffffffffffffffffffffffffff164669ffffffffffffffffffff163460405160405180820390838587f1505050508074ffffffffffffffffffffffffffffffffffffffffff167ff632c631f1cf58a101b09f8fe0262d7c04f04e9b77f255bd2f86fedd1b6af56d3446604051808381526020018269ffffffffffffffffffff1669ffffffffffffffffffff1681526020019250505060405180910390a25056fea165627a7a72305820b29f883870fe0b61e2323dd736a78aee7ee56795833f3c5767642921941810520029

abi:

[{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"TransferWithEvent","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"addr","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"tokenid","type":"tokenId"}],"name":"transferEvent","type":"event"}]

"[{\"constant\":false,\"inputs\":[{\"name\":\"addr\",\"type\":\"address\"}],\"name\":\"TransferWithEvent\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"addr\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"tokenid\",\"type\":\"tokenId\"}],\"name\":\"transferEvent\",\"type\":\"event\"}]"

'''


async def vite_contract_getCreateContractParams(_account):
    print('*****vite_contract_getCreateContractParams 1 >>> data to send: ')

    blockHash, blockHeight = asyncio.run(vite_ledger_getLatestBlock(_account))

    # ABI : Our ABI its a standard smart contract model for transfering vite. 
    # It only contains 2 fields: destinatary Addrress and amount.
    data_vite_account = "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"contract_getCreateContractParams\",\"params\":[\"[{\"constant\":false,\"inputs\":[{\"name\":\"addr\",\"type\":\"address\"}],\"name\":\"TransferWithEvent\",\"outputs\":[],\"payable\":true,\"stateMutability\":\"payable\",\"type\":\"function\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"addr\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"tokenid\",\"type\":\"tokenId\"}],\"name\":\"transferEvent\",\"type\":\"event\"}]\",["", ""]]}"

    try:
        async with websockets.connect("ws://localhost:41420") as websocket:
            await websocket.send(data_vite_account)
            resp1 = await websocket.recv()
            # get response: 
            blockInfo = json.loads(resp1)
            print('=====>>> resp ')
            print(blockInfo['result'])
            addressResult = blockInfo['result']

            return str(addressResult)

    except Exception as err:
        pass
        return str("0")









'''
=========== check if payment done

'''


async def vite_check_PAY(_subscriptionNumber):
    print('*****vite_check_PAY 1 >>> data to send: ')

    #data_vite_account = "{\"jsonrpc\":\"2.0\",\"id\": 1,\"method\":\"subscribe_subscribe\",\"params\":[\"createVmlogSubscription\",{\"addressHeightRange\":{\"vite_f48f811a1800d9bde268e3d2eacdc4b4f8b9110e017bd7a76f\":{\"fromHeight\":\"0\",\"toHeight\":\"0\"}}}]}"
    data_vite_account = "{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"subscribe_getFilterChanges\",\"params\":[\""+ _subscriptionNumber +"\"]}"
    try:
        async with websockets.connect("ws://localhost:41420") as websocket:
            await websocket.send(data_vite_account)
            resp1 = await websocket.recv()
            # get response: 
            resp2 = json.loads(resp1)
            print('=====>>> resp vite_check_PAY')
            print(resp2)
            try:

                if len(resp2['result']['result'])>0:
                    print('ok payment done.')
                    
                    return str("1")

            except Exception as err: # end of filter
                pass
                return str("2")

            return str("0")

    except Exception as err:
        pass
        return str("0")

#asyncio.run(vite_check_PAY(_subscriptionNumber))


'''
will return from logs: 

=====>>> resp vite_check_PAY
{'jsonrpc': '2.0', 'id': 2, 'result': {'result': None, 'subscription': '0xaae747e53a8fbd33e0d26b3e2ebe097a'}} 

if no fiulter found:
    =====>>> resp vite_check_PAY
{'jsonrpc': '2.0', 'id': 2, 'error': {'code': -32002, 'message': 'filter not found'}}

'''