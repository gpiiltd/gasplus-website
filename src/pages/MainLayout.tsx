import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Header";


const MainLayout = () => {
  return (
    <>
      {/* <SmoothScroll />
      <ScrollProgressBar /> */}
      <div className="relative">
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
