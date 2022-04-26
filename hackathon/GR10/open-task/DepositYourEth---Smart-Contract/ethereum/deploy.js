const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const deposityoureth = require('./build/DepositYourEth.json');             

const provider = new HDWalletProvider(
  "INSERT 12 WORD MNEMONIC",
  // remember to change this to your own phrase!
  "INSERT RINKEBY INFURA API"
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(deposityoureth.interface))
    .deploy({ data: deposityoureth.bytecode })
    .send({ gas: "500000", from: accounts[0] });
  
  console.log("Contract deployed to", result.options.address);
};
deploy();

