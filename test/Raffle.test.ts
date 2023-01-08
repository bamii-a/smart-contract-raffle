import { Contract } from "ethers";
import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { assert, expect } from "chai";
import { VRFConsumerBaseV2, Raffle } from "../typechain-types";
// import "hardhat/console.sol";
import networkConfig from "../helper-hardhat-config";

const chainId = network.config.chainId;

chainId !== 31337
  ? describe.skip
  : describe("Raffle", async () => {
      /* Defining a variable called raffle of type Raffle. */
      let raffle: Raffle;
      /* Defining a variable called deployer of type string. */
      let deployer: string;
      /* Defining a variable called vrfCoordinatorV2Mock of type VRFConsumerBaseV2. */
      let vrfCoordinatorV2Mock: any;
      let entranceFee: string;
      let interval: number;

      beforeEach(async () => {
        /* Assigning the deployer variable to the deployer account. */
        deployer = (await getNamedAccounts()).deployer;
        /* Loading the fixture files. */
        await deployments.fixture(["all"]);
        /* Assigning the raffle variable to the Raffle contract. */
        raffle = await ethers.getContract("Raffle", deployer);
        entranceFee = (await raffle.getEntraceFee()).toString();
        interval = (await raffle.getInterval()).toNumber();

        // raffle = raffleContract.connect(player);
        /* Assigning the vrfCoordinatorV2Mock variable to the VRFCoordinatorV2Mock contract. */
        vrfCoordinatorV2Mock = await ethers.getContract(
          "VRFCoordinatorV2Mock",
          deployer
        );
        const subscriptionId = raffle.getSubscriptionId();
        await vrfCoordinatorV2Mock.addConsumer(subscriptionId, raffle.address);
      });

      describe("starts raffle", () => {
        it("initializes raffle", async () => {
          const state = await raffle.getRaffleState();
          assert.equal(state.toString(), "0");
        });

        it("test intervals", async () => {
          const interval = await raffle.getInterval();
          assert.equal(interval.toString(), networkConfig[chainId].interval);
        });

        it("are not able to enter raffle without enough Eth", async () => {
          await expect(raffle.enterRaffle()).to.be.revertedWithCustomError(
            raffle,
            "Raffle__NotEnoughEth"
          );
        });

        it("store players on entry", async () => {
          await raffle.enterRaffle({ value: entranceFee });
          const playerFromContract = await raffle.getPlayer(0);
          assert.equal(playerFromContract, deployer);
        });

        it("emits event on enter", async () => {
          await expect(raffle.enterRaffle({ value: entranceFee })).to.emit(
            raffle,
            "RaffleEnter"
          );
        });
      });

      it("doesn't allow entrance when raffle is calculating", async () => {
        /* It's sending ETH to the raffle contract. */
        await raffle.enterRaffle({ value: entranceFee });
        /* It's increasing the time by the interval + 1. */
        await network.provider.send("evm_increaseTime", [interval + 1]);
        /* It's mining a block. */
        await network.provider.send("evm_mine", []);
        // we pretend to be a keeper for a second to make checkUpkeep = true
        /* It's calling the performUpkeep function on the raffle contract. */
        await raffle.performUpkeep([]);
        await expect(
          raffle.enterRaffle({ value: entranceFee })
        ).to.be.revertedWithCustomError(raffle, "Raffle__NotOpen");
      });

      describe("checkUpkeep", () => {
        it("returns false if players haven't sent any ETH", async () => {
          /* It's increasing the time by the interval + 1. */
          await network.provider.send("evm_increaseTime", [interval + 1]);
          /* It's mining a block. */
          await network.provider.send("evm_mine", []);
          /* It's destructuring the upkeepNeeded variable from the checkUpkeep function. */
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x");
          /* It's asserting that the upkeepNeeded variable is true. */
          assert(!upkeepNeeded);
        });

        it("returns false if raffle isn't open", async () => {
          await raffle.enterRaffle({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.request({ method: "evm_mine", params: [] });
          await raffle.performUpkeep([]);
          const raffleState = await raffle.getRaffleState();
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x");
          assert.equal(raffleState.toString() == "1", upkeepNeeded == false);
        });

        it("returns false if enough time hasn't passed", async () => {
          await raffle.enterRaffle({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval - 1]);
          await network.provider.send("evm_mine", []);
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep([]);
          assert.equal(!upkeepNeeded, false);
        });

        it("returns true if enough time has passed, has players, eth, and is open", async () => {
          await raffle.enterRaffle({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.request({
            method: "evm_mine",
            params: [],
          });
          const { upkeepNeeded } = await raffle.callStatic.checkUpkeep("0x");
          assert(upkeepNeeded);
        });
      });

      describe("performUpkeep", function () {
        it("can only run if checkupkeep is true", async () => {
          await raffle.enterRaffle({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.send("evm_mine", []);
          const tx = await raffle.performUpkeep("0x");
          assert(tx);
        });

        it("reverts if checkup is false", async () => {
          await expect(
            raffle.performUpkeep("0x")
          ).to.be.revertedWithCustomError(raffle, "Raffle__UpkeepNotNeeded");
        });

        it("updates the raffle state and emits a requestId", async () => {
          // Too many asserts in this test!
          await raffle.enterRaffle({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.request({ method: "evm_mine", params: [] });
          const txResponse = await raffle.performUpkeep("0x");
          /* It's waiting for the transaction to be mined. */
          const txReceipt = await txResponse.wait(1);
          /* It's calling the getRaffleState function on the raffle contract. */
          const raffleState = await raffle.getRaffleState();
          /* It's destructuring the requestId from the txReceipt. */
          const requestId = txReceipt!.events![1].args!.requestId;
          assert(requestId.toNumber() > 0);
          assert(raffleState == 1);
        });
      });

      describe("fulfillRandomWords", () => {
        beforeEach(async () => {
          /* It's sending ETH to the raffle contract. */
          await raffle.enterRaffle({ value: entranceFee });
          /* It's increasing the time by the interval + 1. */
          await network.provider.send("evm_increaseTime", [interval + 1]);
          /* It's mining a block. */
          await network.provider.send("evm_mine", []);
        });

        it("can only run if checkupkeep is true", async () => {
          await raffle.enterRaffle({ value: entranceFee });
          await network.provider.send("evm_increaseTime", [interval + 1]);
          await network.provider.request({ method: "evm_mine", params: [] });
          const tx = await raffle.performUpkeep([]);
          assert(tx);
        });

        //
        it("picks a winner, resets the lottery and sends money", async () => {
          /* It's defining the number of additional entrances. */
          const additionalEntrances = 3;
          const startingIndex = 1; // deployer = 0
          /* It's getting the accounts from the hardhat network. */
          const accounts = await ethers.getSigners();
          /* It's looping through the accounts and entering the raffle. */
          for (
            let i = startingIndex;
            i < startingIndex + additionalEntrances;
            i++
          ) {
            /* It's connecting the raffle contract to the account at index i. */
            raffle = raffle.connect(accounts[i]);
            /* It's sending ETH to the raffle contract. */
            await raffle.enterRaffle({ value: entranceFee });
          }
          /* It's getting the last timestamp from the raffle contract. */
          const startingTimeStamp = await raffle.getLastTimeStamp();

          /* Waiting for the event to be fired, and then it is checking the state of the contract. */
          await new Promise<void>(async (resolve, reject) => {
            /* setting up a listener */
            raffle.once("WinnerPicked", async () => {
              console.log("winner picked, event fired");
              // assert throws an error if it fails, so we need to wrap
              // it in a try/catch so that the promise returns event
              // if it fails.
              try {
                // Now lets get the ending values...
                /* Getting the recent winner of the raffle. */
                const recentWinner = await raffle.getRecentWinner();
                console.log(recentWinner);

                /* Getting the raffle state. */
                const raffleState = await raffle.getRaffleState();
                /* Getting the balance of the winner account. */
                const winnerBalance = await accounts[2].getBalance();
                /* Getting the last time stamp of the raffle. */
                const endingTimeStamp = await raffle.getLastTimeStamp();
                /* Getting the number of players in the raffle. */
                const numOfPlayers = await raffle.getNumberOfPlayers();
                /* Checking if the number of players is now equal to 0. */
                assert.equal(numOfPlayers.toNumber(), 0);
                /* Checking that the getPlayer function reverts when the player index is 0. */
                await expect(raffle.getPlayer(0)).to.be.reverted;
                /* Checking that the recentWinner variable is equal to the address of the third account
                in the accounts array. */
                assert.equal(recentWinner.toString(), accounts[2].address);
                /* Checking if the raffleState is back to 0. */
                assert.equal(raffleState, 0);
                /* Checking that the winner's balance is equal to the starting balance plus the
                entrance fee multiplied by the number of additional entrances plus the entrance fee. */
                assert.equal(
                  winnerBalance.toString(),
                  startingBalance
                    .add(
                      parseInt(entranceFee) * additionalEntrances +
                        parseInt(entranceFee)
                    )
                    .toString()
                );
                /* Checking that the endingTimeStamp is now greater than the startingTimeStamp. 
                because lastTimeStamp should've been updated */
                assert(endingTimeStamp > startingTimeStamp);
                resolve();
              } catch (e) {
                reject(e);
              }
            });
            /* Calling the performUpkeep function on the raffle contract. */
            const tx = await raffle.performUpkeep("0x");
            /* Waiting for the transaction to be mined. */
            const txReceipt = await tx.wait(1);
            /* Getting the balance of the account at index 2 in the accounts array. */
            const startingBalance = await accounts[2].getBalance();
            /* function emiots a winner picked event */
            await vrfCoordinatorV2Mock.fulfillRandomWords(
              txReceipt!.events![1].args!.requestId,
              raffle.address
            );
          });
        });
      });
    });

// it("picks a winner, resets, and sends money", async () => {
//   const additionalEntrances = 3;
//   const startingIndex = 2;
//   for (let i = startingIndex; i < startingIndex + additionalEntrances; i++) {
//     raffle = raffleContract.connect(accounts[i]);
//     await raffle.enterRaffle({ value: raffleEntranceFee });
//   }
//   const startingTimeStamp = await raffle.getLastTimeStamp();

//   // This will be more important for our staging tests...
//   await new Promise<void>(async (resolve, reject) => {
//     raffle.once("WinnerPicked", async () => {
//       console.log("WinnerPicked event fired!");
//       // assert throws an error if it fails, so we need to wrap
//       // it in a try/catch so that the promise returns event
//       // if it fails.
//       try {
//         // Now lets get the ending values...
//         const recentWinner = await raffle.getRecentWinner();
//         const raffleState = await raffle.getRaffleState();
//         const winnerBalance = await accounts[2].getBalance();
//         const endingTimeStamp = await raffle.getLastTimeStamp();
//         await expect(raffle.getPlayer(0)).to.be.reverted;
//         assert.equal(recentWinner.toString(), accounts[2].address);
//         assert.equal(raffleState, 0);
//         assert.equal(
//           winnerBalance.toString(),
//           startingBalance
//             .add(
//               raffleEntranceFee.mul(additionalEntrances).add(raffleEntranceFee)
//             )
//             .toString()
//         );
//         assert(endingTimeStamp > startingTimeStamp);
//         resolve();
//       } catch (e) {
//         reject(e);
//       }
//     });

//     const tx = await raffle.performUpkeep("0x");
//     const txReceipt = await tx.wait(1);
//     const startingBalance = await accounts[2].getBalance();
//     await vrfCoordinatorV2Mock.fulfillRandomWords(
//       txReceipt!.events![1].args!.requestId,
//       raffle.address
//     );
//   });
// });
