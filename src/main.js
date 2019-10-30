let smartContractAddress = "0x9cC8f00e54BB2F63662847D06cd20F04cF355B39";
let myAccount;
let contractInstance;

let abi = [
  {
    "constant": false,
    "inputs": [],
    "name": "increment",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCounter",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

function initApp() {
  contractInstance = web3.eth.contract(abi, smartContractAddress);
  myAccount = web3.eth.getAccounts();
}

window.incrementNumber　= () => {
  try {
    let option = {
      from: myAccount,
      gasPrice: "20000000000",
      gas: "41000",
    };

    contractInstance.methods.increment().send(option);
  } catch (err) {
    console.log(err);
  }
};

window.getNumber = () => {
  try {
    let number = contractInstance.methods.getCounter().call();
    document.getElementById("number").innerText = number;
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener('load', function () {

  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    this.console.log("できてる");

  } else {
    this.console.log("だめです");

  }

  initApp();

})