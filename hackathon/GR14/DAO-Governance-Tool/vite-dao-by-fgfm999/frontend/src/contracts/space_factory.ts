const SpaceFactory = {
  address: {
    mainnet: '',
    testnet: 'vite_96776add26a3ea161f5bdb6edd1ca018e044c9ad015be34061',
  },
  abi: [{"inputs":[{"internalType":"uint256","name":"offset","type":"uint256","value":"0"},{"internalType":"uint256","name":"limit","type":"uint256","value":"2"}],"name":"getSpacesPaging","outputs":[{"internalType":"address[]","name":"spaces","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"space","type":"address"}],"name":"newSpace","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"spaceCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
};

export default SpaceFactory;
