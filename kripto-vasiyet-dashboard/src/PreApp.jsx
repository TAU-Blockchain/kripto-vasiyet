import Header from "./components/Header";
import Footer from "./components/Footer";
import ScroolButton from "./components/ScrollButton";
import Main from "./pages/Main";

function PreApp() {
  return (
    <div>
      <Header />
      <Main className="text-3xl font-bold underline min-h-screen bg-black">
        Hello world!
      </Main>
      <ScroolButton />
      <Footer />
    </div>
  );
}

export default PreApp;
