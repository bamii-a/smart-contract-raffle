import { ethers } from "hardhat";

interface networkConfigProps {
  [key: string]: {
    name: string;
    vrfCoordinatorv2?: string;
    entranceFee: string;
    keyHash?: string;
    subscriptionId?: string;
    callBackGasLimit: string;
    interval: string;
  };
}

/* https://docs.chain.link/vrf/v2/subscription/supported-networks */
export const networkConfig: networkConfigProps = {
  5: {
    name: "goerli",
    /* The address of the Goerli VRF coordinator contract on chaninlink. */
    vrfCoordinatorv2: "0x2ca8e0c643bde4c2e08ab1fa0da3401adad7734d",
    entranceFee: ethers.utils.parseEther("0.01").toString(),
    keyHash:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    subscriptionId: "8370",
    callBackGasLimit: "500000",
    interval: "30",
  },
  31337: {
    name: "hardhat",
    entranceFee: ethers.utils.parseEther("0.01").toString(),
    keyHash:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    callBackGasLimit: "500000",
    subscriptionId: "0",
    interval: "30",
  },
};

export default networkConfig;
