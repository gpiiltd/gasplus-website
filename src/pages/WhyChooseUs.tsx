import { useEffect, useRef, useState } from "react";
import { useInView } from "../components/animations/useInView";
import WCU1 from "../assets/images/wcu1.svg";
import WCU2 from "../assets/images/wcu2.png";
import WCU3 from "../assets/images/wcu3.png";
import WCU4 from "../assets/images/wcu4.png";

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

/** Keep one feature visible in a shared, compact sticky stage. */
function useActiveFeature(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame: number | null = null;
    let trackTop = 0;
    let stickyTop = 60;
    let step = 1;
    let currentIndex = -1;

    const updateActive = () => {
      frame = null;
      const distance = Math.max(0, window.scrollY + stickyTop - trackTop);
      const nextIndex = Math.min(count - 1, Math.floor(distance / step));
      if (nextIndex !== currentIndex) {
        currentIndex = nextIndex;
        setActiveIndex(nextIndex);
      }
      frame = null;
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(updateActive);
    };
    const measure = () => {
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      const rect = track.getBoundingClientRect();
      trackTop = rect.top + window.scrollY;
      const availableHeight = window.innerHeight - 60;
      // Let tall cards scroll far enough to expose their text on short screens.
      stickyTop = stage.offsetHeight > availableHeight
        ? window.innerHeight - stage.offsetHeight - 12
        : Math.max(60, (window.innerHeight - stage.offsetHeight) / 2);
      stage.style.top = `${stickyTop}px`;
      step = Math.max((rect.height - stage.offsetHeight) / count, 1);
      schedule();
    };

    // Cache layout measurements; scrolling only updates when the feature changes.
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (stageRef.current) observer.observe(stageRef.current);
    observer.observe(document.body);
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
    };
  }, [count]);

  return { trackRef, stageRef, activeIndex };
}

function FeatureCard({
  feature,
  index,
  active,
}: {
  feature: Feature;
  index: number;
  active: boolean;
}) {
  const textOnRight = index % 2 === 1;
  const [imageRef, imageInView] = useInView<HTMLDivElement>({
    threshold: 0.15,
    once: false,
  });
  const imageRevealed = active && imageInView;

  const reveal = active ? 1 : 0;

  return (
    <div
      aria-hidden={!active}
      className={`col-start-1 row-start-1 flex min-w-0 bg-[#e9f3e2] ${active ? "visible" : "invisible pointer-events-none"}`}
    >
      <div className="flex w-full flex-col justify-center overflow-hidden py-3 border-b border-green-900/10 bg-[#e9f3e2]">
        <div
          className={`mx-auto grid w-full max-w-6xl lg:max-w-[88rem] grid-cols-1 items-center gap-4 lg:px-8 lg:gap-10 ${
            textOnRight
              ? "lg:grid-cols-[0.45fr_1.9fr_0.8fr]"
              : "lg:grid-cols-[0.8fr_1.9fr_0.45fr]"
          }`}
        >
          {/* TEXT — LEFT / RIGHT */}
          <div
            className={
              textOnRight
                ? "min-w-0 row-start-2 lg:col-start-3 lg:row-start-1"
                : "min-w-0 row-start-2 lg:col-start-1 lg:row-start-1"
            }
            style={{
              transition: active ? "opacity 150ms ease-out, transform 150ms ease-out" : "none",
              opacity: reveal,
              transform: `translateY(${(1 - reveal) * 30}px)`,
            }}
          >
            <Heading
              level={3}
              className="!text-xl font-extrabold leading-snug !text-green-700 sm:!text-2xl lg:!text-3xl"
            >
              {feature.title}
            </Heading>

            <Paragraph className="mt-3 max-w-none !text-gray-700 lg:mt-4 lg:max-w-md">
              {feature.description}
            </Paragraph>
          </div>

          {/* IMAGE — Always Cent */}
          <div ref={imageRef} className="min-w-0 row-start-1 lg:col-start-2">
            <div
              className="overflow-hidden shadow-sm motion-reduce:!transition-none"
              style={{
                transition: imageRevealed ? "clip-path 600ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
                clipPath: imageRevealed ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
              }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="h-[clamp(140px,25svh,240px)] w-full object-cover sm:h-[280px] lg:h-[360px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const [headerRef, headerInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
  });

  const { trackRef, stageRef, activeIndex } = useActiveFeature(FEATURES.length);

  return (
    <section className="bg-[#e9f3e2] px-4 sm:px-6 lg:px-16">
      <div ref={trackRef} className="relative">
        <div ref={stageRef} className="sticky top-[60px] bg-[#e9f3e2]">
      <div className="mx-auto max-w-6xl lg:max-w-[88rem] lg:px-8">
        <div
          ref={headerRef}
          className={`pt-3 lg:pt-18 pb-4 transition-all duration-300 ease-out sm:pb-6 ${
            headerInView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <Heading
            level={2}
            className="!text-2xl font-extrabold !text-gray-900 sm:!text-3xl lg:!text-4xl"
          >
            Why industries choose Gasplus
          </Heading>
          <Paragraph className="mt-4 max-w-xl !text-gray-700">
            We combine technical depth with responsive service to deliver energy
            infrastructure that performs when it matters most.
          </Paragraph>
        </div>
      </div>

      <div className="grid">
        {FEATURES.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            index={i}
            active={activeIndex === i}
          />
        ))}
        </div>
        </div>
        <div aria-hidden="true" style={{ height: `${FEATURES.length * 100}svh` }} />
      </div>
    </section>
  );
}
