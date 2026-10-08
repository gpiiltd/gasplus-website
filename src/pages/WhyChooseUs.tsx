import { useEffect, useRef } from "react";
import { containerClass } from "../utils/constants";
import { useInView } from "../components/animations/useInView";
import WCU1 from "../assets/images/woman.png";
import WCU2 from "../assets/images/city.png";
import WCU3 from "../assets/images/men.png";
import WCU4 from "../assets/images/frame.png";

import { Heading, Paragraph } from "../components/Typography";

interface Feature {
  title: string;
  description: string;
  image: string;
}

const FEATURES: Feature[] = [
  {
    title: "Technical and engineering capability",
    description:
      "Our engineering team brings hands-on expertise in gas power systems, industrial generators, and energy infrastructure. We apply industry best practices and advanced diagnostics to every project.",
    image: WCU1,
  },
  {
    title: "Reliable energy delivery",
    description:
      "Our operations are designed for uninterrupted power and gas delivery. Dependable infrastructure, structured maintenance programs, and rapid response support keep your facility running without costly downtime.",
    image: WCU2,
  },
  {
    title: "Safety and compliance",
    description:
      "Safety is built into every operation. We follow strict health, safety, environmental, and regulatory compliance procedures across all service areas, protecting your people, your assets, and your business.",
    image: WCU3,
  },
  {
    title: "Solutions tailored to your operations",
    description:
      "No two facilities have the same energy requirements. We assess your operational needs and deliver customized power and gas solutions backed by long-term technical support and partnership.",
    image: WCU4,
  },
];

const featureGrid =
  "grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-[480px_minmax(0,1fr)_480px]";

// Tune this: 0.6 = image travels 60% of the frame height during the pass
const IMAGE_PARALLAX = 0.25;
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const textOnRight = index % 2 === 1;
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    if (!card || !image) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const viewportHeight = document.documentElement.clientHeight;
      const cardRect = card.getBoundingClientRect();
      const imageRect = image.parentElement!.getBoundingClientRect();
      const headerHeight =
        Number.parseFloat(
          getComputedStyle(card).getPropertyValue("--why-header-height"),
        ) || 0;
      const visibleTop = 60 + headerHeight;

      // 0 when the frame's top touches the bottom of the viewport,
      // 1 when its bottom reaches the top of the visible area.
      const cropProgress = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight - imageRect.top) /
            Math.max(viewportHeight + imageRect.height - visibleTop, 1),
        ),
      );

      // Image is taller than its frame by IMAGE_PARALLAX × frame height.
      // It starts shifted up (showing its lower part) and slides down to 0
      // (showing its top), so it moves slower than the page.
      const crop = reduceMotion ? 0 : imageRect.height * IMAGE_PARALLAX;
      image.style.transform = `translate3d(0, ${-crop * (1 - cropProgress)}px, 0)`;

      // --- text logic unchanged ---
      const textDistance = Math.max(
        1,
        Math.min(cardRect.height * 0.6, viewportHeight * 0.4),
      );
      const textEnter = Math.max(
        0,
        Math.min(1, (viewportHeight * 0.95 - cardRect.top) / textDistance),
      );
      const textExit = Math.max(
        0,
        Math.min(
          1,
          (visibleTop + textDistance - cardRect.bottom) / textDistance,
        ),
      );
      card.style.setProperty(
        "--text-opacity",
        String(textEnter * (1 - textExit)),
      );
      const entryDirection = index === 0 ? -1 : 1;
      card.style.setProperty(
        "--text-offset",
        `${(entryDirection * (1 - textEnter) - textExit) * 100}%`,
      );
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(card);
    observer.observe(image);
    image.addEventListener("load", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      observer.disconnect();
      image.removeEventListener("load", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative isolate overflow-hidden border-b border-[#B2B2B2]"
    >
      <div className={`${containerClass} ${featureGrid} lg:min-h-[480px]`}>
        <div
          className={`min-w-0 flex items-center overflow-hidden py-6 lg:py-0 lg:row-start-1 ${
            textOnRight ? "lg:col-start-3 lg:pl-8" : "lg:col-start-1 lg:pr-8"
          }`}
        >
          <div
            className="motion-reduce:!transform-none motion-reduce:!opacity-100"
            style={{
              transform: "translateY(var(--text-offset, 100%))",
              opacity: "var(--text-opacity, 0)",
            }}
          >
            <Heading
              level={3}
              className="!text-xl font-extrabold leading-snug !text-[#45712B] sm:!text-2xl lg:!text-3xl"
            >
              {feature.title}
            </Heading>
            <Paragraph className="mt-4 !text-gray-700">
              {feature.description}
            </Paragraph>
          </div>
        </div>
        <div className="relative h-72 overflow-hidden sm:h-80 lg:col-start-2 lg:row-start-1 lg:h-auto lg:min-h-[480px]">
          <img
            ref={imageRef}
            src={feature.image}
            alt={feature.title}
            loading="lazy"
            decoding="async"
            // 160% = 100% + IMAGE_PARALLAX (keep these two in sync)
            className="absolute inset-x-0 top-0 block h-[125%] w-full object-cover object-center will-change-transform motion-reduce:h-full motion-reduce:!transform-none"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureRows() {
  return (
    <div>
      {FEATURES.map((feature, index) => (
        <FeatureCard key={feature.title} feature={feature} index={index} />
      ))}
    </div>
  );
}

export default function WhyChooseUs() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
  });
  const stickyHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = stickyHeaderRef.current;
    const section = header?.parentElement;
    if (!header || !section) return;
    const measure = () => {
      section.style.setProperty(
        "--why-header-height",
        `${header.offsetHeight}px`,
      );
    };
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    measure();
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative border-t-2 border-[#45712B]/30 bg-[#e9f3e2]">
      <div
        ref={stickyHeaderRef}
        className="sticky top-[60px] z-20 bg-[#e9f3e2]"
      >
        <div className={containerClass}>
          <div
            ref={headerRef}
            className={`py-6 lg:py-8 transition-[opacity,transform] duration-700 ease-out motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:transition-none ${
              headerInView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <Heading
              level={2}
              className="!text-2xl font-extrabold !text-[#45712B] sm:!text-3xl lg:!text-4xl"
            >
              Why industries choose Gasplus
            </Heading>
            <Paragraph className="mt-4 max-w-xl !text-gray-700">
              We combine technical depth with responsive service to deliver
              energy infrastructure that performs when it matters most.
            </Paragraph>
          </div>
        </div>
      </div>
      <FeatureRows />
    </section>
  );
}
