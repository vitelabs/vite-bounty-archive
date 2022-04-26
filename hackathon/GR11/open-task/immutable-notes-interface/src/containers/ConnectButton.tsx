import { useState, useCallback } from 'react';
import Connector from '@vite/connector';
import { connect } from '../utils/wep-state';
import QR from '../components/QR';
import Modal from '../components/Modal';
import { State } from '../utils/types';

const BRIDGE = 'wss://biforst.vite.net';

type Props = State & {
  menu?: boolean;
  onConnect?: () => void;
};

const ConnectButton = ({ menu, onConnect, vbInstance, setState }: Props) => {
  const [connectURI, connectURISet] = useState('');
  const connectWallet = useCallback(() => {
    if (connectURI) {
      return connectURISet('');
    }
    const vbInstance = new Connector({ bridge: BRIDGE });
    vbInstance.createSession().then(() => connectURISet(vbInstance.uri));
    vbInstance.on('connect', (e: Error | null, payload: any | null) => {
      if (e) {
        return window.alert('connect error: ' + JSON.stringify(e));
      }
      const { accounts } = payload.params[0];
      if (!accounts || !accounts[0]) throw new Error('address is null');
      connectURISet('');
      if (onConnect) {
        onConnect();
      }
      setState!({ vbInstance });
    });
    vbInstance.on('disconnect', () => {
      setState!({ vbInstance: null });
    });
  }, [setState, connectURI, onConnect]);

  return (
    <div>
      <button
        className={
          menu
            ? `w-screen flex text-left menu-button ${vbInstance ? 'minor ' : 'font-semibold text-blue-500'}`
            : 'rect primary'
        }
        onClick={() => connectWallet()}
      >
        Connect
      </button>
      {connectURI && (
        <Modal onClose={() => connectURISet('')} className="self-center">
          <p className="minor text-center text-xl mb-4">Scan with the Vite Wallet app</p>
          <QR data={connectURI} className="w-80 h-80" />
        </Modal>
      )}
    </div>
  );
};

export default connect('vbInstance')(ConnectButton);
