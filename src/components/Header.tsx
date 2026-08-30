import LOGO from "../assets/images/logo.svg";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { containerClass } from "../utils/constants";
import routeNames from "../routes/routes";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About GasPlus", href: routeNames.about },
  { label: "Our Team", href: routeNames.about },
  { label: "Contact Us", href: routeNames.contact },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-800">
      <nav
        className={`${containerClass}  flex  items-center justify-between  py-1.5 sm:px-10 `}
      >
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src={LOGO} alt="Gasplus Logo" width="90" height="18" />
        </a>
        {/* Desktop links */}
        <ul className="hidden items-center text-sm font-medium md:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="flex items-center">
              <a
                href={link.href}
                className={`px-5 transition-colors duration-200 ${
                  i === 0
                    ? "text-green-600"
                    : "text-gray-800 hover:text-green-600"
                }`}
              >
                {link.label}
              </a>

              {/* Vertical divider */}
              {i < NAV_LINKS.length - 1 && (
                <span className="h-5 w-px bg-gray-300" />
              )}
            </li>
          ))}
        </ul>
        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
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
          className="flex flex-col border-t border-gray-200 px-6 py-2 text-sm font-medium md:hidden"
        >
          {NAV_LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block py-2.5 transition-colors duration-200 ${
                  i === 0
                    ? "text-green-600"
                    : "text-gray-800 hover:text-green-600"
                }`}
              >
                {link.label}
              </a>
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
