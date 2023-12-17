/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoTrashBinSharp } from "react-icons/io5";
const ContractModal = ({ isOpen, onRequestClose, onSave }) => {
  const [tcNumber, setTcNumber] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [shares, setShares] = useState([]);
  const [totalSharesError, setTotalSharesError] = useState(false);

  const handleSave = () => {
    // if (totalShares !== 100) {
    //   setTotalSharesError(true);
    // } else {
    //   setTotalSharesError(false);
    // }
    onSave({ tcNumber, addresses, shares });
  };

  const handleAddItem = () => {
    setAddresses([...addresses, ""]);
    setShares([...shares, ""]);
  };

  const handleRemoveItem = (index) => {
    const updatedAddresses = [...addresses];
    const updatedShares = [...shares];

    updatedAddresses.splice(index, 1);
    updatedShares.splice(index, 1);

    setAddresses(updatedAddresses);
    setShares(updatedShares);
  };

  const handleAddressChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = value;
    setAddresses(updatedAddresses);
  };

  const handleShareChange = (index, value) => {
    const updatedShares = [...shares];
    updatedShares[index] = value;
    setShares(updatedShares);
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onRequestClose}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white p-4 w-96 rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Mirasçı Ekle</h2>

          <label className="block mb-2">
            TC Numarası:
            <input
              type="text"
              value={tcNumber}
              onChange={(e) => setTcNumber(e.target.value)}
              className="w-full p-2 border rounded mt-1"
            />
          </label>

          {addresses.map((address, index) => (
            <div
              key={index}
              className="mb-4 flex flex-row justify-center items-center"
            >
              <label className="block mb-2">
                Adres {index + 1}:
                <input
                  type="text"
                  value={address}
                  onChange={(e) => handleAddressChange(index, e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>

              <label className="block mb-2">
                Hisse Miktarı:
                <input
                  type="text"
                  value={shares[index]}
                  onChange={(e) => handleShareChange(index, e.target.value)}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>

              {index === addresses.length - 1 && index > 0 && (
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-500 flex justify-end items-end p-1"
                >
                  <IoTrashBinSharp color="red" size="18px" />
                </button>
              )}
            </div>
          ))}

          {totalSharesError && (
            <p className="text-red-500">Toplam hisse miktarı 100 olmalıdır.</p>
          )}

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAddItem}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              +
            </button>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractModal;
