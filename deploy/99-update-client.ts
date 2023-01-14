import { ethers, network } from "hardhat";
import fs from "fs";

const clientAddressesFile = "../client/constants/contractAddress.json";
const clientAbiFile = "../client/constants/abi.json";

const deploy = async () => {
  if (process.env.UPDATE_CLIENT) {
    console.log("updating client...");
    await updateContractAddresses();
    await updateAbi();
    console.log("client data written!");
  }
};

async function updateAbi() {
  /* Getting the contract instance of the raffle contract. */
  const raffle = await ethers.getContract("Raffle");
  /* Reading the file and parsing it into a JSON object. */
  // const data: any = raffle.interface.format(ethers.utils.FormatTypes.json);
  /* Writing the abi to the clientAbiFile. */
  fs.writeFileSync(
    clientAbiFile,
    raffle.interface.format(ethers.utils.FormatTypes.json) as any
  );
}

async function updateContractAddresses() {
  /* Getting the contract instance of the raffle contract. */
  const raffle = await ethers.getContract("Raffle");
  /* Reading the file and parsing it into a JSON object. */
  const contractAddresses = JSON.parse(
    fs.readFileSync(clientAddressesFile, "utf-8") || "{}"
  );

  // /* Getting the chainId of the network that the contract is being deployed to. */
  const chainId = network.config.chainId!;

  /* Checking if the chainId is in the contractAddresses object. If it is, it checks if the raffle
  address is in the array of addresses. If it is not, it adds it. If the chainId is not in the
  contractAddresses object, it adds it and adds the raffle address to the array. */
  if (chainId in contractAddresses) {
    if (!contractAddresses[chainId].includes(raffle.address)) {
      contractAddresses[chainId].push(raffle.address);
    }
  } else {
    contractAddresses[chainId] = [raffle.address];
  }
  /* Writing the contractAddresses object to the clientAddressesFile. */
  fs.writeFileSync(clientAddressesFile, JSON.stringify(contractAddresses));
}

export default deploy;
deploy.tags = ["all", "frontend"];
