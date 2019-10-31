let CounterSmartContractAddress = "0x142Bf45F652733Ce6383F8B8C49aa15df02D606B";
let TokenSmartContractAddress = "0x01790949F63a6697861a7C46bE7322b05F1EFBd1";
let myAccount;
let CounterContractInstance;
let TokenContractInstance;

let counterAbi = [
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

let tokenAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "sender",
                "type": "address"
            },
            {
                "name": "recipient",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "spender",
                "type": "address"
            },
            {
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "recipient",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "receipient",
                "type": "address"
            },
            {
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer_increment",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

async function initApp() {
    CounterContractInstance = new web3.eth.Contract(counterAbi, CounterSmartContractAddress);
    TokenContractInstance = new web3.eth.Contract(tokenAbi, TokenSmartContractAddress);
    myAccount = (await web3.eth.getAccounts())[0];
}

window.incrementNumber = async () => {
    try {
        let option = {
            from: myAccount,
            gasPrice: "20000000000",
            gas: "41000",
        };

        await CounterContractInstance.methods.increment().send(option);
    } catch (err) {
        console.log(err);
    }
};

window.getNumber = async () => {
    try {
        let number = await CounterContractInstance.methods.getCounter().call();
        document.getElementById("number").innerText = number;
    } catch (err) {
        console.log(err);
    }
};

window.update = async () => {
    try {
        let balance = (parseFloat(await TokenContractInstance.methods.balanceOf(myAccount).call())) / 10 ** 18;
        let symbol = await TokenContractInstance.methods.symbol().call();
        document.getElementById("balance").innerText = balance + symbol;
    } catch (err) {
        console.log(err);
    }
};

window.transfer = async () => {
    try {
        let address = document.getElementById("address").value;
        let amount = parseFloat(document.getElementById("amount").value);

        if (!address || !amount) {
            return window.alert("送金先と送金額を入力してください");
        }

        let option = {
            from: myAccount,
            gasPrice: "20000000000",
            gas: "70000",
        };

        await TokenContractInstance.methods.transfer_increment(address, amount).send(option);

    } catch (err) {
        console.log(err);
    }
}

window.addEventListener('load', async function () {

    if (typeof web3 !== 'undefined') {　//Metamaskが入っているか確認

        let provider = web3.currentProvider;
        web3 = new Web3(provider);  //web3オブジェクトの作成

        await provider.enable(); //ここでMetamaskと繋がる感じっぽい

    } else {
        console.log("Metamaskが認識されません");
    }

    initApp();

});