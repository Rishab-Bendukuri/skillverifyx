var Users = artifacts.require("Users.sol")
var Certificates = artifacts.require("Certificates.sol")

module.exports = function(deployer) {
  deployer.deploy(Users);
  deployer.deploy(Certificates);
};
