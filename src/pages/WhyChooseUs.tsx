import { useInView } from "../components/animations/useInView";
import HERO_IMG from "../assets/images/hero.png";
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
    image: HERO_IMG,
  },
  {
    title: "Reliable energy delivery",
    description:
      "Our operations are designed for uninterrupted power and gas delivery. Dependable infrastructure, structured maintenance programs, and rapid response support keep your facility running without costly downtime.",
    image: HERO_IMG,
  },
  {
    title: "Safety and compliance",
    description:
      "Safety is built into every operation. We follow strict health, safety, environmental, and regulatory compliance procedures across all service areas, protecting your people, your assets, and your business.",
    image: HERO_IMG,
  },
];

function FeatureRow({ feature, index }: { feature: Feature; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.35 });
  const imageOnLeft = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 items-center gap-10 border-t border-green-900/10 py-14 sm:grid-cols-2 sm:gap-16 sm:py-20"
    >
      {/* Text */}
      <div
        className={`transition-all duration-700 ease-out ${
          imageOnLeft ? "sm:order-2" : "sm:order-1"
        } ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <h3 className="text-2xl font-extrabold leading-snug text-green-700 sm:text-3xl">
          {feature.title}
        </h3>
        <p className="mt-4 max-w-md text-gray-700">{feature.description}</p>
      </div>

      {/* Sticky image */}
      <div className={imageOnLeft ? "sm:order-1" : "sm:order-2"}>
        <div
          className={`sticky top-24 overflow-hidden rounded-2xl shadow-sm transition-all duration-700 ease-out ${
            inView
              ? "translate-y-0 scale-100 opacity-100"
              : `translate-y-10 scale-95 opacity-0 ${
                  imageOnLeft ? "sm:-translate-x-4" : "sm:translate-x-4"
                }`
          }`}
        >
          <img
            src={feature.image}
            alt={feature.title}
            className="h-[280px] w-full object-cover sm:h-[360px]"
          />
        </div>
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({
    threshold: 0.4,
  });

  return (
    <section className="bg-[#e9f3e2] px-6 sm:px-10 lg:px-16">
      <div className={`${containerClass} mx-auto max-w-6xl`}>
        {/* Section header */}
        <div
          ref={headerRef}
          className={`border-t border-green-900/10 py-16 transition-all duration-700 ease-out sm:py-20 ${
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

        {FEATURES.map((feature, i) => (
          <FeatureRow key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
