import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

function Navigation() {
  return (
    <div className="flex flex-row justify-start items-center  bg-white p-1 rounded w-full">
      <div>
        <a href="#">
          <IoHomeOutline className="text-ed-blue" />
        </a>
      </div>
      <IoIosArrowForward className="text-ed-blue" />
      <div>
        <a href="#" className="text-ed-blue">
          Türkiye Noterler Birliği
        </a>
      </div>
      <IoIosArrowForward className="text-ed-blue" />
      <div>
        <h6>Veraset İlamı Sorgulama</h6>
      </div>
    </div>
  );
}

export default Navigation;
