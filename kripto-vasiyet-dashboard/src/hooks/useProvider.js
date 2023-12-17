import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
export const useProvider = () => {
  const { provider } = useContext(WalletContext);
  return provider;
};
