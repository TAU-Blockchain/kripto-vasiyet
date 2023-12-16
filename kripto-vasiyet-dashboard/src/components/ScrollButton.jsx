// import { MdOutlineArrowUpIos } from "react-icons/md";
//!TODO bu ikonu duzelt bi de sayfanin alt yarisinda cikmasini sagla
const ScroolButton = () => {
  return (
    <div
      className="fixed bottom-10 right-10 text-3xl cursor-pointer color-white text-white"
      onClick={() => window.scrollTo(0, document.body.scrollHeight)}
    >
      {/* <MdOutlineArrowUpIos /> */}
    </div>
  );
};

export default ScroolButton;
