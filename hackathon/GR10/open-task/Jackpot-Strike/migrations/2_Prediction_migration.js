const Prediction = artifacts.require("./Prediction.sol");
const Vite = artifacts.require("./Vite.sol");

module.exports = function (deployer) {
  deployer.deploy(Prediction);
};