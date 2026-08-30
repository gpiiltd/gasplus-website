import {ArrowRight } from "lucide-react";
import LOGO from "../assets/images/logo.svg";
import { Button } from "./Button";
import { containerClass } from "../utils/constants";
import routeNames from "../routes/routes";
import { useNavigate } from "react-router-dom";


// const footerLinks = {
//   PRODUCT: [
//     { label: "Admin", href: "#" },
//     { label: "Passenger", href: "#" },
//   ],
//   COMPANY: [
//     { label: "Careers", href: "#" },
//     { label: "Press", href: "#" },
//     { label: "About Us", href: "#" },
//   ],
//   RESOURCES: [
//     { label: "Privacy Policy", href: "/privacy-policy" },     
//   { label: "Terms of Use", href: "/terms-of-service" }, 
//   ],
// };

// const SocialIcon: React.FC<{
//   icon: "facebook" | "instagram" | "twitter" | "linkedin";
// }> = ({ icon }) => {
//   const paths: Record<string, React.ReactNode> = {
//     facebook: (
//       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//     ),
//     instagram: (
//       <>
//         <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
//         <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//         <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
//       </>
//     ),
//     twitter: (
//       <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
//     ),
//     linkedin: (
//       <>
//         <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
//         <rect x="2" y="9" width="4" height="12" />
//         <circle cx="4" cy="4" r="2" />
//       </>
//     ),
//   };

//   return (
//     <svg
//       width="18"
//       height="18"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       {paths[icon]}
//     </svg>
//   );
// };


export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative w-full overflow-hidden bg-white">
      {/* Diagonal black cutout, top right */}
      {/* <div
        className="pointer-events-none absolute right-0 top-0 h-24 w-full bg-gray-950 sm:h-28"
        style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 55% 100%)" }}
      /> */}

      {/* Faint decorative squares */}
      <div className="pointer-events-none absolute left-6 top-8 h-10 w-10 bg-primary sm:left-10" />
      <div className="pointer-events-none absolute left-24 top-24 h-6 w-24 bg-primary-light sm:left-40" />
      <div className="pointer-events-none absolute left-4 top-40 h-10 w-10 bg-primary-light" />
      <div className="pointer-events-none absolute left-1/3 top-6 h-14 w-14 bg-primary-light" />
      <div className="pointer-events-none absolute left-1/2 top-40 h-4 w-24 -translate-x-1/2 bg-primary-light" />
      <div className="pointer-events-none absolute right-1/3 top-24 h-4 w-24 bg-primary-light" />

      {/* CTA */}
      <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-32 text-center sm:pt-40">
        <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
          Ready to secure a reliable power supply for your operations?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-600">
          Talk to our team about your power and gas requirements. We will assess
          your needs and propose the right solution for your facility.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button
            onClick={() => navigate(`/${routeNames.contact}`)}
            icon={<ArrowRight size={18} />}
          >
            Contact Us
          </Button>
        </div>
      </div>

      {/* Info row */}
      <div className={`${containerClass}`}>
        <div
          className={`relative mx-auto flex  flex-col gap-8 px-6 sm:flex-row sm:justify-between`}
        >
          <div>
            <a href="/" className="flex items-center gap-1">
              <img src={LOGO} alt="Gasplus Logo" />
            </a>

            <div className="mt-4 text-sm text-gray-700">
              <p className="font-semibold text-gray-900">Address:</p>
              <p className="mt-1 underline underline-offset-2">
                Block 105, Ibukun House, No8, Baderinwa
                <br />
                Alabi Street, Lekki Phase 1, Lekki Lagos
              </p>
            </div>
          </div>

          <div className="text-sm text-gray-700">
            <p className="font-semibold text-gray-900">Contact:</p>
            <p className="mt-1">+234 813 428 8922</p>
            <p>hello@gasplus.ng</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative mx-auto mt-10  border-t border-gray-200 px-6 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              2022 Gasplus. All right reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-700">
              <a href="/privacy" className="underline underline-offset-2">
                Privacy Policy
              </a>
              <a href="/terms" className="underline underline-offset-2">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Watermark */}
      <div className="pointer-events-none relative -mt-6 select-none overflow-hidden">
        <p className="whitespace-nowrap text-center text-[9rem] font-extrabold leading-none text-gray-100 sm:text-[12rem] md:text-[15rem]">
          GASPLUS
        </p>
      </div>
    </footer>
  );
}
