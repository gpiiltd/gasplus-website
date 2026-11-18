import { containerClass } from "../../utils/constants";
import opacedFire from "../../assets/images/opacedfire.png";
import { Heading, Paragraph, Text } from "../../components/Typography";
import { FadeIn, StaggerChildren } from "../../components/animations/Animations";

interface Principle {
  title: string;
  description: string;
}

const PRINCIPLES: Principle[] = [
  {
    title: "Operational Excellence",
    description:
      "We combine preventive maintenance, real-time monitoring, and continuous improvement initiatives to keep your equipment running at peak performance.",
  },
  {
    title: "Reliable Energy Delivery",
    description:
      "Our operations are designed to deliver uninterrupted gas and power solutions through dependable infrastructure, technical expertise, and rapid response support services.",
  },
  {
    title: "Technical & Engineering Capability",
    description:
      "Our skilled engineering team deploys the best and advanced technologies and diagnostics to execute projects and maintain your systems.",
  },
  {
    title: "Safety, Compliance & Risk Management",
    description:
      "We strictly prioritise HSE and regulatory standards because safe, compliant operations protect our people, our clients, and the communities we serve.",
  },
  {
    title: "Customer-Centric Service Delivery",
    description:
      "We tailor energy strategies to your specific operational needs, backed by responsive support and clear communication at every stage.",
  },
  {
    title: "Strategic Partnerships",
    description:
      "We strategically collaborate with top OEMs, EPCs, gas suppliers, and industry stakeholders to deliver dependable, future-ready energy solutions.",
  },
  {
    title: "Operational Sustainability",
    description:
      "We optimize gas utilization and champion eco-friendly energy solutions that cut costs while fueling sustainable industrial growth.",
  },
  {
    title: "Continuous Growth and Expansion",
    description:
      "We're expanding our footprint upgrading infrastructure, and building scalable solutions to meet surging market demands across multiple industries.",
  },
];

function PrincipleCard({ principle, featured = false }: { principle: Principle; featured?: boolean }) {
  return (
    <div className={`relative min-h-[180px] w-full overflow-hidden rounded-lg border border-gray-200 bg-white px-4 py-5 ${featured ? "xl:py-9" : ""}`}>
      <img
        src={opacedFire}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -right-3 h-30 w-50 object-contain"
      />
      <div className="relative">
        <Heading level={5} className="!text-base !leading-tight !text-black">
          {principle.title}
        </Heading>
        <Text variant="muted" size="base" className="mt-2 block !text-[14px] leading-5">
          {principle.description}
        </Text>
      </div>
    </div>
  );
}

export default function PrinciplesSection() {
  return (
    <section className="relative mx-auto px-10 overflow-hidden bg-[#16280A] py-12 sm:py-16">
      {/* Diagonal transition shape, bottom, into the section below */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-white sm:h-20"
        style={{ clipPath: "polygon(60% 0, 100% 0, 100% 100%, 40% 100%)" }}
      />

      <div className={`${containerClass} relative`}>
        <FadeIn direction="up" delay={100}>
          <Heading
            level={2}
            className="!text-4xl !text-white max-w-2xl"
          >
            The principles that govern how we operate at <span className="text-[#7BC24F]">Gasplus</span> 
          </Heading>
        </FadeIn>

        <FadeIn direction="up" delay={250}>
          <Paragraph className="mt-4 max-w-xl !text-[16px] !text-white">
            Every decision we make is built around one standard; 
            <br />
            Making all our client&apos;s operations more efficient.
          </Paragraph>
        </FadeIn>

        <StaggerChildren
          className="mt-8 grid w-full grid-cols-1 gap-4 pb-10 sm:grid-cols-2 sm:pb-14 xl:grid-cols-3"
          staggerDelay={100}
          baseDelay={200}
          direction="up"
        >
          {PRINCIPLES.map((principle, index) => (
            <PrincipleCard
              key={principle.title}
              principle={principle}
              featured={index % 3 === 1}
            />
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
