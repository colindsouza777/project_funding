const Escrow = artifacts.require("Escrow");
const Ballot = artifacts.require("Ballot");

module.exports = function(deployer) {
  deployer.deploy(Escrow);
  deployer.deploy(Ballot);
};