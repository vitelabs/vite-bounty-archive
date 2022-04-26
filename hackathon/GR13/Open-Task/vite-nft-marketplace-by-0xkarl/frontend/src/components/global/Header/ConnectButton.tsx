import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { abbrAddress } from '@utils/string';
import { useViteWallet } from '@react-vite';

const ConnectButton: FC = () => {
  const { walletAddress, connect } = useViteWallet();
  const history = useHistory();

  return (
    <>
      <Box ml={2}>
        <Button
          variant='outlined'
          color='default'
          onClick={() =>
            walletAddress
              ? history.push(`/profile/${walletAddress}`)
              : connect()
          }
        >
          {walletAddress ? abbrAddress(walletAddress, 5 + 5, 5) : 'Connect'}
        </Button>
      </Box>
    </>
  );
};
export default ConnectButton;
