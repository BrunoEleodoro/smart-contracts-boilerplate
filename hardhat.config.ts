import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import * as fs from 'fs';

const homedir = require('os').homedir();
const privateKey = fs.readFileSync(`${homedir}/.learning-secret`).toString().trim();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.3',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1
      }
    }
  },
  paths: {
    artifacts: './build/artifacts',
    tests: './tests',
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      blockGasLimit: 8000000,
      forking: {
        // url: infuraUrl('mainnet')
        url: 'https://api.avax.network/ext/bc/C/rpc'
      },
      // mining: {
      //   auto: false,
      //   interval: 1000
      // },
      accounts: [{ privateKey, balance: '10000168008000000000000' }]
    },
    localhost: {
      blockGasLimit: 8000000,
      url: 'http://localhost:8545',
      accounts: [privateKey]
    },
  }
};

export default config;
