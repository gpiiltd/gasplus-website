import visionImg from "../assets/images/Image.png";
import gasplusBg from "../assets/images/gasplus-lng.jpeg";
import { Heading, Paragraph } from "../components/Typography";
import Badge from "./about/Badge";
import MissionSection from "./about/Vission";
import Principles from "./about/Principles";
import WhatWeDo from "./about/WhatWeDo";
import Executives from "./about/Executives";
import { FadeIn } from "../components/animations/Animations";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAVBAR_HEIGHT = 60;

// Eases in and out, and re-measures the target each frame
// so layout shifts (lazy images, fade-ins) don't break the scroll.
function smoothScrollToId(id: string, duration = 900) {
  const el = document.getElementById(id);
  if (!el) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const getTarget = () =>
    el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;

  if (prefersReducedMotion) {
    window.scrollTo({ top: getTarget(), behavior: "instant" });
    return;
  }

  const start = window.scrollY;
  const startTime = performance.now();
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic

  const step = (now: number) => {
    const t = Math.min((now - startTime) / duration, 1);
    const top = start + (getTarget() - start) * ease(t);
    window.scrollTo({ top, behavior: "instant" });
    if (t < 1) frame = requestAnimationFrame(step);
  };
  let frame = requestAnimationFrame(step);
  return () => cancelAnimationFrame(frame);
}
export default function About() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    // Start after navigation and the browser's native hash positioning settle.
    // Two animation frames allow the top of About to paint without a timed pause.
    let cancelScroll: (() => void) | undefined;
    let frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      frame = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        cancelScroll = smoothScrollToId(hash.slice(1), 1200);
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelScroll?.();
    };
  }, [hash, key]);
  return (
    <div className="bg-slate-100">
      <section className="about-hero" aria-label="About GasPlus">
        <h1
          className="about-hero__title"
          style={{ backgroundImage: `url("${gasplusBg}")` }}
        >
          GASPLUS
        </h1>
      </section>
      <section className="flex flex-col lg:mx-10">
        <div className="site-container flex flex-col gap-5 py-16 sm:py-24">
          <FadeIn direction="up" delay={100}>
            <Badge>Our Mission</Badge>
          </FadeIn>

          <div className="flex flex-col md:flex-row md:items-start md:gap-12 mx-auto gap-5">
            <FadeIn direction="up" delay={250} className="md:flex-1">
              <Heading level={3} className="!text-black font-extrabold leading-wide">
                We exist to provide gas and power solutions to the businesses
                that power the African continent
              </Heading>
            </FadeIn>

            <FadeIn direction="up" delay={400} className="md:flex-1">
              <Paragraph className="max-w-lg !text-[17px] !text-[#333333]">
                To deliver innovative, efficient, and
                sustainable energy solutions that empower industries, drive
                productivity, and create long-term value for our clients and
                stakeholders.
              </Paragraph>
            </FadeIn>
          </div>
        </div>

        <FadeIn direction="left" delay={200} className="h-72 w-full sm:h-[30rem]">
          <div className="h-full lg:w-[calc(100%-4rem)] -mt-15 mx-auto">
            <img
              src={visionImg}
              alt="Power plant cooling towers at sunset"
              className="h-[90%] w-full object-cover lg:rounded-lg"
            />
          </div>
        </FadeIn>
      </section>
      <WhatWeDo />
      <MissionSection />
      <Principles />
      <Executives />
    </div>
  );
}
