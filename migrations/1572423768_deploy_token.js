const TokenContract = artifacts.require('sampleToken.sol');

module.exports = function (deployer) {
  deployer.deploy(TokenContract);
};