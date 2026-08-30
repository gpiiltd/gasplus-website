import { Flame } from "lucide-react";
import { Heading, Paragraph, Text } from "../../components/Typography";

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
];

function PrincipleCard({ principle }: { principle: Principle }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-8">
      <Flame
        className="pointer-events-none absolute -bottom-4 -right-4 h-32 w-32 text-gray-100"
        strokeWidth={1.5}
      />
      <div className="relative">
        <Heading level={4} className="!text-gray-900">
          {principle.title}
        </Heading>
        <Text
          variant="muted"
          size="base"
          className="mt-3 block leading-relaxed"
        >
          {principle.description}
        </Text>
      </div>
    </div>
  );
}

export default function PrinciplesSection() {
  return (
    <section className="relative overflow-hidden bg-[#16220f] px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
      {/* Diagonal transition shape, bottom, into the section below */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-white sm:h-20"
        style={{ clipPath: "polygon(0 0, 40% 0, 60% 100%, 0 100%)" }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Heading level={2} className="!text-white max-w-2xl">
          The principles that govern how we operate at Gasplus
        </Heading>

        <Paragraph className="mt-4 max-w-xl !text-gray-300">
          Every decision we make is built around one standard: Does this make
          our client&apos;s operations more efficient?
        </Paragraph>

        <div className="mt-10 grid grid-cols-1 gap-6 pb-10 sm:grid-cols-2 sm:pb-14 lg:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <PrincipleCard key={principle.title} principle={principle} />
          ))}
        </div>
      </div>
    </section>
  );
}
