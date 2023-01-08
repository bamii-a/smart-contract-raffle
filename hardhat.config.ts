// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-etherscan");
// require("hardhat-deploy");
// require("solidity-coverage");
// require("hardhat-gas-reporter");
// require("hardhat-contract-sizer");
// require("dotenv").config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "dotenv/config";
import "hardhat-deploy";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-ethers";
import { NetworkUserConfig } from "hardhat/types";

const PRIVATE_KEY = process.env.PRIVATE_KEY as string; /* Acctount 3 */
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL as string;
// const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY as
//   | NetworkUserConfig
//   | undefined;
// const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.16",
  namedAccounts: {
    deployer: {
      default: 0,
    },
    // player: {
    //   default: 1,
    // },
  },
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      chainId: 5,
      accounts: [PRIVATE_KEY],
    },
    hardhat: {
      // accounts - hardhat places in already on local
      chainId: 31337,
    },
    // gasReporter: {
    //   enabled: true,
    //   outputFile: "gas-report.txt",
    //   noColors: true,
    //   // get usd gas value from coinmarketcap api
    //   currency: "USD",
    //   // coinmarketcap,
    //   token: "ETH",
    // },
    // etherscan: {
    //   apiKey: { rinkeby: ETHERSCAN_API_KEY },
    // },
  },
  mocha: {
    timeout: 4000000000000,
  },
};

export default config;
