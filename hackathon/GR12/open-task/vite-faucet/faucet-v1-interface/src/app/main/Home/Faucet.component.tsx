import { useState, useEffect, useCallback } from "react";
import A from "../../shared/A.component";
import { wallet } from '@vite/vitejs';
import { callContract, getBalance, getQuota } from '../../utils/vitescripts';
import Connector from '@vite/connector';
import QR from "../../shared/QR.component";
import Modal from "../../shared/Modal.component";
import CONTRACT from "../../utils/contracts";

const Faucet = () => {
  const BRIDGE = 'wss://biforst.vite.net';
  const [mountModal, setMountModal] = useState(false);
  const [connectURI, setConnectURI] = useState('');
  const [vbInstance, setVbInstance] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  getBalance((b) => { setBalance(b) });

  const connectWallet = useCallback(() => {
    console.log("Callback")
    const instance = new Connector({ bridge: BRIDGE })

    instance.createSession().then(() => {
      setConnectURI(instance.uri);
      console.log('Set connect uri', instance.uri);
    });

    instance.on('connect', (e: Error | null, payload: any | null) => {
      if (e) {
        return window.alert('connect error: ' + JSON.stringify(e));
      }

      const { accounts } = payload.params[0];
      if (!accounts || !accounts[0]) throw new Error('address is null');
      setConnectURI('');
      setMountModal(false);
      setVbInstance(instance);
      setAddress(accounts[0]);
    });

    instance.on('disconnect', (err: any) => {
      console.log(err) // any handling logic here
      console.log('disconnected')
      setVbInstance(null);
    })
  }, [])

  const getStarted = () => {
    getQuota();
    connectWallet();
    setMountModal(true)
  };

  const getVite = () => {
    callContract(vbInstance, 'sendVite', [], '0');
  };

  // const status = {
  //   ERROR: "An error occurred. Please try again.",
  //   INVALID_ADDRESS: "Please enter a valid address.",
  // };

  return (
    <div className=" bg-vite-primary">
      <Modal visible={mountModal} setVisible={(e) => { setMountModal(e) }} onClose={() => { }} className="flex flex-col justify-center items-center">
        <p className="minor text-center text-xl mb-4">Scan with the Vite Wallet app</p>
        <QR uri={connectURI} />
      </Modal>
      <div className=" h-80 mx-10 space-y-6 flex flex-col justify-center items-center">
        <div className="montserrat font-semibold text-gray-100 text-lg">
          VITE FAUCET
        </div>
        {vbInstance === null ?
          <div className="flex flex-col items-center text-center">
            <div className="montserrat text-gray-100 text-lg  ">
              Get started by downloading the Vite wallet <A className="underline" href="https://app.vite.net/"><p>mobile app.</p></A>
            </div>
            <div className="montserrat text-gray-100 text-lg mt-5">
              Visit <A className="underline" href="https://vite.org">Vite.org</A> for more information.
            </div>
            <button
              onClick={() => getStarted()}
              disabled={false}
              className=" bg-white p-2 mt-5 rounded-md text-lg text-vite-primary font-semibold">
              Get Started
            </button>
          </div>
          :
          <div className="flex flex-col items-center">
            <button
              onClick={() => getVite()}
              disabled={false}
              className="p-2 rounded-md text-lg bg-green-500 text-white font-semibold">
              Get VITE
            </button>
            <div className="montserrat text-gray-100 text-lg mt-5 flex flex-col items-center justify-between">
              <div className="flex">
                <div className="mr-2 ">
                  Address:
                </div>
                <div>
                  <p className="break-all	"> {address}</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="flex flex-col justify-end items-center text-sm my-2 mx-5 text-white">
        <div className="flex flex-col justify-left">
          <div>
            <p className="font-bold inline-block">Faucet Address:</p> <p className="break-all">{CONTRACT.address}</p>
          </div>
          <div>
            <p className="font-bold inline-block break-words">Current Faucet Balance:</p> {balance}
          </div>
          <div className="my-5 max-w-md">
            <p className="font-bold inline-block underline">Note:</p> <p className="break-words"> Vite Faucet sends 0.25 vite and at most a total of 1 Vite. Please don't use an exchange address.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Faucet;