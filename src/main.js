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

async function initApp() {
  contractInstance = new web3.eth.Contract(abi, smartContractAddress);
  myAccount = (await web3.eth.getAccounts());
  console.log(typeof myAccount);
  console.log(myAccount);
}

window.incrementNumber = async () => {
  try {
    let option = {
      from: myAccount,
      gasPrice: "20000000000",
      gas: "41000",
    };

    await contractInstance.methods.increment().send(option);
  } catch (err) {
    console.log(err);
  }
};

window.getNumber = async () => {
  try {
    let number = await contractInstance.methods.getCounter().call();
    document.getElementById("number").innerText = number;
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener('load', async function () {

  if (typeof web3 !== 'undefined') {

    let provider = web3.currentProvider;
    web3 = new Web3(provider);
    
    await provider.enable(); //これめっちゃ大事

  } else {
    console.log("Metamaskが認識されません");

  }

  initApp();

});