import { useEffect, useState } from "react";
import HERO_IMG from "../../assets/images/gasplus-bg.png";
import LNG_SHIP_IMG from "../../assets/images/gasplus-image-4.jpg";
import PIPELINE_IMG from "../../assets/images/gasplus-lng.jpeg";
import LNG_TANKS_IMG from "../../assets/images/lng-landing (1).jpeg";
import STORAGE_IMG from "../../assets/images/lng-3.jpeg";
import { Button } from "../../components/Button";
import { Heading, Paragraph } from "../../components/Typography";
import TrustSection from "./TrustSection";
import { containerClass } from "../../utils/constants";
import routeNames from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "../../components/animations/Animations";

const HERO_SLIDES = [
  HERO_IMG,
  LNG_SHIP_IMG,
  PIPELINE_IMG,
  LNG_TANKS_IMG,
  STORAGE_IMG,
];

const FEATURES = [
  { label: "Independent Power Producer (IPP)", target: "service-ipp" },
  { label: "Compressed Natural Gas (CNG)", target: "service-cng" },
  { label: "Domestic Liquified Natural Gas (DLNG)", target: "service-lng" },
  {
    label: "Industrial Gas Generator Maintenance",
    target: "service-maintenance",
  },
];

export default function Hero() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % HERO_SLIDES.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <>
      <section
        aria-label="GasPlus energy solutions"
        aria-roledescription="carousel"
        className="relative overflow-hidden bg-gray-950"
      >
        <div className="absolute inset-0">
          {HERO_SLIDES.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-/20 to-gray-/10" />
        </div>

        {/* Content */}
        <div className={`relative z-10 ${containerClass} py-20 lg:py-28`}>
          <div className="max-w-2xl lg:pl-10">
            <FadeIn direction="up" delay={100} threshold={0}>
              <Heading
                level={1}
                className="!text-4xl !font-serif leading-[1.1] !text-white sm:!text-5xl"
              >
                Dependable power and gas solutions for your operations
              </Heading>
            </FadeIn>

            <FadeIn direction="up" delay={250} threshold={0}>
              <Paragraph className="mt-5 max-w-md !text-base text-white sm:!text-[15px]">
                GasPlus is committed to delivering high-quality, sustainable and
                advanced energy solutions, with extensive experience in gas
                power generation and maintenance.
              </Paragraph>
            </FadeIn>
            {/* Feature cards */}
            {/* <FadeIn direction="up" delay={400} threshold={0}>
  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
    {FEATURES.map((feature) => (
      <button
        type="button"
        key={feature.target}
        onClick={() => {
          document.getElementById(feature.target)?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
            block: "start",
          });
        }}
        className="animated-border group flex cursor-pointer items-center rounded-xl bg-black/40 px-6 py-5 text-left backdrop-blur-sm transition-colors duration-300 hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7ab342]"
      >
        <span className="text-base font-normal text-white transition-colors duration-300 group-hover:text-[#7ab342]">
          {feature.label}
        </span>
      </button>
    ))}
  </div>
</FadeIn> */}

            <FadeIn direction="up" delay={550} threshold={0}>
              <div className="mt-8">
                <Button
                  onClick={() => navigate(`/${routeNames.contact}`)}
                  className="!px-8"
                >
                  Contact Us
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>

        <div
          aria-label="Choose a hero slide"
          className="relative z-10 mx-auto -mt-20 flex max-w-7xl justify-center gap-5 pb-6"
        >
          {HERO_SLIDES.map((image, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              aria-pressed={index === activeSlide}
              onClick={() => setActiveSlide(index)}
              className={`h-16 w-24 overflow-hidden rounded-md border-2 transition-all sm:h-20 sm:w-28 ${
                index === activeSlide
                  ? "border-white opacity-100"
                  : "border-white/40 opacity-70 hover:border-white/80 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>
      <TrustSection />
    </>
  );
}
