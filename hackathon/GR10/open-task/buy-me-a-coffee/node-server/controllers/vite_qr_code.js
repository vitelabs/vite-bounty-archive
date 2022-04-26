import Connector from '@vite/connector'

const BRIDGE = 'http://192.168.31.82:5001'

const vbInstance = new Connector({ bridge: BRIDGE })

vbInstance.createSession().then(() => {
    console.log('connect uri', vbInstance.uri)
});

vbInstance.on('connect', (err, payload) => { // connection established

    const { accounts } = payload.params[0];
    if (!accounts || !accounts[0]) throw new Error('address is null');

    const address = accounts[0];
    console.log(address)
})

vbInstance.sendCustomRequest({
    method: 'vite_signAndSendTx',
    params: {
        block: {
            accountAddress: "vite_61404d3b6361f979208c8a5c442ceb87c1f072446f58118f68",
            amount: "2000000000000000000",
            data: "c2FkZmFzZg==",
            toAddress: "vite_61404d3b6361f979208c8a5c442ceb87c1f072446f58118f68",
            tokenId: "tti_5649544520544f4b454e6e40",
        },
    }
}).then(signedBlock => console.log(signedBlock), err => console.error(err))
vbInstance.on('disconnect', err => {
    console.log(err)
})
