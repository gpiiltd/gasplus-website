import {ArrowRight } from "lucide-react";
import LOGO from "../assets/images/logo.svg";
import { Button } from "./Button";
import { containerClass } from "../utils/constants";
import routeNames from "../routes/routes";
import { useNavigate } from "react-router-dom";


export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative w-full overflow-hidden bg-white">
      {/* Faint decorative squares */}
      <div className="pointer-events-none absolute left-6 top-8 h-10 w-10 bg-primary sm:left-10" />
      <div className="pointer-events-none absolute left-24 top-24 h-6 w-24 bg-primary-light sm:left-40" />
      <div className="pointer-events-none absolute left-4 top-40 h-10 w-10 bg-primary-light" />
      <div className="pointer-events-none absolute left-1/3 top-6 h-14 w-14 bg-primary-light" />
      <div className="pointer-events-none absolute left-1/2 top-40 h-4 w-24 -translate-x-1/2 bg-primary-light" />
      <div className="pointer-events-none absolute right-1/3 top-24 h-4 w-24 bg-primary-light" />

      {/* CTA */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-16 pt-32 text-center sm:pt-40">
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
      <div className={`${containerClass} relative z-10 mb-20`}>
  <div className="relative mx-auto flex flex-col gap-8 px-6 sm:flex-row sm:gap-24">
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

          <div className="text-sm text-gray-700 sm:pt-24">
    <p className="font-semibold text-gray-900">Contact:</p>
    <p className="mt-1">+234 813 428 8922</p>
   <a 
      href="mailto:hello@gasplus.ng"
      // className="text-blue-600 underline underline-offset-2"
    >
      hello@gasplus.ng
    </a>
  </div>
</div>

        {/* Bottom bar */}
        <div className="relative mx-auto mt-10 border-t border-gray-200 px-6 py-6">
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
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[170px] select-none overflow-hidden md:h-[230px]"
>
  <p className="absolute left-[-0.06em] top-0 whitespace-nowrap font-sora text-[9rem] font-extrabold leading-none tracking-[-0.04em] text-gray-100 sm:text-[12rem] md:text-[23vw]">
    GASPLUS
  </p>
</div>
    </footer>
  );
}
