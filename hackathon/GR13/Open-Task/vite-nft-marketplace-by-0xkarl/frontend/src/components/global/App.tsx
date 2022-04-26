import React, { FC } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Layout from '@components/global/Layout';
import theme from '@utils/theme';
import { ConfigProvider } from '@contexts/config';
import {
  ViteProvider,
  ViteConnectProvider,
  VitePrivatekeyProvider,
} from '@react-vite';

const ViteWalletProvider = import.meta.env.PROD
  ? ViteConnectProvider
  : VitePrivatekeyProvider;

const App: FC = () => {
  return (
    <ThemeProvider {...{ theme }}>
      <CssBaseline />

      <ViteProvider>
        <ViteWalletProvider>
          <ConfigProvider>
            <Layout />
          </ConfigProvider>
        </ViteWalletProvider>
      </ViteProvider>
    </ThemeProvider>
  );
};

export default App;
