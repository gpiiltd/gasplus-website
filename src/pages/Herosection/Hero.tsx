import { ArrowRight, Check } from "lucide-react";
import HERO_IMG from "../../assets/images/hero.png";
import { Button } from "../../components/Button";
import { Heading, Paragraph } from "../../components/Typography";
import TrustSection from "./TrustSection";
import { containerClass } from "../../utils/constants";
import routeNames from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "../../components/animations/Animations";

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
        <div className={`relative ${containerClass} py-20 lg:py-28`}>
          <div className="max-w-2xl">
            <FadeIn direction="up" delay={100} threshold={0}>
              <Heading
                level={1}
                className="!text-4xl font-extrabold leading-[1.1] !text-white sm:!text-5xl"
              >
                Dependable power and gas solutions for your operations
              </Heading>
            </FadeIn>

            <FadeIn direction="up" delay={250} threshold={0}>
              <Paragraph className="mt-5 max-w-md !text-base !text-gray-200 sm:!text-lg">
                GasPlus is committed to delivering high-quality, sustainable and
                advanced energy solutions, with extensive experience in gas power
                generation and maintenance.
              </Paragraph>
            </FadeIn>
{/* Feature cards */}
<FadeIn direction="up" delay={400} threshold={0}>
  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
    {FEATURES.map((feature) => (
      <div
        key={feature}
        className="animated-border group flex items-center rounded-xl bg-black/40 px-6 py-5 backdrop-blur-sm transition-colors duration-300 hover:bg-neutral-900"
      >
        <span className="text-base font-normal text-white transition-colors duration-300 group-hover:text-[#7ab342]">
          {feature}
        </span>
      </div>
    ))}
  </div>
</FadeIn>

            <FadeIn direction="up" delay={550} threshold={0}>
              <div className="mt-8">
                <Button
                  onClick={() => navigate(`/${routeNames.contact}`)}
                  icon={<ArrowRight size={18} />}
                >
                  Contact Us
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      <TrustSection />
    </>
  );
}
