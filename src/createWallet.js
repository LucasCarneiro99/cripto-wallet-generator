//importinbg dependencies

const bip39 = require('bip39');
const bip32 = require('bip32');
const bitcoin = require('bitcoinjs-lib');

//defining network
//se quiser rodar em ambiente real, basta trocar testnet por bitcoin
const network = bitcoin.networks.testnet;

// derivacao de carteiras HD
const path = "m/49'/1'/0'/0";

//criando as palavras p seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);


//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network);


//criando conta - par pvt e pub
let acount = root.derivePath(path);
let node = acount.derive(0).derive(0); 
let btcAdress = bitcoin.payments.p2wpkh({ pubkey: node.publicKey, network }).address;

console.log("carteira gerada ");
console.log("endereco: ", btcAdress);
console.log("private key: ", node.toWIF());
console.log("seed ", mnemonic);