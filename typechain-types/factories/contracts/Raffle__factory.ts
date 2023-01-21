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
    name: "WinnerPicked",
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
    name: "getBalance",
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
    name: "getEntranceFee",
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
  "0x6101606040523480156200001257600080fd5b5060405162001a5338038062001a53833981810160405281019062000038919062000294565b858073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1681525050508460a081815250508573ffffffffffffffffffffffffffffffffffffffff1660e08173ffffffffffffffffffffffffffffffffffffffff16815250508361010081815250508267ffffffffffffffff166101208167ffffffffffffffff16815250508163ffffffff166101408163ffffffff16815250506000600160146101000a81548160ff021916908360018111156200010e576200010d62000330565b5b0217905550426002819055508060c081815250505050505050506200035f565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620001608262000133565b9050919050565b620001728162000153565b81146200017e57600080fd5b50565b600081519050620001928162000167565b92915050565b6000819050919050565b620001ad8162000198565b8114620001b957600080fd5b50565b600081519050620001cd81620001a2565b92915050565b6000819050919050565b620001e881620001d3565b8114620001f457600080fd5b50565b6000815190506200020881620001dd565b92915050565b600067ffffffffffffffff82169050919050565b6200022d816200020e565b81146200023957600080fd5b50565b6000815190506200024d8162000222565b92915050565b600063ffffffff82169050919050565b6200026e8162000253565b81146200027a57600080fd5b50565b6000815190506200028e8162000263565b92915050565b60008060008060008060c08789031215620002b457620002b36200012e565b5b6000620002c489828a0162000181565b9650506020620002d789828a01620001bc565b9550506040620002ea89828a01620001f7565b9450506060620002fd89828a016200023c565b93505060806200031089828a016200027d565b92505060a06200032389828a01620001bc565b9150509295509295509295565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60805160a05160c05160e05161010051610120516101405161167d620003d6600039600061071f0152600081816106fc0152610948015260006106db0152600061069f0152600081816108740152610916015260008181610376015261047b0152600081816103bb015261040f015261167d6000f3fe6080604052600436106100e85760003560e01c806353a2c19a1161008a578063c1c244e811610059578063c1c244e8146102b4578063de3d9fb7146102df578063e55ae4e81461030a578063fd6673f514610347576100e8565b806353a2c19a146101f55780635f1b0fd8146102205780636e04ff0d1461024b57806391ad27b414610289576100e8565b80631fe543e3116100c65780631fe543e31461016e5780632cfcc539146101975780634585e33b146101a1578063473f1ddc146101ca576100e8565b806309bc33a7146100ed578063115cbaf51461011857806312065fe014610143575b600080fd5b3480156100f957600080fd5b50610102610372565b60405161010f9190610d91565b60405180910390f35b34801561012457600080fd5b5061012d61039a565b60405161013a9190610e23565b60405180910390f35b34801561014f57600080fd5b506101586103b1565b6040516101659190610d91565b60405180910390f35b34801561017a57600080fd5b5061019560048036038101906101909190610fd7565b6103b9565b005b61019f610479565b005b3480156101ad57600080fd5b506101c860048036038101906101c3919061108e565b6105e8565b005b3480156101d657600080fd5b506101df6107d8565b6040516101ec919061111c565b60405180910390f35b34801561020157600080fd5b5061020a610802565b6040516102179190610d91565b60405180910390f35b34801561022c57600080fd5b50610235610811565b6040516102429190610d91565b60405180910390f35b34801561025757600080fd5b50610272600480360381019061026d91906111ec565b61081e565b6040516102809291906112cf565b60405180910390f35b34801561029557600080fd5b5061029e610912565b6040516102ab9190610d91565b60405180910390f35b3480156102c057600080fd5b506102c961093a565b6040516102d69190610d91565b60405180910390f35b3480156102eb57600080fd5b506102f4610944565b6040516103019190610d91565b60405180910390f35b34801561031657600080fd5b50610331600480360381019061032c91906112ff565b610976565b60405161033e919061111c565b60405180910390f35b34801561035357600080fd5b5061035c6109bd565b6040516103699190610d91565b60405180910390f35b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6000600160149054906101000a900460ff16905090565b600047905090565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461046b57337f00000000000000000000000000000000000000000000000000000000000000006040517f1cf993f400000000000000000000000000000000000000000000000000000000815260040161046292919061132c565b60405180910390fd5b61047582826109c9565b5050565b7f00000000000000000000000000000000000000000000000000000000000000003410156104d3576040517fa10e43c700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600060018111156104e7576104e6610dac565b5b600160149054906101000a900460ff16600181111561050957610508610dac565b5b14610540576040517f1425571c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6000339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167f0805e1d667bddb8a95f0f09880cf94f403fb596ce79928d9f29b74203ba284d460405160405180910390a2565b60006106026040518060200160405280600081525061081e565b509050806106715747600080549050600160149054906101000a900460ff16600181111561063357610632610dac565b5b6040517f584327aa00000000000000000000000000000000000000000000000000000000815260040161066893929190611355565b60405180910390fd5b60018060146101000a81548160ff0219169083600181111561069657610695610dac565b5b021790555060007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16635d3b1d307f00000000000000000000000000000000000000000000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000060037f000000000000000000000000000000000000000000000000000000000000000060016040518663ffffffff1660e01b8152600401610760959493929190611404565b6020604051808303816000875af115801561077f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a3919061146c565b9050807fcd6e45c8998311cab7e9d4385596cac867e20a0587194b954fa3a731c93ce78b60405160405180910390a250505050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600163ffffffff16905090565b6000600361ffff16905090565b600060606000600160149054906101000a900460ff16600181111561084657610845610dac565b5b6000600181111561085a57610859610dac565b5b1490506000804711905060008060008054905011905060007f0000000000000000000000000000000000000000000000000000000000000000600254426108a191906114c8565b1190506108b081858585610c06565b8080156108ba5750835b80156108c35750825b80156108cc5750815b9550856040518060400160405280600381526020017f30783000000000000000000000000000000000000000000000000000000000008152509550955050505050915091565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b6000600254905090565b60007f000000000000000000000000000000000000000000000000000000000000000067ffffffffffffffff16905090565b600080828154811061098b5761098a6114fc565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b60008080549050905090565b60008080549050826000815181106109e4576109e36114fc565b5b60200260200101516109f6919061155a565b90506000808281548110610a0d57610a0c6114fc565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160146101000a81548160ff02191690836001811115610aa157610aa0610dac565b5b0217905550600067ffffffffffffffff811115610ac157610ac0610e94565b5b604051908082528060200260200182016040528015610aef5781602001602082028036833780820191505090505b5060009080519060200190610b05929190610cd1565b504260028190555060008173ffffffffffffffffffffffffffffffffffffffff16601447610b33919061158b565b604051610b3f906115ed565b60006040518083038185875af1925050503d8060008114610b7c576040519150601f19603f3d011682016040523d82523d6000602084013e610b81565b606091505b5050905080610bbc576040517fa1d04b3900000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff167f5b690ec4a06fe979403046eaeea5b3ce38524683c3001f662c8b5a829632f7df60405160405180910390a25050505050565b610ca284848484604051602401610c209493929190611602565b6040516020818303038152906040527f3b2a5ce0000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610ca8565b50505050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b828054828255906000526020600020908101928215610d4a579160200282015b82811115610d495782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190610cf1565b5b509050610d579190610d5b565b5090565b5b80821115610d74576000816000905550600101610d5c565b5090565b6000819050919050565b610d8b81610d78565b82525050565b6000602082019050610da66000830184610d82565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b60028110610dec57610deb610dac565b5b50565b6000819050610dfd82610ddb565b919050565b6000610e0d82610def565b9050919050565b610e1d81610e02565b82525050565b6000602082019050610e386000830184610e14565b92915050565b6000604051905090565b600080fd5b600080fd5b610e5b81610d78565b8114610e6657600080fd5b50565b600081359050610e7881610e52565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610ecc82610e83565b810181811067ffffffffffffffff82111715610eeb57610eea610e94565b5b80604052505050565b6000610efe610e3e565b9050610f0a8282610ec3565b919050565b600067ffffffffffffffff821115610f2a57610f29610e94565b5b602082029050602081019050919050565b600080fd5b6000610f53610f4e84610f0f565b610ef4565b90508083825260208201905060208402830185811115610f7657610f75610f3b565b5b835b81811015610f9f5780610f8b8882610e69565b845260208401935050602081019050610f78565b5050509392505050565b600082601f830112610fbe57610fbd610e7e565b5b8135610fce848260208601610f40565b91505092915050565b60008060408385031215610fee57610fed610e48565b5b6000610ffc85828601610e69565b925050602083013567ffffffffffffffff81111561101d5761101c610e4d565b5b61102985828601610fa9565b9150509250929050565b600080fd5b60008083601f84011261104e5761104d610e7e565b5b8235905067ffffffffffffffff81111561106b5761106a611033565b5b60208301915083600182028301111561108757611086610f3b565b5b9250929050565b600080602083850312156110a5576110a4610e48565b5b600083013567ffffffffffffffff8111156110c3576110c2610e4d565b5b6110cf85828601611038565b92509250509250929050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611106826110db565b9050919050565b611116816110fb565b82525050565b6000602082019050611131600083018461110d565b92915050565b600080fd5b600067ffffffffffffffff82111561115757611156610e94565b5b61116082610e83565b9050602081019050919050565b82818337600083830152505050565b600061118f61118a8461113c565b610ef4565b9050828152602081018484840111156111ab576111aa611137565b5b6111b684828561116d565b509392505050565b600082601f8301126111d3576111d2610e7e565b5b81356111e384826020860161117c565b91505092915050565b60006020828403121561120257611201610e48565b5b600082013567ffffffffffffffff8111156112205761121f610e4d565b5b61122c848285016111be565b91505092915050565b60008115159050919050565b61124a81611235565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561128a57808201518184015260208101905061126f565b60008484015250505050565b60006112a182611250565b6112ab818561125b565b93506112bb81856020860161126c565b6112c481610e83565b840191505092915050565b60006040820190506112e46000830185611241565b81810360208301526112f68184611296565b90509392505050565b60006020828403121561131557611314610e48565b5b600061132384828501610e69565b91505092915050565b6000604082019050611341600083018561110d565b61134e602083018461110d565b9392505050565b600060608201905061136a6000830186610d82565b6113776020830185610d82565b6113846040830184610d82565b949350505050565b6000819050919050565b61139f8161138c565b82525050565b600067ffffffffffffffff82169050919050565b6113c2816113a5565b82525050565b600061ffff82169050919050565b6113df816113c8565b82525050565b600063ffffffff82169050919050565b6113fe816113e5565b82525050565b600060a0820190506114196000830188611396565b61142660208301876113b9565b61143360408301866113d6565b61144060608301856113f5565b61144d60808301846113f5565b9695505050505050565b60008151905061146681610e52565b92915050565b60006020828403121561148257611481610e48565b5b600061149084828501611457565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006114d382610d78565b91506114de83610d78565b92508282039050818111156114f6576114f5611499565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061156582610d78565b915061157083610d78565b9250826115805761157f61152b565b5b828206905092915050565b600061159682610d78565b91506115a183610d78565b9250826115b1576115b061152b565b5b828204905092915050565b600081905092915050565b50565b60006115d76000836115bc565b91506115e2826115c7565b600082019050919050565b60006115f8826115ca565b9150819050919050565b60006080820190506116176000830187611241565b6116246020830186611241565b6116316040830185611241565b61163e6060830184611241565b9594505050505056fea26469706673582212208249a199185ee13b3ae8b4cbdc26bbf18c3691b05bbcacb09b55f8872e062cc564736f6c63430008100033";

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
