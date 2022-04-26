import web3 from './web3';
import DepositYourEth from './build/DepositYourEth.json';

export default (address) => {
    return new web3.eth.Contract(
        JSON.parse(DepositYourEth.interface),
        address
    );
};
