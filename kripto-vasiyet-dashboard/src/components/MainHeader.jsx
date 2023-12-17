import mainheader1 from "../assets/mainheader1.png";
import { FaShareNodes } from "react-icons/fa6";
import { MdOutlineFavoriteBorder } from "react-icons/md";
function MainHeader() {
  return (
    <div className="flex flex-row justify-between items-center mt-5">
      <div className="w-full">
        <div className="flex flex-row justify-between items-center bg-white px-10 rounded-md border py-2">
          <div className="flex flex-row justify-center items-center">
            <div className="flex justify-center items-center">
              <img src={mainheader1} alt="Logo" />
            </div>
            <div className="flex flex-col gap-y-1 ps-2">
              <a href="">
                <h3 className="text-ed-blue">Türkiye Noterler Birliği</h3>
              </a>
              <h3>Kripto Vasiyet Oluşturma</h3>
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            <div className="flex flex-row justify-center items-center gap-x-1 shadow-md border-[0.1px] p-1 rounded">
              <MdOutlineFavoriteBorder className="text-gray-400" />
              <p className="text-gray-400">Favorilerime Ekle</p>
            </div>
            <div className="flex flex-row justify-center items-center gap-x-1 shadow-md border-[0.1px] p-1 rounded">
              <FaShareNodes className="text-gray-400" />
              <p className="text-gray-400">Paylaş</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
