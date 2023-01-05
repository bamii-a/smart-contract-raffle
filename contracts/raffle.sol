// CONTRACT APP
// enter lottery by paying minimum amount
// pick a random winner
// winner to be selected every X minute -> automated
// chainlink oracle -> randomness, automated execution (chainlink keepers)

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// imports
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";

error Raffle_NotEnoughEth();
error Raffle_TransferFailed();

contract Raffle is VRFConsumerBaseV2 {
    /* state variables */
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    /** Lottey Variables */
    address private s_recentWinner;

    /* Chainlink VRF Variables */
    VRFCoordinatorV2Interface private immutable i_vrfCOORDINATOR;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subscriptionId;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Storing each word costs about 20,000 gas,
    // so 100,000 is a safe default for this example contract. Test and adjust
    // this limit based on the network that you select, the size of the request,
    // and the processing of the callback request in the fulfillRandomWords()
    // function.
    uint32 private immutable i_callbackGasLimit;
    // uint32 private immutable i_callbackGasLimit = 100000;
    // retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 private constant NUM_WORDS = 1;

    /* events */
    event RaffleEnter(address indexed player);
    event RequestedRaffleWinner(uint256 indexed requestId);
    event winnerPicked(address indexed winner);

    // VRFCoordinatorV2 - address of the contract that
    // does the random number verification
    constructor(
        address VRFCoordinatorV2,
        uint256 entraceFee,
        bytes32 keyHash,
        uint64 subscriptionId,
        uint32 callBackGasLimit
    ) VRFConsumerBaseV2(VRFCoordinatorV2) {
        i_entranceFee = entraceFee;
        i_vrfCOORDINATOR = VRFCoordinatorV2Interface(VRFCoordinatorV2);
        i_gasLane = keyHash;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callBackGasLimit;
    }

    function enterRaffle() public payable {
        // require msg.value > i_entranceFee
        if (msg.value < i_entranceFee) {
            revert Raffle_NotEnoughEth();
        }
        s_players.push(payable(msg.sender));
        // Events
        // emit events when we update a dynamic array or mapping
        emit RaffleEnter(msg.sender);
    }

    /* function will be called by chainlink keepers network */
    function requestRandomWinner() external {
        // request random number & do something with the random number (2 tx process)
        /* Will revert if subscription is not set and funded. */
        /* https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number */
        uint256 requestId = i_vrfCOORDINATOR.requestRandomWords(
            i_gasLane, // (or key hash) maximum gas price you are willing to pay for a request in wei
            i_subscriptionId, // The subscription ID that this contract uses for funding requests
            REQUEST_CONFIRMATIONS, // How many confirmations the Chainlink node should wait before responding. The longer the node waits, the more secure the random value is
            i_callbackGasLimit, // The limit for how much gas to use for the callback request to your contract’s fulfillRandomWords() function
            NUM_WORDS // How many random values to request.
        );
        emit RequestedRaffleWinner(requestId);
    }

    /* fulfil random numbers */
    /* internal override (it's meant to be overwritten) */
    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords /*  random Numbers*/
    ) internal override {
        // once we get randomNum, we pick a random account from s_players[] using modulo(%)
        uint256 indexOfWinner = randomWords[0] % s_players.length;
        address payable recentWinner = s_players[indexOfWinner];
        s_recentWinner = recentWinner;
        // change odds
        (bool success, ) = recentWinner.call{value: address(this).balance}("");

        if (!success) {
            revert Raffle_TransferFailed();
        }
        emit winnerPicked(recentWinner);
    }

    // function getWinnerFunds(address _address) public view returns (uint256) {
    //     uint256 balance = _address.balance;
    //     return balance / 2;
    // }

    function getEntraceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }

    function getRecentWinner() public view returns (address) {
        return s_recentWinner;
    }
}
