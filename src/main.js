let smartContractAddress = "0x413359cd8Bd0316cD84dCa817b60c8b75F46f16B";
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
    contractInstance = new web3.eth.Contract(abi, smartContractAddress);　//コントラクトオブジェクトの作成
    myAccount = (await web3.eth.getAccounts())[0]; // Metamaskからアカウントの取得
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

    if (typeof web3 !== 'undefined') {　//Metamaskが入っているか確認

        let provider = web3.currentProvider;
        web3 = new Web3(provider);  //web3オブジェクトの作成

        await provider.enable(); //これめっちゃ大事 ここでMetamaskと繋がる感じっぽい

    } else {
        console.log("Metamaskが認識されません");
    }

    initApp();

});