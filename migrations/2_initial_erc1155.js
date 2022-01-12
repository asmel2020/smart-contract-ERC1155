const erc115 = artifacts.require("erc1155");

module.exports = function (deployer) {
  deployer.deploy(erc115);
};
