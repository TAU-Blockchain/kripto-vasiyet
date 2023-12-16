/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [address, setAddress] = useState(null);

  const initializeWallet = async () => {
    if (!window.ethereum) {
      alert("Metamask is not installed");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = await signer.getAddress();

      setProvider(provider);
      setSigner(signer);
      setAccounts(accounts);
      setAddress(address);
    } catch (error) {
      console.error("Error initializing wallet:", error);
    }
  };

  //   useEffect(() => {
  //     initializeWallet();
  //   }, []);

  return (
    <WalletContext.Provider
      value={{
        provider,
        signer,
        accounts,
        address,
        initializeWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export { WalletContext, WalletProvider };
