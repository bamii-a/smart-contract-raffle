// CONTRACT APP
// enter lottery by paying minimum amount
// pick a random winner
// winner to be selected every X minute -> automated
// chainlink oracle -> randomness, automated execution (chainlink keepers)

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

// imports
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AutomationCompatibleInterface.sol";

error Raffle__NotEnoughEth();
error Raffle__TransferFailed();
error Raffle__NotOpen();
error Raffle__UpkeepNotNeeded(
    uint256 currentBalance,
    uint256 numPlayers,
    uint256 raffleState
);

/**
 * @title lottery contract
 * @author bami
 * @notice contract is for creating a Decentralized smart contract
 * @dev implements chainlink VRF v2 & chainlink automation
 */

contract Raffle is VRFConsumerBaseV2, AutomationCompatibleInterface {
    /* state variables */
    uint256 private immutable i_entranceFee;
    address payable[] private s_players;

    /** Lottey Variables */
    address private s_recentWinner;
    enum RaffleState {
        OPEN,
        CALCULATING
    }

    RaffleState private s_raffleState;
    uint256 private s_lastTimeStamp;
    uint256 private immutable i_interval;

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
        address VRFCoordinatorV2, // contract (we will need to deploy a mock for this, before deploying raffle.sol)
        // can be changed depending on what chain we're on
        uint256 entranceFee,
        bytes32 keyHash,
        uint64 subscriptionId,
        uint32 callBackGasLimit,
        uint256 interval
    ) VRFConsumerBaseV2(VRFCoordinatorV2) {
        i_entranceFee = entranceFee;
        i_vrfCOORDINATOR = VRFCoordinatorV2Interface(VRFCoordinatorV2);
        i_gasLane = keyHash;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callBackGasLimit;
        s_raffleState = RaffleState.OPEN;
        s_lastTimeStamp = block.timestamp;
        i_interval = interval;
    }

    function enterRaffle() public payable {
        // require msg.value > i_entranceFee
        if (msg.value < i_entranceFee) {
            revert Raffle__NotEnoughEth();
        }

        if (s_raffleState != RaffleState.OPEN) {
            revert Raffle__NotOpen();
        }
        s_players.push(payable(msg.sender));
        // Events
        // emit events when we update a dynamic array or mapping
        emit RaffleEnter(msg.sender);
    }

    /**
     * @dev This is the function that the Chainlink Keeper nodes call
     * they look for `upkeepNeeded` to return True.
     * the following should be true for this to return true:
     * 1. The time interval has passed between raffle runs.
     * 2. The lottery is open.
     * 3. The contract has ETH.
     * 4. Implicity, your subscription is funded with LINK.
     */

    function checkUpkeep(
        bytes memory /* checkData*/
    )
        public
        view
        override
        returns (
            // external was changed to public so our own functions can call this function */
            bool upkeepNeeded,
            bytes memory /* performData*/
        )
    {
        bool isOpen = RaffleState.OPEN == s_raffleState;
        bool hasBalance = address(this).balance > 0;
        bool hasPlayers = s_players.length > 0;
        bool timePassed = ((block.timestamp - s_lastTimeStamp) > i_interval);
        upkeepNeeded = (timePassed && isOpen && hasBalance && hasPlayers);
        return (upkeepNeeded, "0x0");
        // We don't use the checkData in this. The checkData is defined when the Upkeep was registered.
    }

    /* function will be called by chainlink keepers network */
    /* previously requestRandomWinner, now performUpkeep */
    /**
     * @dev Once `checkUpkeep` is returning `true`, this function is called
     * and it kicks off a Chainlink VRF call to get a random winner.
     */
    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        (bool upKeepNeeded, ) = checkUpkeep("");
        if (!upKeepNeeded) {
            revert Raffle__UpkeepNotNeeded(
                address(this).balance,
                s_players.length,
                uint256(s_raffleState)
            );
        }
        // request random number & do something with the random number (2 tx process)
        /* Will revert if subscription is not set and funded. */
        /* https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number */
        s_raffleState = RaffleState.CALCULATING;
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
        // once we get randomWord / Num, we pick a random account from s_players[] using modulo(%)
        uint256 indexOfWinner = randomWords[0] % s_players.length;
        address payable recentWinner = s_players[indexOfWinner];
        s_recentWinner = recentWinner;
        s_raffleState = RaffleState.OPEN;
        s_players = new address payable[](0);
        s_lastTimeStamp = block.timestamp;
        // change odds
        (bool success, ) = recentWinner.call{value: address(this).balance / 20}(
            ""
        );

        if (!success) {
            revert Raffle__TransferFailed();
        }
        emit winnerPicked(recentWinner);
    }

    // function getWinnerFunds(address _address) public view returns (uint256) {
    //     uint256 balance = _address.balance;
    //     return balance / 2;
    // }

    /** Getter Functions */

    function getRaffleState() public view returns (RaffleState) {
        return s_raffleState;
    }

    function getEntraceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getPlayer(uint256 index) public view returns (address) {
        return s_players[index];
    }

    function getRecentWinner() public view returns (address) {
        return s_recentWinner;
    }

    function getLastTimeStamp() public view returns (uint256) {
        return s_lastTimeStamp;
    }

    function getInterval() public view returns (uint256) {
        return i_interval;
    }

    function getNumWords() public pure returns (uint256) {
        return NUM_WORDS;
    }

    function getRequestConfirmations() public pure returns (uint256) {
        return REQUEST_CONFIRMATIONS;
    }

    function getNumberOfPlayers() public view returns (uint256) {
        return s_players.length;
    }

    function getSubscriptionId() public view returns (uint256) {
        return i_subscriptionId;
    }
}
