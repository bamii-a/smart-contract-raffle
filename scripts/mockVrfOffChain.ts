import { BigNumber } from "ethers";
import { ethers, network } from "hardhat";
import { Raffle, VRFCoordinatorV2Mock } from "../typechain-types";

async function mockKeepers() {
  /* It's getting the Raffle contract from the Hardhat network. */
  const raffle: Raffle = await ethers.getContract("Raffle");
  /* It's generating a hash of an empty string. */
  const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""));
  /* It's calling the `checkUpkeep` function of the Raffle contract. */
  const { upkeepNeeded } = await raffle.callStatic.checkUpkeep(checkData);
  console.log("upkeepNeeded", upkeepNeeded);
  if (upkeepNeeded) {
    // console.log("checkData", checkData);
    // let vrfCoordinatorV2Mock: VRFCoordinatorV2Mock = await ethers.getContract(
    //   "VRFCoordinatorV2Mock"
    // );

    /* It's calling the `performUpkeep` function of the Raffle contract. */
    const tx = await raffle.performUpkeep(checkData);
    /* It's waiting for the transaction to be mined. */
    const txReceipt = await tx.wait(1);
    /* It's getting the `requestId` from the `UpkeepRequested` event. */
    const requestId = txReceipt.events![1].args!.requestId;
    console.log(`Performed upkeep with RequestId: ${requestId}`);
    /* If it is a local network it's calling the `mockVrf` function. */
    if (network.config.chainId === 31337) {
      console.log(`mockingVrf`);
      await mockVrf(requestId, raffle);
    }
  } else {
    console.log("No upkeep needed!");
  }
}

async function mockVrf(requestId: BigNumber, raffle: Raffle) {
  console.log("We on a local network? Ok let's pretend...");
  const vrfCoordinatorV2Mock: VRFCoordinatorV2Mock = await ethers.getContract(
    "VRFCoordinatorV2Mock"
  );
  //   const subscriptionId = raffle.getSubscriptionId();
  //   await vrfCoordinatorV2Mock.addConsumer(subscriptionId, raffle.address);
  /* It's calling the `fulfillRandomWords` function of the `VRFCoordinatorV2Mock` contract. */
  await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, raffle.address);
  console.log("Responded!");
  /* It's getting the most recent winner of the Raffle contract. */
  const recentWinner = await raffle.getRecentWinner();
  console.log(`The winner is: ${recentWinner}`);
}

mockKeepers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
