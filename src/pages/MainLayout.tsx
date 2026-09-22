import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Header";


const MainLayout = () => {
  const { key, hash } = useLocation();

  useLayoutEffect(() => {
    // Reset before paint, even when navigating to the current route again.
    // Explicit instant scrolling overrides the site's smooth-scroll CSS.
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [key, hash]);

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
