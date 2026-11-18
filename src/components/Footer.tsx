import LOGO from "../assets/images/logo.svg";
import { Button } from "./Button";
import { containerClass } from "../utils/constants";
import routeNames from "../routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { FadeIn } from "./animations/Animations";

export default function Footer({ hideCta = false }: { hideCta?: boolean }) {
  const navigate = useNavigate();

  return (
    <footer className="relative w-full overflow-hidden bg-white">
      {/* Faint decorative squares */}
      <FadeIn direction="up" delay={100} duration={800} className="pointer-events-none absolute left-24 top-16 h-6 w-24 bg-[#6B9B45]/3 sm:left-40">
        <div className="h-full w-full" />
      </FadeIn>
      <FadeIn direction="up" delay={150} duration={800} className="pointer-events-none absolute left-4 top-28 h-10 w-10 bg-[#6B9B45]/3">
        <div className="h-full w-full" />
      </FadeIn>
      <FadeIn direction="up" delay={200} duration={800} className="pointer-events-none absolute left-1/3 top-6 h-14 w-14 bg-[#6B9B45]/3">
        <div className="h-full w-full" />
      </FadeIn>
      <FadeIn direction="up" delay={250} duration={800} className="pointer-events-none absolute left-1/2 top-28 h-4 w-24 -translate-x-1/2 bg-[#6B9B45]/10">
        <div className="h-full w-full" />
      </FadeIn>
      <FadeIn direction="up" delay={300} duration={800} className="pointer-events-none absolute right-1/3 top-16 h-4 w-24 bg-[#6B9B45]/10">
        <div className="h-full w-full" />
      </FadeIn>

      {!hideCta && (
        <div className="relative z-10 site-container !px-6 pb-0 pt-8 text-center sm:!px-10 sm:pb-0 sm:pt-10 lg:!px-12">
          <FadeIn direction="up" delay={100}>
            <h2 className="mx-auto max-w-5xl !text-4xl font-extrabold leading-tight text-gray-900 sm:text-[45px]">
              Ready to secure a reliable
              <br className="hidden sm:block" /> power supply for your operations?
            </h2>
          </FadeIn>

          <FadeIn direction="up" delay={250}>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Talk to our team about your power and gas requirements. We will assess
              your needs and propose the right solution for your facility.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={400}>
            <div className="mt-5 flex justify-center gap-4">
              <Button
                onClick={() => navigate(`/${routeNames.contact}`)}
                className="px-7"
              >
                Contact Us
              </Button>
            </div>
          </FadeIn>
        </div>
      )}

      {/* Info row */}
      <div className={`${containerClass} !px-6 relative z-10 mb-0 pb-4 pt-8 sm:!px-10 lg:!pl-20 lg:!pr-50`}>
        <div className="relative mx-auto flex flex-col gap-6 sm:flex-row sm:gap-16">
          <div>
            <a href="/" className="flex items-center gap-1">
              <img src={LOGO} alt="Gasplus Logo" width={56} height={56} className="h-14 w-14" />
            </a>

            <div className="mt-2 w-full max-w-[320px] text-base text-gray-700">
              <p className="font-semibold text-gray-900">Address:</p>
              <p className="mt-1 underline underline-offset-2 text-base">
                Block 105, Ibukun House, No8, Baderinwa Alabi
                <br />
                Street, Lekki Phase 1, Lekki Lagos
              </p>
              <iframe
                title="GasPlus office location on Google Maps"
                src="https://maps.google.com/maps?q=Block%20105%2C%20Ibukun%20House%2C%20No8%2C%20Baderinwa%20Alabi%20Street%2C%20Lekki%20Phase%201%2C%20Lekki%20Lagos&output=embed"
                className="mt-3 h-24 w-full rounded-md border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="text-base text-gray-700 sm:pt-10">
            <p className="font-semibold text-gray-900">Contact:</p>
            <a
              href="tel:+2348134288922"
              className="mt-1 block w-fit underline underline-offset-2 text-base"
            >
              +234 813 428 8922
            </a>
            <div className="flex flex-col items-start gap-2">
              <a href="mailto:info@gasplus.ng" className="underline underline-offset-2 text-base">
                info@gasplus.ng
              </a>
              <a
                href="https://www.linkedin.com/company/gasplus-synergy-limited-gsl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GasPlus Synergy Limited on LinkedIn (opens in a new tab)"
                className="inline-flex shrink-0 items-center rounded transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3B82F6]"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 shrink-0">
                  <rect width="24" height="24" rx="4" fill="#3B82F6" />
                  <path
                    fill="#fff"
                    d="M7.1 9.6h2.3V17H7.1V9.6Zm1.15-3.7a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66ZM10.9 9.6h2.2v1c.3-.58 1.05-1.2 2.17-1.2 2.32 0 2.75 1.52 2.75 3.5V17h-2.3v-3.7c0-.88-.02-2.02-1.23-2.02-1.23 0-1.42.96-1.42 1.95V17h-2.3V9.6h.13Z"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="text-base text-gray-700 sm:ml-10 lg:ml-32 sm:pt-10">
            <p className="font-semibold text-gray-900">Company</p>
            <ul className="mt-1 flex flex-col items-start gap-2">
              <li>
                <Link
                  to={`/${routeNames.about}#team`}
                  className="underline underline-offset-2 hover:text-green-700 text-base"
                >
                  GasPlus Executives
                </Link>
              </li>
              <li>
                <Link
                  to={`/${routeNames.about}#energy-solutions`}
                  className="underline underline-offset-2 hover:text-green-700 text-base"
                >
                  GasPlus Energy Solution
                </Link>
              </li>
          
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative mx-auto mt-6 border-t border-gray-200 py-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500 text-[12px]">
              2026 Gasplus. All right reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-700">
              <Link to={`/${routeNames.privacy_policy}`} className="underline underline-offset-2 text-[12px]">
                Privacy Policy
              </Link>
              <Link to={`/${routeNames.terms_of_use}`} className="underline underline-offset-2 text-[12px]">
                Terms of Service
              </Link>
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
