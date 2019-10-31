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

let counterSmartContractAddress = "0x142Bf45F652733Ce6383F8B8C49aa15df02D606B";
let myAccount;
let counterContractInstance;

async function initApp() {
    try {
        counterContractInstance = new web3.eth.Contract(counterAbi, counterSmartContractAddress);
        myAccount = (await web3.eth.getAccounts())[0];
    } catch (err) {
        console.log(err);
    }
}

window.incrementNumber = async () => {
    try {
        let option = {
            from: myAccount,
            gasPrice: "20000000000",
            gas: "41000",
        };

        await counterContractInstance.methods.increment().send(option);
    } catch (err) {
        console.log(err);
    }
};

window.getNumber = async () => {
    try {
        let number = await counterContractInstance.methods.getCounter().call();
        document.getElementById("number").innerText = number;
    } catch (err) {
        console.log(err);
    }
};

window.addEventListener('load', async function () {
    if (typeof web3 !== 'undefined') {

        let provider = web3.currentProvider;
        web3 = new Web3(provider);

        await provider.enable();

    } else {
        console.log("Metamaskが認識されません");
    }

    initApp();

});