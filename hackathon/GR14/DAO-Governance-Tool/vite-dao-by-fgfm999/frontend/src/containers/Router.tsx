import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WS_RPC from "@vite/vitejs-ws";
import { accountBlock, ViteAPI } from "@vite/vitejs";
import { connect } from "utils/globalContext";
import { State, ViteBalanceInfo, Contract } from "../utils/types";
import { VCSessionKey } from "utils/viteConnect";
import SpaceIndex from "views/spaces/Index";
import SpaceNew from "views/spaces/New";
import ProposalIndex from "views/proposals/Index";
import ProposalNew from "views/proposals/New";
import ProposalShow from "views/proposals/Show";
import PageContainer from "./PageContainer";
import { Snackbar } from "@mui/material";

const providerWsURLs = {
  testnet: "wss://buidl.vite.net/gvite/ws",
  mainnet: "wss://node.vite.net/gvite/ws",
};

const providerTimeout = 60000;
const providerOptions = { retryTimes: 10, retryInterval: 5000 };

type Props = State;

const Router = ({ setState, vcInstance, networkType, toast }: Props) => {
  const connectedAccount = useMemo(() => vcInstance?.accounts[0], [vcInstance]);
  const toastOpen = useMemo(() => {
    return toast !== undefined;
  }, [toast]);

  const rpc = new WS_RPC(
    providerWsURLs[networkType],
    providerTimeout,
    providerOptions
  );

  const viteApi = useMemo(() => {
    return new ViteAPI(rpc, () => {
      console.log("client connected");
    });
  }, [rpc.path]);

  useEffect(() => setState({ viteApi }), [setState]);

  const getBalanceInfo = useCallback(
    (address: string) => {
      return viteApi.getBalanceInfo(address);
    },
    [viteApi]
  );

  const subscribe = useCallback(
    (event: string, ...args: any) => {
      return viteApi.subscribe(event, ...args);
    },
    [viteApi]
  );

  const updateViteBalanceInfo = useCallback(() => {
    if (vcInstance?.accounts[0]) {
      getBalanceInfo(vcInstance.accounts[0])
        // @ts-ignore
        .then((res: ViteBalanceInfo) => {
          setState({ viteBalanceInfo: res });
        })
        .catch((e) => {
          console.log(e);
          setState({ toast: JSON.stringify(e), vcInstance: null });
          localStorage.removeItem(VCSessionKey);
        });
    }
  }, [setState, getBalanceInfo, vcInstance]);

  useEffect(updateViteBalanceInfo, [updateViteBalanceInfo]);

  useEffect(() => {
    if (vcInstance) {
      subscribe("newAccountBlocksByAddr", vcInstance.accounts[0])
        .then((event: any) => {
          event.on(() => {
            updateViteBalanceInfo();
          });
        })
        .catch((err: any) => console.warn(err));

      subscribe("newLogs", vcInstance.accounts[0])
        .then((event: any) => {
          console.log("newLogs events", event);
        })
        .catch((err: any) => console.log("newLogs err", err));
    }

    return () => viteApi.unsubscribeAll();
  }, [setState, subscribe, vcInstance, viteApi, updateViteBalanceInfo]);

  const callContract = useCallback(
    (
      contract: Contract,
      methodName: string,
      params: any[] = [],
      tokenId?: string,
      amount?: string
    ) => {
      if (!vcInstance) return;

      const methodAbi = contract.abi.find(
        (x: any) => x.name === methodName && x.type === "function"
      );

      if (!methodAbi) {
        throw new Error(`method not found: ${methodName}`);
      }

      const toAddress = contract.address[networkType];

      if (!toAddress) {
        throw new Error(`${networkType} contract address not found`);
      }

      const block = accountBlock.createAccountBlock("callContract", {
        address: connectedAccount,
        abi: methodAbi,
        toAddress,
        params,
        tokenId,
        amount,
      }).accountBlock;

      return vcInstance.signAndSendTx([{ block }]);
    },
    [connectedAccount, networkType, vcInstance]
  );

  useEffect(() => {
    setState({ callContract });
  }, [setState, callContract]);

  const handleToastClose = useCallback(() => {
    setState({ toast: undefined });
  }, []);

  return (
    <BrowserRouter>
      <PageContainer>
        <Routes>
          <Route path="/" element={<SpaceIndex />} />
          <Route path="/spaces/new" element={<SpaceNew />} />
          <Route
            path="/spaces/:address/proposals/"
            element={<ProposalIndex />}
          />
          <Route
            path="/spaces/:address/proposals/new"
            element={<ProposalNew />}
          />
          <Route
            path="/spaces/:address/proposals/:id"
            element={<ProposalShow />}
          />
          <Route path="/*" element={<h1>test</h1>} />
        </Routes>
      </PageContainer>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={toastOpen}
        onClose={handleToastClose}
        message={toast}
      />
    </BrowserRouter>
  );
};

export default connect(Router);
