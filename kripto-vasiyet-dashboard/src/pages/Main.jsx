import Navigation from "../components/Navigation";
import MainComponent from "../components/MainComponent";
import MainAside from "../components/MainAside";
import MainSection from "../components/MainSection";

function Main() {
  return (
    <div className="flex flex-col justify-center items-center bg-main-bg">
      <div className="w-10/12 ">
        <Navigation />
        <MainComponent />
        <MainAside />
        <MainSection />
      </div>
    </div>
  );
}

export default Main;
