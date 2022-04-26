import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context';
import QRBox from '../components/QRBox';
import TokenService from '../API/TokenService';



const ViteConnectBox = () => {
    const {qrdata, setQRdata, isConnected, setIsConnected, isAuth, setIsAuth, setAccount} = useContext(AuthContext);
    const [init, setInit] = useState(false)

    const QRData = (uri) => {
        setQRdata(uri);
        setIsConnected(true);
    }

    const connectUser = (address) => {
        setIsAuth(true)
        setAccount(address)
        localStorage.setItem('auth', true);
        localStorage.setItem('account', address);
    }

    const disconnect = () => {
        setIsConnected(false);
        setQRdata('');
        setIsAuth(false)
        localStorage.removeItem('auth')
        localStorage.removeItem('account')
        setInit(false)
    }

    useEffect(() => {
        if(localStorage.getItem('auth') === 'true') {
            const account = localStorage.getItem('account');
            setAccount(account)
            setIsConnected(true)
            setIsAuth(true)
        } else {
            if(!init) {
                setInit(true)
                TokenService.connectToBridge(QRData, connectUser, disconnect);
            }
        }
    }, [])

    useEffect(() => {
        if(!init) {
            setInit(true)
            setIsAuth(false)
            console.log('INIT');
            TokenService.connectToBridge(QRData, connectUser, disconnect);
        }

    }, [init])

    return (
        <div>
            { !isAuth
              ? <div>       
                { isConnected && qrdata.length > 46
                    ? <div> 
                        <QRBox qrdata={qrdata} />
                        <h1>Scan the QR code </h1>
                        <h1>using your Vite Wallet</h1>
                      </div>
                    : <h2>Loading...</h2>} </div>
                : null}
                
        </div>
    );
};

export default ViteConnectBox;