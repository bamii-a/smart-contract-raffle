import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, Deployment, Address } from "hardhat-deploy/dist/types";
import { ethers } from "hardhat";
import networkConfig from "../helper-hardhat-config";
import verify from "../utils/verify";

const vrfSubscriptionFundAmount = ethers.utils.parseEther("2");

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  // deployer = account deploying the contract (comes from hardhat.config.namedAccounts)
  const { deployer } = await getNamedAccounts();
  console.log(`deployer`, deployer);
  const chainId: number = network.config.chainId!;

  let VRFCoordinatorv2Address: Address | string | undefined;
  let subscriptionId: string | undefined;

  if (chainId === 31337) {
    const vrfCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    );
    VRFCoordinatorv2Address = vrfCoordinatorV2Mock.address;
    const txResponse = await vrfCoordinatorV2Mock.createSubscription();
    const txReceipt = await txResponse.wait(1);
    subscriptionId = txReceipt.events[0].args.subId;
    // fund subscription
    await vrfCoordinatorV2Mock.fundSubscription(
      subscriptionId,
      vrfSubscriptionFundAmount
    );
  } else {
    VRFCoordinatorv2Address = networkConfig[chainId].vrfCoordinatorv2;
    subscriptionId = networkConfig[chainId].subscriptionId;
  }

  const entranceFee: string = networkConfig[chainId].entranceFee;
  const keyHash: string = networkConfig[chainId].keyHash!;
  const callBackGasLimit: string = networkConfig[chainId].callBackGasLimit;
  const interval: string = networkConfig[chainId].interval;

  const args = [
    VRFCoordinatorv2Address,
    entranceFee,
    keyHash,
    subscriptionId,
    callBackGasLimit,
    interval,
  ];

  const raffle = await deploy("Raffle", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 1,
  });

  log(`Raffle deployed at ${raffle.address}`);
  //   if (chainId !== 31337 && process.env.ETHERSCAN_KEY) {
  //     await verify(raffle.address, args);
  //   }
  log("/------------------------------------------/");
};

export default deploy;
deploy.tags = ["all", "raffle"];
