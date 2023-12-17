import { AiFillCloseSquare } from "react-icons/ai";

function PendingModal({ handleClose }) {
  return (
    <div className="bg-black p-6 rounded-md w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-white font-bold">İşlem Bekleniyor</h2>
        <AiFillCloseSquare
          className="cursor-pointer text-red-500"
          onClick={handleClose}
          size={30}
        />
      </div>

      <p className="text-white text-lg">
        İşlem tamamlandıktan sonra sayfaya geri dönebilirsiniz.
      </p>
    </div>
  );
}

export default PendingModal;
