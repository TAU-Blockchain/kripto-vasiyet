import Navigation from "../components/Navigation";
import MainComponent from "../components/MainComponent";

function Main() {
  return (
    <div className="flex flex-col justify-center items-center bg-main-bg">
      <div className="w-10/12 ">
        <Navigation />
        <MainComponent />
      </div>
    </div>
  );
}

export default Main;
