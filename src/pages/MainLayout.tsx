import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Header";
import routeNames from "../routes/routes";


const MainLayout = () => {
  const { key, hash, pathname } = useLocation();

  useLayoutEffect(() => {
    // Reset before paint, even when navigating to the current route again.
    // Explicit instant scrolling overrides the site's smooth-scroll CSS.
    // About handles its section links with an animated scroll from the top.
    const isAbout = pathname === `/${routeNames.about.replace(/^\//, "")}`;
    const target = hash && !isAbout ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [key, hash, pathname]);

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
