const school = artifacts.require("School");

module.exports = function(deployer) {
  deployer.deploy(school);
};