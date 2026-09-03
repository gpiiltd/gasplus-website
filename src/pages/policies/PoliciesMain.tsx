import { useState, useEffect, useRef } from "react";
import PrivacyPolicy from "./PrivacyPolicy";
import TermOfUse from "./TermOfUse";
import { Heading, Text } from "../../components/Typography";
import { useLocation, useNavigate } from "react-router-dom";

const TOC_ITEMS = [
  {
    id: "data-privacy-notice",
    route: "privacy-policy",
    label: "Data Privacy Notice",
  },
  { id: "terms-of-use", route: "terms-of-use", label: "Terms of Use" },
];

const PoliciesMain = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isScrollingRef = useRef(false);

  const getActiveSectionFromRoute = () => {
    const match = TOC_ITEMS.find((item) =>
      location.pathname.includes(item.route),
    );
    return match ? match.id : TOC_ITEMS[0].id;
  };

  const [activeSection, setActiveSection] = useState(getActiveSectionFromRoute);

  useEffect(() => {
    const active = getActiveSectionFromRoute();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveSection(active);
    isScrollingRef.current = true;

    // Wait for DOM to fully paint before scrolling
    const scrollTimeout = setTimeout(() => {
      const el = document.getElementById(active);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }

      // Release lock after smooth scroll completes
      const lockTimeout = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);

      return () => clearTimeout(lockTimeout);
    }, 100); // small delay lets the DOM settle

    return () => clearTimeout(scrollTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollY = window.scrollY + 120;
      for (const item of [...TOC_ITEMS].reverse()) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollY) {
          if (activeSection !== item.id) {
            setActiveSection(item.id);
            navigate(`/${item.route}`, { replace: true });
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, navigate]);

  const scrollToSection = (item: (typeof TOC_ITEMS)[0]) => {
    navigate(`/${item.route}`, { replace: true });
    setActiveSection(item.id);
    isScrollingRef.current = true;

    const el = document.getElementById(item.id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white">
     
      <div className="bg-[#f5f4ef] px-6 py-10 md:px-16 lg:px-24 mb-10">
        <Heading level={2} className="mb-2 pt-24">
          Legal Terms & Policies
        </Heading>
        <Text variant="muted" size="sm" className="uppercase tracking-widest">
          Updated March 04, 2026
        </Text>
      </div>
      {/* Main Content */}
      <div
        className={`flex flex-col lg:flex-row gap-16 pb-24`}
      >
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Policy Content */}
          <div className="flex-1 min-w-0">
            <PrivacyPolicy />
            <TermOfUse />
          </div>

          {/* Sticky Table of Contents */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="sticky top-24">
              <Text
                variant="strong"
                size="sm"
                className="uppercase tracking-widest mb-4 block"
              >
                Table of Contents
              </Text>
              <nav className="flex flex-col gap-2">
                {TOC_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item)}
                    className={`text-left text-sm font-secondary tracking-wide transition-colors duration-200 cursor-pointer ${
                      activeSection === item.id
                        ? "text-[#176A3B] font-semibold"
                        : "text-text-secondary hover:text-primary-700"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PoliciesMain;
