import { useEffect, useRef } from "react";
import { containerClass } from "../utils/constants";
import { useInView } from "../components/animations/useInView";
import WCU1 from "../assets/images/gasplus-image-5.jpg";
import WCU2 from "../assets/images/lng-3.jpeg";
import WCU3 from "../assets/images/gasplus-image-8.jpg";
import WCU4 from "../assets/images/gasplus-image-3.jpg";

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
    title: "Solutions tailored to your operations",
    description:
      "No two facilities have the same energy requirements. We assess your operational needs and deliver customized power and gas solutions backed by long-term technical support and partnership.",
    image: WCU3,
  },
  {
    title: "Safety and compliance",
    description:
      "Safety is built into every operation. We follow strict health, safety, environmental, and regulatory compliance procedures across all service areas, protecting your people, your assets, and your business.",
    image: WCU4,
  },
];

const IMAGE_PARALLAX = 0;
function FeatureCard({ feature }: { feature: Feature }) {
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
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative isolate min-w-0 flex-1 overflow-hidden rounded-xl md:w-[44%] md:flex-none"
    >
      <div className="relative min-h-[420px] sm:min-h-[400px] lg:min-h-[420px] ">
        <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex lg:h-[37%] min-w-0 items-center bg-white p-4 shadow-lg sm:p-6">
          <div>
            <Heading
              level={3}
              className="leading-snug !text-[#3f761f] sm:!text-[10px] lg:!text-[20px]"
            >
              {feature.title}
            </Heading>
            <Paragraph className="mt-2 !text-[15px] !text-gray-700">
              {feature.description}
            </Paragraph>
          </div>
        </div>
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <img
            ref={imageRef}
            src={feature.image}
            alt={feature.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 block sm:[400px] lg:h-[390px] w-full object-contain object-center will-change-transform motion-reduce:!transform-none"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureRows() {
  return (
    <div className={`${containerClass} space-y-12 pb-12 lg:pb-16`}>
      {[FEATURES.slice(0, 2), FEATURES.slice(2)].map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-col gap-8 md:flex-row md:justify-center md:gap-14 lg:gap-30 lg:px-20"
        >
          {row.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
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
    <section className="relative border-t-2 border-[#45712B]/30 bg-[#dfffe1]">
      <div ref={stickyHeaderRef} className="bg-[#dfffe1]">
        <div className={containerClass}>
          <div
            ref={headerRef}
            className={`py-6 lg:py-8 lg:px-20 transition-[opacity,transform] duration-700 ease-out motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:transition-none ${
              headerInView
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0"
            }`}
          >
            <Heading
              level={2}
              className="!text-2xl font-extrabold !text-[#3f761f] sm:!text-3xl lg:!text-4xl"
            >
              Why Industries Choose Gasplus
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
