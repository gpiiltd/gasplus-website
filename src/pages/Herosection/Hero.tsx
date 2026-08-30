import { ArrowRight, Check } from "lucide-react";
import HERO_IMG from "../../assets/images/hero.png";
import { Button } from "../../components/Button";
import TrustSection from "./TrustSection";
import { containerClass } from "../../utils/constants";
import routeNames from "../../routes/routes";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  "Independent Power Producer (IPP)",
  "Compressed Natural Gas (CNG)",
  "Domestic Liquified Natural Gas (DLNG)",
  "Industrial Gas Generator Maintenance",
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <section className="relative overflow-hidden bg-gray-950">
        {/* Background image + overlay */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="GasPlus field engineers on site"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
        </div>

        {/* Content */}
        <div className={`relative mx-auto ${containerClass} px-6 py-20 sm:px-10 lg:px-16 lg:py-28`}>
          <div className="max-w-xl">
            <h1 className="animate-hero-title text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
              Dependable power and gas solutions for your operations
            </h1>

            <p className="mt-5 max-w-md text-base text-gray-200 sm:text-lg">
              GasPlus is committed to delivering high-quality, sustainable and
              advanced energy solutions, with extensive experience in gas power
              generation and maintenance.
            </p>

            {/* Feature checklist card */}
            <div className="mt-8 grid grid-cols-1 divide-y divide-purple-900/10 overflow-hidden rounded-xl bg-[#DCCDDC] backdrop-blur-sm sm:grid-cols-2 sm:divide-x">
              {FEATURES.map((feature) => (
                <div key={feature} className="flex items-start gap-3 p-5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 ">
              
              <Button
                onClick={() => navigate(`/${routeNames.contact}`)}
                icon={<ArrowRight size={18} />}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
      <TrustSection />
    </>
  );
}
