import { useState, useRef, useEffect } from "react";
import header1 from "../assets/header1.png";
import { TiMessages } from "react-icons/ti";
import { FaKey } from "react-icons/fa6";
import { MdArrowDropDown } from "react-icons/md";
import { CiSearch, CiLogin } from "react-icons/ci";
function Header() {
  const [isBarVisible, setIsBarVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsBarVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [containerRef]);
  return (
    <div className="bg-header-bg h-20 flex flex-row justify-around items-center text-white">
      <div className="h-full">
        <img src={header1} alt="e-Devlet Logo" style={{ height: 80 }} />
      </div>
      <div className="flex flex-row justify-center items-center gap-x-2">
        <div className="flex flex-row justify-center items-center border-[0.2px] border-white rounded p-1">
          <TiMessages className="text-white" />
          <p>Hızlı Çözüm</p>
        </div>
        <div className="flex flex-col justify-start items-start relative">
          <div
            className="flex flex-row justify-center items-center   border-[0.2px] border-white rounded p-2 hover:cursor-pointer"
            onClick={() => {
              setIsBarVisible(!isBarVisible);
            }}
          >
            <FaKey className="text-white" />
            <MdArrowDropDown className="text-white" />
          </div>
          {isBarVisible && (
            <div
              className="absolute top-8 left-0 bg-slate-100 text-ed-blue p-2"
              ref={containerRef}
            >
              <a href="#">Erişebilirlik Özellikleri</a>
              <a href="#">Salt Metin Görünümü</a>
              <a href="#">Daha Belirgim Odaklama</a>
            </div>
          )}
        </div>

        <div className="flex flex-row justify-center items-center p-2">
          <input
            type="text"
            className="rounded rounded-r-none p-1"
            placeholder="Size nasıl yardım edebilirim?"
          />
          <CiSearch className="w-full h-full bg-white text-ed-blue p-2 rounded-r" />
        </div>
        <div className="flex flex-row justify-center items-center bg-ed-gray p-2 rounded-lg">
          <p className="bg-ed-gray text-ed-blue">Giriş Yap</p>
          <CiLogin className="text-ed-blue font-bold text-2xl" />
        </div>
      </div>
    </div>
  );
}

export default Header;
