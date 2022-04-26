import web3 from './web3';
import DepositYourEth from './build/DepositYourEth.json';

const instance = new web3.eth.Contract(
  JSON.parse(DepositYourEth.interface),
  '0x59624cd1d650AC2FA9bf9590FbA0875a215239B4'
);

export default instance;