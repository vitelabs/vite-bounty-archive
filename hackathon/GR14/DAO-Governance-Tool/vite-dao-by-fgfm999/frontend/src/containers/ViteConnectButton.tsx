import { ReactNode, useEffect, useState } from 'react';
import DropdownButton from '../components/DropdownButton';
import QR from '../components/QR';
import { connect } from '../utils/globalContext';
import { shortenAddress } from '../utils/strings';
import { State } from '../utils/types';
import { initViteConnect } from '../utils/viteConnect';
import { Button, Modal, Box } from '@mui/material'

type Props = State & {
  children: ReactNode;
  className?: string;
};

const ViteConnectButton = ({ setState, vcInstance }: Props) => {
  const [connectURI, connectURISet] = useState('');

  useEffect(() => {
    if (vcInstance) {
      vcInstance.on('disconnect', () => setState({ vcInstance: null }));
    }
  }, [setState, vcInstance]);

  return vcInstance ? (
    <>{shortenAddress(vcInstance.accounts[0])}</>
  ) : (
    <>
      <Button
        sx={{color: '#fff'}}
        onClick={async () => {
          vcInstance = initViteConnect();
          connectURISet(await vcInstance.createSession());
          vcInstance.on('connect', () => {
            connectURISet('');
            setState({ vcInstance });
          });
        }}
      >
        <p>Connect Wallet</p>
      </Button>
      {!!connectURI && (
        <Modal open={true} onClose={() => connectURISet('')}>
          <Box className='modal-qr'>
            <p>Scan QR Code</p>
            <QR data={connectURI} />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default connect(ViteConnectButton);
