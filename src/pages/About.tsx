import visionImg from "../assets/images/Image.png";
import { Heading, Paragraph } from "../components/Typography";
import Badge from "./about/Badge";
import MissionSection from "./about/Vission";
import Principles from "./about/Principles";
import WhatWeDo from "./about/WhatWeDo";
import { FadeIn } from "../components/animations/Animations";
import ExecutivesSection from "../components/Teams";
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
    <div>
      <section className="pt-12 md:pt-0 grid grid-cols-1 bg-[#e9f3e2] sm:grid-cols-2">
        <div className="flex flex-col justify-center gap-6 site-split-copy py-16 sm:py-24 pt-12 md:pt-24">
          <FadeIn direction="up" delay={100}>
            <Badge>Our Mission</Badge>
          </FadeIn>

          <FadeIn direction="up" delay={250}>
            <Heading level={3} className="!text-[#1A1A1A] leading-wide">
              We exist to provide gas and power solutions to the businesses that
              power the African continent
            </Heading>
          </FadeIn>

          <FadeIn direction="up" delay={400}>
            <Paragraph className="max-w-lg">
              We are on a mission to deliver innovative, efficient, and
              sustainable energy solutions that empower industries, drive
              productivity, and create long-term value for our clients and
              stakeholders.
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
      <ExecutivesSection />
    </div>
  );
}


