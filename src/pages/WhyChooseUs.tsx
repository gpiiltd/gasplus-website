import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "../components/animations/useInView";
import WCU1 from "../assets/images/wcu1.svg";
import WCU2 from "../assets/images/wcu2.png";
import WCU3 from "../assets/images/wcu3.png";
import WCU4 from "../assets/images/wcu4.png";



import { containerClass } from "../utils/constants";

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

function clamp(v: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

function mapRange(v: number, inMin: number, inMax: number) {
  if (inMax === inMin) return v >= inMax ? 1 : 0;
  return clamp((v - inMin) / (inMax - inMin));
}

/**
 * Continuous 0 -> 1 progress per card wrapper, based on how far its
 * sticky inner element is through its pinned scroll window.
 */
function useStackProgress(count: number) {
  const els = useRef<Array<HTMLDivElement | null>>([]);
  const [progress, setProgress] = useState<number[]>(() =>
    new Array(count).fill(0),
  );

  const setRef = useCallback(
    (i: number) => (el: HTMLDivElement | null) => {
      els.current[i] = el;
    },
    [],
  );

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      const vh = window.innerHeight;
      const next = els.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        // Progress across the wrapper's full scroll range (wrapper height - vh)
        const scrollable = Math.max(rect.height - vh, 1);
        return clamp(-rect.top / scrollable);
      });
      setProgress(next);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  return { setRef, progress };
}

function FeatureCard({
  feature,
  index,
  setRef,
  progress,
}: {
  feature: Feature;
  index: number;
  setRef: (el: HTMLDivElement | null) => void;
  progress: number;
}) {
  const textOnRight = index % 2 === 1;

  // Keep your existing reveal animation
  const reveal = mapRange(progress, 0.02, 0.45);

  return (
    <div
      ref={setRef}
      className="relative"
      style={{
        height: "115vh",
        zIndex: 10 + index,
      }}
    >
      <div className="sticky top-0 flex h-fit flex-col overflow-hidden border-t border-b border-green-900/10 bg-[#e9f3e2]">
        <div
          className={`${containerClass} mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 sm:grid-cols-3 sm:gap-10 sm:px-10 lg:px-16`}
        >
          {/* TEXT — LEFT / RIGHT */}
          <div
            className={
              textOnRight
                ? "sm:col-start-3 sm:row-start-1"
                : "sm:col-start-1 sm:row-start-1"
            }
            style={{
              opacity: reveal,
              transform: `translateY(${(1 - reveal) * 30}px)`,
              transition: "opacity 0.1s linear, transform 0.1s linear",
            }}
          >
            <h3 className="text-2xl font-extrabold leading-snug text-green-700 sm:text-3xl">
              {feature.title}
            </h3>

            <p className="mt-4 max-w-md text-gray-700">{feature.description}</p>
          </div>

          {/* IMAGE — ALWAYS CENTER */}
          <div className="sm:col-start-2 sm:row-start-1">
            <div
              className="overflow-hidden shadow-sm"
              style={{
                clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)`,
                transition: "clip-path 0.1s linear",
              }}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="h-[240px] w-full object-cover sm:h-[360px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({
    threshold: 0.4,
  });

  const { setRef, progress } = useStackProgress(FEATURES.length);

  return (
    <section className="bg-[#e9f3e2] px-6 sm:px-10 lg:px-16">
      <div className={`${containerClass} mx-auto max-w-6xl`}>
        {/* Section header */}
        <div
          ref={headerRef}
          className={`border-t border-green-900/10  pb-8 transition-all duration-700 ease-out sm:pt-14 sm:pb-10 ${
            headerInView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Why industries choose Gasplus
          </h2>
          <p className="mt-4 max-w-xl text-gray-700">
            We combine technical depth with responsive service to deliver energy
            infrastructure that performs when it matters most.
          </p>
        </div>
      </div>

      {/* Pinned, one-at-a-time stacking feature cards */}
      <div className="relative">
        {FEATURES.map((feature, i) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            index={i}
            setRef={setRef(i)}
            progress={progress[i]}
          />
        ))}
      </div>
    </section>
  );
}
