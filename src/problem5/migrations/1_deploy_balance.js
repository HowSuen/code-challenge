var SolidityContract = artifacts.require("Balance");

module.exports = function(deployer) {
  deployer.deploy(SolidityContract);
};