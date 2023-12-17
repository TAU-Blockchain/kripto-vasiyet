import { useState, useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useSigner } from "../hooks/useSigner";
import { ethers } from "ethers";
import { WalletContext } from "../context/WalletContext";
import { useContractAddress } from "../hooks/useContractAddress";
import ABI from "../constant/ABI";
import BYTECODE from "../constant/BYTECODE";
import ContractModal from "../components/ContractModal";
import PendingModal from "./PendingModal";
function MainSection() {
  const { saveContractAddress } = useContext(WalletContext);
  const [globalContract, setGlobalContract] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heirs, setHeirs] = useState(null);
  const [isPendingModalOpen, setPendingModalOpen] = useState(false);
  const signer = useSigner();
  const contractAddress = useContractAddress();
  const inheritableTokens = ["0x779877A7B0D9E8603169DdbD7836e478b4624789"];
  const functionsRouter = "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0";
  const subscriptionId = "1863";
  const gasLimit = "300000";
  const donId =
    "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000";
  // useEffect(() => {
  //   handleGetHeirsFromGlobalContract();
  // }, []);

  const delay = () => new Promise((resolve) => setTimeout(resolve, 5000));
  const createContract = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      setGlobalContract(contract);
    } catch (error) {
      setPendingModalOpen(false);
      console.error("Error deploying contract:", error);
    }
  };
  const deployContract = async () => {
    setPendingModalOpen(true);
    try {
      const contractFactory = new ethers.ContractFactory(ABI, BYTECODE, signer);
      const deployedContract = await contractFactory.deploy(
        inheritableTokens,
        functionsRouter,
        subscriptionId,
        gasLimit,
        donId
      );
      saveContractAddress(deployedContract.address);
      // console.log("Transaction hash:", deployedContract.deployTransaction.hash);
      await deployedContract.deployed();
      await delay();
      await createContract();
      console.log("Kontrat Olusturuldu");
      setIsModalOpen(true);
    } catch (error) {
      setPendingModalOpen(false);
      console.error("Error deploying contract:", error);
    }
  };

  const handleModalSave = async (data) => {
    setPendingModalOpen(true);

    try {
      setIsModalOpen(true);
      handleAddHeirForERC20(data.tcNumber, data.addresses, data.shares);
      setIsModalOpen(false);
    } catch (error) {
      setPendingModalOpen(false);
      console.log(error);
    }
  };

  const closePendingModal = () => {
    setPendingModalOpen(false);
  };
  const handleAddHeirForERC20 = async (tcNumber, addresses, shares) => {
    const stringAddresses = addresses.map(String);
    const stringShares = shares.map(String);

    if (!globalContract) {
      console.error("Kontrat bulunamadı.");
      return;
    }

    try {
      const tx = await globalContract.addHeir(stringAddresses, stringShares);
      await tx.wait();

      console.log("Başarıyla Oluşturuldu:", tx.hash);
      handleGetHeirsFromGlobalContract();
    } catch (error) {
      console.error("Error adding heir for ERC20:", error);
    }
  };
  const handleGetHeirsFromGlobalContract = async () => {
    try {
      if (!globalContract) {
        console.error("Global kontrat bulunamadı.");
        return;
      }

      // globalContract üzerinden heirs fonksiyonunu çağırma
      const data = await globalContract.heirs(0);
      setHeirs(data);
      console.log("Heirs from Global Contract:", heirs);
    } catch (error) {
      console.error("Error getting heirs from global contract:", error);
    }
  };
  return (
    <div className="w-10/12 bg-white inline-flex justify-center items-start shadow-xl min-h-screen p-20">
      {heirs ? (
        <div className="w-full">
          <table className="min-w-full bg-white border divide-y divide-gray-200 rounded">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left bg-gray-100">Mirascı</th>
                <th className="py-3 px-6 text-left bg-gray-100">Hisse Oranı</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-6">{heirs[0]}</td>
              </tr>
              <tr>
                <td className="py-3 px-6">%{heirs[1]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div
          id="section1"
          className="flex flex-col justify-center items-center py-10"
        >
          <div
            className="max-w-md mx-auto bg-gradient-to-br from-gray-300 to-gray-300 p-6 rounded-md flex flex-col items-center justify-center space-y-4 hover:cursor-pointer"
            onClick={deployContract}
          >
            <FaPlusCircle className="text-white text-4xl" />
            <p className="text-white text-lg font-semibold">Vasiyet Oluştur</p>
          </div>

          <ContractModal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            onSave={handleModalSave}
          />
          {isPendingModalOpen && (
            <PendingModal handleClose={closePendingModal} />
          )}
        </div>
      )}
    </div>
  );
}

export default MainSection;
