import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
export const useContractAddress = () => {
  const { contractAddress } = useContext(WalletContext);
  return contractAddress;
};
