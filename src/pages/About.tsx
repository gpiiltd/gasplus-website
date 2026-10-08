
import visionImg from "../assets/images/Image.png";
import { Heading, Paragraph } from "../components/Typography";
import Badge from "./about/Badge";
import MissionSection from "./about/Vission";
import Principles from "./about/Principles";
import WhatWeDo from "./about/WhatWeDo";
import { FadeIn } from "../components/animations/Animations";

export default function About() {
  return (
    <div>
      <section className="pt-12 md:pt-0 grid grid-cols-1 bg-[#e9f3e2] sm:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 site-split-copy py-16 sm:py-24 pt-12 md:pt-24">
          <FadeIn direction="up" delay={100}>
            <Badge>Our Mission</Badge>
          </FadeIn>

          <FadeIn direction="up" delay={250}>
            <Heading level={3} className="!text-[#1A1A1A] leading-wide">
              We exist to provide gas and power solutions to the businesses that power the African continent
            </Heading>
          </FadeIn>

          <FadeIn direction="up" delay={400}>
            <Paragraph className="max-w-lg">
             We are on a mission to deliver innovative, efficient, and sustainable energy solutions that empower industries, drive productivity, and create long-term value for our clients and stakeholders.
            </Paragraph>
          </FadeIn>
        </div>

        <FadeIn direction="left" delay={200} className="h-72 sm:h-auto">
          <div className="h-full w-full">
            <img
              src={visionImg}
              alt="Power plant cooling towers at sunset"
              className="h-full w-full object-cover"
            />
          </div>
        </FadeIn>
      </section>
      <WhatWeDo />
      <MissionSection />
      <Principles />
    </div>
  );
}
