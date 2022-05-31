const Web3 = require("web3");
const BigNumber = require('bignumber.js');

const FauceABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Withdrawal",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "destroy",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "widthdraw_amount",
        "type": "uint256"
      }
    ],
    "name": "widthdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

  const Faucet_Address = "0x35AbdC738ABe7277E320665E2293A09167760ef9";

  const chain = new Web3("http://127.0.0.1:8545");

  const faucetToken = new chain.eth.Contract(FauceABI, Faucet_Address);

  const receiverAddress = "0x2b4646A273135C5e3e6c8aa0DaAdedDa38660C5f";

  // chain.eth.sendTransaction({to: Faucet_Address, from: receiverAddress, value: 1000000000000000000}, function(err, res) {
  //   console.log(res);
  // });

  const amount = new BigNumber("10000000000000");

  faucetToken.methods.widthdraw(1).call({from: receiverAddress}, function (err, res) {
    if (err) {
      console.log("An error occured", err)
      return
    }
    console.log("Amount Successfully Withdrawn...: ", res)
  });