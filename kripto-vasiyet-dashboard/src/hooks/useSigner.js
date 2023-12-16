import { useContext } from "react";
import { WalletContext } from "../context/WalletContext";
export const useSigner = () => {
  const { signer } = useContext(WalletContext);
  return signer;
};
