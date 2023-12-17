/* eslint-disable react/prop-types */
const ErrorModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20">
      <div className="bg-black bg-opacity-50 w-full h-full absolute"></div>
      <div className="bg-white p-6 rounded-md z-10 relative">
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">HATA!</h2>
        <p>Metamask Cüzdanı Bulunamadı!</p>
      </div>
    </div>
  );
};

export default ErrorModal;
