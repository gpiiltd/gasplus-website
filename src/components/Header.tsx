import LOGO from "../assets/images/logo.svg";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { containerClass } from "../utils/constants";
import routeNames from "../routes/routes";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: routeNames.about },
  { label: "Our Teams", href: "https://ceslintlgroup.com/about-us/board/" },
  { label: "Contact Us", href: routeNames.contact },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuHasPlayed, setMenuHasPlayed] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
    setMenuHasPlayed(true);
  };
  const { pathname } = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";

    const routePath = href.startsWith("/") ? href : `/${href}`;
    return pathname === routePath || pathname.startsWith(`${routePath}/`);
  };

  return (
   <header className="fixed inset-x-0 top-0 z-50 w-full bg-white z-40">
  <nav className={`${containerClass} flex h-[60px] items-center justify-between`}>
    {/* Logo */}
    <Link to="/" className="flex items-center">
      <img src={LOGO} alt="Gasplus Logo" width="90" height="18" />
    </Link>

    {/* Desktop links */}
    <ul className="hidden items-center text-sm font-medium md:flex">
      {NAV_LINKS.map((link, i) => (
        <li key={link.href} className="flex items-center">
          <Link
            to={link.href}
            className={`px-5 transition-colors duration-200 ${
              isActive(link.href)
                ? "text-green-600"
                : "text-gray-800 hover:text-green-600"
            }`}
          >
            {link.label}
          </Link>

          {i < NAV_LINKS.length - 1 && (
            <span className="h-5 w-px bg-gray-300" />
          )}
        </li>
      ))}
    </ul>

    {/* Mobile hamburger toggle */}
    <button
      type="button"
      onClick={() => isOpen ? closeMenu() : setIsOpen(true)}
      className="inline-flex items-center justify-center rounded-md p-1.5 text-gray-800 hover:text-green-600 md:hidden"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
    </button>
  </nav>

  {/* Mobile menu panel */}
  {isOpen && (
    <ul
      id="mobile-menu"
      className="flex flex-col border-t border-gray-200 bg-white site-container py-2 text-sm font-medium md:hidden"
    >
      {NAV_LINKS.map((link, i) => (
        <li
          key={link.href}
          className={menuHasPlayed ? "opacity-100" : "animate-slide-in-left opacity-0"}
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <Link
            to={link.href}
            onClick={closeMenu}
            className={`block py-2.5 transition-colors duration-200 ${
              isActive(link.href)
                ? "text-green-600"
                : "text-gray-800 hover:text-green-600"
            }`}
          >
            {link.label}
          </Link>
          {i < NAV_LINKS.length - 1 && (
            <span className="block h-px w-full bg-gray-200" />
          )}
        </li>
      ))}
    </ul>
  )}
</header>
  );
}