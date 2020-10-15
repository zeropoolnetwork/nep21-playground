require('dotenv').config();
const { KeyPair, utils, transactions, connect } = require('near-api-js');
const { InMemoryKeyStore } = require('near-api-js/lib/key_stores');
const fs = require("fs");

function genHexString(len) {
    let output = '';
    for (let i = 0; i < len; ++i) {
        output += (Math.floor(Math.random() * 16)).toString(16);
    }
    return output;
}

async function deploy() {
    let accountId = process.env.DEPLOYER_ACCOUNT;
    let privatekey = process.env.DEPLOYER_PRIVATE_KEY;
    let nodeUrl = process.env.NODE_URL;
    let wasmFile = process.env.WASM_FILE;
    let networkId = process.env.NETWORK_ID;
    let keyStore = new InMemoryKeyStore();
    await keyStore.setKey(networkId, accountId, KeyPair.fromString(privatekey));
    

    let options = {accountId, keyStore, networkId, nodeUrl};
    let near = await connect(options);
    const account = await near.account(accountId);

    

    let args = Buffer.from(`{
        "owner_id": "${accountId}", 
        "total_supply": 1000000000000000000000000000
    }`);
   
   

    const txs = [
        transactions.createAccount(),
        transactions.transfer(utils.format.parseNearAmount("100")),
        transactions.deployContract(fs.readFileSync(wasmFile)),
        transactions.functionCall(
            "new",
            args,
            "100000000000000",
            "0")
    ];

    const contractId = genHexString(64);
    const result = await account.signAndSendTransaction(contractId, txs);
    

    console.log(result);
    console.log(`Done deploying ${options.initFunction ? 'and initializing' : 'to'} ${options.accountId}`);
}

deploy();
