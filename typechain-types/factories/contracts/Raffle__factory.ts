/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BytesLike,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Raffle, RaffleInterface } from "../../contracts/Raffle";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "VRFCoordinatorV2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "entranceFee",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "keyHash",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "callBackGasLimit",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "interval",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "have",
        type: "address",
      },
      {
        internalType: "address",
        name: "want",
        type: "address",
      },
    ],
    name: "OnlyCoordinatorCanFulfill",
    type: "error",
  },
  {
    inputs: [],
    name: "Raffle__NotEnoughEth",
    type: "error",
  },
  {
    inputs: [],
    name: "Raffle__NotOpen",
    type: "error",
  },
  {
    inputs: [],
    name: "Raffle__TransferFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "currentBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "numPlayers",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "raffleState",
        type: "uint256",
      },
    ],
    name: "Raffle__UpkeepNotNeeded",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "RaffleEnter",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "RequestedRaffleWinner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "winnerPicked",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "checkUpkeep",
    outputs: [
      {
        internalType: "bool",
        name: "upkeepNeeded",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "enterRaffle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntraceFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getInterval",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLastTimeStamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumWords",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfPlayers",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getPlayer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRaffleState",
    outputs: [
      {
        internalType: "enum Raffle.RaffleState",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRecentWinner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRequestConfirmations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getSubscriptionId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "performUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "randomWords",
        type: "uint256[]",
      },
    ],
    name: "rawFulfillRandomWords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6101606040523480156200001257600080fd5b50604051620018f9380380620018f9833981810160405281019062000038919062000294565b858073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050508460a081815250508573ffffffffffffffffffffffffffffffffffffffff1660e08173ffffffffffffffffffffffffffffffffffffffff16815250508361010081815250508267ffffffffffffffff166101208167ffffffffffffffff16815250508163ffffffff166101408163ffffffff16815250506000600160146101000a81548160ff021916908360018111156200010e576200010d62000330565b5b0217905550426002819055508060c081815250505050505050506200035f565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001608262000133565b9050919050565b620001728162000153565b81146200017e57600080fd5b50565b600081519050620001928162000167565b92915050565b6000819050919050565b620001ad8162000198565b8114620001b957600080fd5b50565b600081519050620001cd81620001a2565b92915050565b6000819050919050565b620001e881620001d3565b8114620001f457600080fd5b50565b6000815190506200020881620001dd565b92915050565b600067ffffffffffffffff82169050919050565b6200022d816200020e565b81146200023957600080fd5b50565b6000815190506200024d8162000222565b92915050565b600063ffffffff82169050919050565b6200026e8162000253565b81146200027a57600080fd5b50565b6000815190506200028e8162000263565b92915050565b60008060008060008060c08789031215620002b457620002b36200012e565b5b6000620002c489828a0162000181565b9650506020620002d789828a01620001bc565b9550506040620002ea89828a01620001f7565b9450506060620002fd89828a016200023c565b93505060806200031089828a016200027d565b92505060a06200032389828a01620001bc565b9150509295509295509295565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60805160a05160c05160e051610100516101205161014051611523620003d660003960006106b901526000818161069601526108fe015260006106750152600061063901526000818161080e01526108a401526000818161041501526108d601526000818161035501526103a901526115236000f3fe6080604052600436106100dd5760003560e01c80636e04ff0d1161007f578063ce147cf311610059578063ce147cf31461027e578063de3d9fb7146102a9578063e55ae4e8146102d4578063fd6673f514610311576100dd565b80636e04ff0d146101ea57806391ad27b414610228578063c1c244e814610253576100dd565b80634585e33b116100bb5780634585e33b14610140578063473f1ddc1461016957806353a2c19a146101945780635f1b0fd8146101bf576100dd565b8063115cbaf5146100e25780631fe543e31461010d5780632cfcc53914610136575b600080fd5b3480156100ee57600080fd5b506100f761033c565b6040516101049190610cda565b60405180910390f35b34801561011957600080fd5b50610134600480360381019061012f9190610e98565b610353565b005b61013e610413565b005b34801561014c57600080fd5b5061016760048036038101906101629190610f4f565b610582565b005b34801561017557600080fd5b5061017e610772565b60405161018b9190610fdd565b60405180910390f35b3480156101a057600080fd5b506101a961079c565b6040516101b69190611007565b60405180910390f35b3480156101cb57600080fd5b506101d46107ab565b6040516101e19190611007565b60405180910390f35b3480156101f657600080fd5b50610211600480360381019061020c91906110d7565b6107b8565b60405161021f9291906111ba565b60405180910390f35b34801561023457600080fd5b5061023d6108a0565b60405161024a9190611007565b60405180910390f35b34801561025f57600080fd5b506102686108c8565b6040516102759190611007565b60405180910390f35b34801561028a57600080fd5b506102936108d2565b6040516102a09190611007565b60405180910390f35b3480156102b557600080fd5b506102be6108fa565b6040516102cb9190611007565b60405180910390f35b3480156102e057600080fd5b506102fb60048036038101906102f691906111ea565b61092c565b6040516103089190610fdd565b60405180910390f35b34801561031d57600080fd5b50610326610973565b6040516103339190611007565b60405180910390f35b6000600160149054906101000a900460ff16905090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461040557337f00000000000000000000000000000000000000000000000000000000000000006040517f1cf993f40000000000000000000000000000000000000000000000000000000081526004016103fc929190611217565b60405180910390fd5b61040f828261097f565b5050565b7f000000000000000000000000000000000000000000000000000000000000000034101561046d576040517fa10e43c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000600181111561048157610480610c63565b5b600160149054906101000a900460ff1660018111156104a3576104a2610c63565b5b146104da576040517f1425571c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167f0805e1d667bddb8a95f0f09880cf94f403fb596ce79928d9f29b74203ba284d460405160405180910390a2565b600061059c604051806020016040528060008152506107b8565b5090508061060b5747600080549050600160149054906101000a900460ff1660018111156105cd576105cc610c63565b5b6040517f584327aa00000000000000000000000000000000000000000000000000000000815260040161060293929190611240565b60405180910390fd5b60018060146101000a81548160ff021916908360018111156106305761062f610c63565b5b021790555060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635d3b1d307f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000060037f000000000000000000000000000000000000000000000000000000000000000060016040518663ffffffff1660e01b81526004016106fa9594939291906112ef565b6020604051808303816000875af1158015610719573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061073d9190611357565b9050807fcd6e45c8998311cab7e9d4385596cac867e20a0587194b954fa3a731c93ce78b60405160405180910390a250505050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600163ffffffff16905090565b6000600361ffff16905090565b600060606000600160149054906101000a900460ff1660018111156107e0576107df610c63565b5b600060018111156107f4576107f3610c63565b5b1490506000804711905060008060008054905011905060007f00000000000000000000000000000000000000000000000000000000000000006002544261083b91906113b3565b1190508080156108485750835b80156108515750825b801561085a5750815b9550856040518060400160405280600381526020017f30783000000000000000000000000000000000000000000000000000000000008152509550955050505050915091565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6000600254905090565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60007f000000000000000000000000000000000000000000000000000000000000000067ffffffffffffffff16905090565b6000808281548110610941576109406113e7565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008080549050905090565b600080805490508260008151811061099a576109996113e7565b5b60200260200101516109ac9190611445565b905060008082815481106109c3576109c26113e7565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160146101000a81548160ff02191690836001811115610a5757610a56610c63565b5b0217905550600067ffffffffffffffff811115610a7757610a76610d55565b5b604051908082528060200260200182016040528015610aa55781602001602082028036833780820191505090505b5060009080519060200190610abb929190610bbc565b504260028190555060008173ffffffffffffffffffffffffffffffffffffffff16601447610ae99190611476565b604051610af5906114d8565b60006040518083038185875af1925050503d8060008114610b32576040519150601f19603f3d011682016040523d82523d6000602084013e610b37565b606091505b5050905080610b72576040517fa1d04b3900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff167f794919b0f484b8e90b1b817ac7f880f846fbd8a9813dee2a378e820db094e3d160405160405180910390a25050505050565b828054828255906000526020600020908101928215610c35579160200282015b82811115610c345782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610bdc565b5b509050610c429190610c46565b5090565b5b80821115610c5f576000816000905550600101610c47565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110610ca357610ca2610c63565b5b50565b6000819050610cb482610c92565b919050565b6000610cc482610ca6565b9050919050565b610cd481610cb9565b82525050565b6000602082019050610cef6000830184610ccb565b92915050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b610d1c81610d09565b8114610d2757600080fd5b50565b600081359050610d3981610d13565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610d8d82610d44565b810181811067ffffffffffffffff82111715610dac57610dab610d55565b5b80604052505050565b6000610dbf610cf5565b9050610dcb8282610d84565b919050565b600067ffffffffffffffff821115610deb57610dea610d55565b5b602082029050602081019050919050565b600080fd5b6000610e14610e0f84610dd0565b610db5565b90508083825260208201905060208402830185811115610e3757610e36610dfc565b5b835b81811015610e605780610e4c8882610d2a565b845260208401935050602081019050610e39565b5050509392505050565b600082601f830112610e7f57610e7e610d3f565b5b8135610e8f848260208601610e01565b91505092915050565b60008060408385031215610eaf57610eae610cff565b5b6000610ebd85828601610d2a565b925050602083013567ffffffffffffffff811115610ede57610edd610d04565b5b610eea85828601610e6a565b9150509250929050565b600080fd5b60008083601f840112610f0f57610f0e610d3f565b5b8235905067ffffffffffffffff811115610f2c57610f2b610ef4565b5b602083019150836001820283011115610f4857610f47610dfc565b5b9250929050565b60008060208385031215610f6657610f65610cff565b5b600083013567ffffffffffffffff811115610f8457610f83610d04565b5b610f9085828601610ef9565b92509250509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610fc782610f9c565b9050919050565b610fd781610fbc565b82525050565b6000602082019050610ff26000830184610fce565b92915050565b61100181610d09565b82525050565b600060208201905061101c6000830184610ff8565b92915050565b600080fd5b600067ffffffffffffffff82111561104257611041610d55565b5b61104b82610d44565b9050602081019050919050565b82818337600083830152505050565b600061107a61107584611027565b610db5565b90508281526020810184848401111561109657611095611022565b5b6110a1848285611058565b509392505050565b600082601f8301126110be576110bd610d3f565b5b81356110ce848260208601611067565b91505092915050565b6000602082840312156110ed576110ec610cff565b5b600082013567ffffffffffffffff81111561110b5761110a610d04565b5b611117848285016110a9565b91505092915050565b60008115159050919050565b61113581611120565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561117557808201518184015260208101905061115a565b60008484015250505050565b600061118c8261113b565b6111968185611146565b93506111a6818560208601611157565b6111af81610d44565b840191505092915050565b60006040820190506111cf600083018561112c565b81810360208301526111e18184611181565b90509392505050565b600060208284031215611200576111ff610cff565b5b600061120e84828501610d2a565b91505092915050565b600060408201905061122c6000830185610fce565b6112396020830184610fce565b9392505050565b60006060820190506112556000830186610ff8565b6112626020830185610ff8565b61126f6040830184610ff8565b949350505050565b6000819050919050565b61128a81611277565b82525050565b600067ffffffffffffffff82169050919050565b6112ad81611290565b82525050565b600061ffff82169050919050565b6112ca816112b3565b82525050565b600063ffffffff82169050919050565b6112e9816112d0565b82525050565b600060a0820190506113046000830188611281565b61131160208301876112a4565b61131e60408301866112c1565b61132b60608301856112e0565b61133860808301846112e0565b9695505050505050565b60008151905061135181610d13565b92915050565b60006020828403121561136d5761136c610cff565b5b600061137b84828501611342565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006113be82610d09565b91506113c983610d09565b92508282039050818111156113e1576113e0611384565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061145082610d09565b915061145b83610d09565b92508261146b5761146a611416565b5b828206905092915050565b600061148182610d09565b915061148c83610d09565b92508261149c5761149b611416565b5b828204905092915050565b600081905092915050565b50565b60006114c26000836114a7565b91506114cd826114b2565b600082019050919050565b60006114e3826114b5565b915081905091905056fea26469706673582212201c3e1fe30a90be2c18de4b5c801f6e3bc0c202998fa29ed5a5b6288c294cdefd64736f6c63430008100033";

type RaffleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RaffleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Raffle__factory extends ContractFactory {
  constructor(...args: RaffleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    VRFCoordinatorV2: PromiseOrValue<string>,
    entranceFee: PromiseOrValue<BigNumberish>,
    keyHash: PromiseOrValue<BytesLike>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    callBackGasLimit: PromiseOrValue<BigNumberish>,
    interval: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Raffle> {
    return super.deploy(
      VRFCoordinatorV2,
      entranceFee,
      keyHash,
      subscriptionId,
      callBackGasLimit,
      interval,
      overrides || {}
    ) as Promise<Raffle>;
  }
  override getDeployTransaction(
    VRFCoordinatorV2: PromiseOrValue<string>,
    entranceFee: PromiseOrValue<BigNumberish>,
    keyHash: PromiseOrValue<BytesLike>,
    subscriptionId: PromiseOrValue<BigNumberish>,
    callBackGasLimit: PromiseOrValue<BigNumberish>,
    interval: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      VRFCoordinatorV2,
      entranceFee,
      keyHash,
      subscriptionId,
      callBackGasLimit,
      interval,
      overrides || {}
    );
  }
  override attach(address: string): Raffle {
    return super.attach(address) as Raffle;
  }
  override connect(signer: Signer): Raffle__factory {
    return super.connect(signer) as Raffle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RaffleInterface {
    return new utils.Interface(_abi) as RaffleInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Raffle {
    return new Contract(address, _abi, signerOrProvider) as Raffle;
  }
}
