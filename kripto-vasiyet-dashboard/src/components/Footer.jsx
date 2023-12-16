import footer1 from "../assets/footer1.png";
import footer2 from "../assets/footer2.png";
import footer3 from "../assets/footer3.svg";
import { TiMessages } from "react-icons/ti";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebook, FaInstagram, FaPhone, FaYoutube } from "react-icons/fa";
import { FaEarDeaf, FaXTwitter } from "react-icons/fa6";
function Footer() {
  return (
    <div className="bg-footer-bg px-8 py-12 md:px-40 flex flex-col justify-center items-center text-white">
      <div
        id="section1"
        className="flex flex-col md:flex-row justify-center items-start py-4"
      >
        <div
          id="section1.1"
          className="flex flex-row flex-wrap justify-start items-start w-3/4 gap-y-2 gap-x-4"
        >
          <div className="flex flex-col justify-center items-start">
            <a href="#" className="font-bold">
              e-Devlet Kapısı
            </a>
            <a href="#">English</a>
            <a href="#">Hakkımızda</a>
            <a href="#">Yasal Bildirim</a>
            <a href="#">KVKK Aydınlatma Yükümlülüğü</a>
            <a href="#">Gizlilik ve Kullanım</a>
            <a href="#">Politikalarımız</a>
            <a href="#">DETSİS</a>
            <a href="#">Kurumsal Kimlik</a>
          </div>
          <div className="flex flex-col justify-center items-start">
            <a href="#" className="font-bold">
              Bize Ulaşın
            </a>
            <a href="#">İletişim</a>
            <a href="#">CİMER Başvuru</a>
          </div>
          <div className="flex flex-col justify-center items-start">
            <a href="#" className="font-bold">
              e-Hizmetler
            </a>
            <a href="#">Sık Kullanılan Hizmetler</a>
            <a href="#">Yeni Eklenen Hizmetler</a>
            <a href="#">Kurum Hizmetleri</a>
          </div>
          <div className="flex flex-col justify-center items-start">
            <a href="#" className="font-bold">
              Erişebilirlik
            </a>
            <a href="#">Salt Metin Sürümü</a>
            <a href="#">Daha Belirgin Odaklanma</a>
            <a href="#">Klavye Kısayolları</a>
            <a href="#">Site Haritası</a>
          </div>
          <div className="flex flex-col justify-center items-start">
            <a href="#" className="font-bold">
              Yardım
            </a>
            <a href="#">Genel Yardım</a>
            <a href="#">Sıkça Sorulanlar</a>
            <a href="#">Güvenliğiniz İçin</a>
            <a href="#">Help For Non-Citizens</a>
          </div>
        </div>
        <div
          id="section1.2"
          className="flex flex-col gap-y-4  justify-start items-start w-1/4 "
        >
          <div className="border border-white rounded-xl flex flex-col justify-start items-start  py-3 px-2 ">
            <div className="flex flex-row justify-start items-start gap-x-2">
              <img src={footer3} alt="Yardım Logosu" className="w-1/2"></img>
              <p>
                <span className="font-bold">Yardım mı lazım?</span> Aşağıdaki
                yöntemleri kullanarak bizimle iletişime geçebilirsiniz.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <p className="flex justify-start items-center py-2  border-b w-11/12 border-white gap-x-1">
                <TiMessages />
                Hızlı Çözüm Merkezi
              </p>
              <p className="flex justify-start items-center py-2  border-b w-11/12 border-white gap-x-1">
                <MdOutlineEmail />
                Bize Yazın
              </p>
              <p className="flex justify-start items-center py-2  border-b w-11/12 border-white gap-x-1">
                <FaPhone />
                e-Devlet Çağrı Merkezi
              </p>
              <p className="flex justify-start items-center py-2  border-b w-11/12 border-white gap-x-1">
                <FaEarDeaf />
                Engelsiz Çağrı Merkezi
              </p>
            </div>
          </div>
          <div className="flex flex-col  border border-white rounded-xl py-2 min-w-full">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row justify-center items-center mx-4 my-2 gap-x-2">
                <FaFacebook></FaFacebook>
                <p>Facebook</p>
              </div>
              <div className="flex flex-row justify-center items-center mx-4 my-2 gap-x-2">
                <FaXTwitter />
                <p>X(Twitter)</p>
              </div>
            </div>
            <hr></hr>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row justify-center items-center mx-4 my-2 gap-x-2">
                <FaYoutube />
                <p>Youtube</p>
              </div>
              <div className="flex flex-row justify-center items-center mx-4 my-2 gap-x-2">
                <FaInstagram />
                <p>Instagram</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="section2"
        className="flex flex-col md:flex-row justify-center items-center border-y border-white  py-4"
      >
        <div className="flex flex-row justify-center items-center">
          <div>
            <img src={footer1} alt="DDO Logo"></img>
          </div>
          <div>
            <img src={footer2} alt="Turksat Logo"></img>
          </div>
        </div>
        <div>
          <p className="text-white text-sm font-thin">
            Türksat A.Ş. e-Devlet Kapısı’nın kurulması ve yönetilmesi görevi
            <span>T.C. Cumhurbaşkanlığı Dijital Dönüşüm Ofisi Başkanlığı</span>
            tarafından yürütülmekte olup, sistemin geliştirilmesi ve işletilmesi
            <span>Türksat A.Ş.</span>
            tarafından yapılmaktadır.
          </p>
        </div>
      </div>
      <div
        id="section3"
        className="flex flex-col md:flex-row justify-center items-center py-4"
      >
        <p className="text-white text-sm font-thin">
          © 2023 Tüm Hakları Saklıdır. Gizlilik,Kullanım ve Telif Hakları
          bildiriminde belirtilen kurallar çerçevesinde hizmet sunulmaktadır.
        </p>
      </div>
    </div>
  );
}

export default Footer;
