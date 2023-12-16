import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
export const useAddress = () => {
  const { address } = useContext(WalletContext);
  return address;
};
