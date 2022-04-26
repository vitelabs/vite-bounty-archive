import './App.css'
import Nav from "./Components/Nav"
import Body from './Components/Body';
import { getWeb3 } from './Web3';
import { useEffect, useState } from 'react';

function App() {
  let eth = window.ethereum;
  const [chainId, setChainId] = useState(null);
  const [addr, setAddr] = useState(eth ? eth.selectedAddress : null);
  async function fetch() {
    try {
      let status = await getWeb3();
      if (window.etherem) {
        // get Account
        eth.request({ method: 'eth_accounts' })
          .then((accounts) => {
            if (accounts.length !== 0) setAddr(accounts[0]);
            else setAddr(null);
          })
          .catch((error) => {
            console.error(
              `     Error fetching accounts: ${error.message}.
              Code: ${error.code}. Data: ${error.data}`
            );
          });

      }
      return status;
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    let unmount = false;
    let interval = setInterval(() => {
      if (!unmount) {
        setChainId(eth ? eth.chainId === "0x4" : null);
        setAddr(eth ? eth.selectedAddress : null);
      }
    }, 1000);
    return () => { unmount = true; clearInterval(interval); }
  });
  useEffect(() => {
    fetch();
    if (window.ethereum) {
      eth.on("accountsChanged", accounts => {
        if (accounts.length > 0 && accounts[0] !== addr) setAddr(accounts[0]);
        else { setAddr(null); }
      });
      eth.on("chainChanged", chain => {
        setChainId(chain === "0x4");
      })
      eth.on("connect", accounts => {
        setChainId(accounts.chainId === "0x4");
      })
    } else {
      console.log("Metamask is not installed!")
    }
  });
  return (
    <div>
      <Nav login={fetch} chainId={chainId} addr={addr} />
      <Body login={fetch} chainId={chainId} addr={addr} />
    </div>
  );
}

export default App;
