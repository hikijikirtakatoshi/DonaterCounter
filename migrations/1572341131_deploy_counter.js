const CounterContract = artifacts.require('counter.sol');

module.exports = function(deployer) {
  deployer.deploy(CounterContract);
};