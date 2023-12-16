import { useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import { useAddress } from "../hooks/useAddress";
import ErrorModal from "./ErrorModal";
function MainAside() {
  const { initializeWallet } = useContext(WalletContext);
  const address = useAddress();
  const [error, setError] = useState(null);

  const handleCloseError = () => {
    setError(null);
  };
  const checkMetamask = () => {
    if (!window.ethereum) {
      return false;
    }
    console.log(55);

    return true;
  };
  return (
    <div className="w-2/12 bg-ed-gray shadow inline-flex flex-col justify-start items-center">
      {error && <ErrorModal error={error} onClose={handleCloseError} />}
      <div className="flex justify-center items-center py-10">
        {address ? (
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            // onClick={() => {
            //   if (checkMetamask() === true) {
            //     initializeWallet();
            //   } else {
            //     setError(true);
            //   }
            // }}
          >
            {address.slice(0, 11)}
          </button>
        ) : (
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={() => {
              if (checkMetamask() === true) {
                initializeWallet();
              } else {
                setError(true);
              }
            }}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default MainAside;
