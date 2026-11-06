import { useSyncExternalStore } from "react";
import { Heading, Paragraph, Text } from "../../components/Typography";
import { FadeIn, StaggerChildren } from "../../components/animations/Animations";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

const SERVICE_ITEMS: ServiceItem[] = [
  {
    number: "01",
    title: "IPP Captive Power Generation",
    description:
      "We generate reliable power on site, so your operations stay independent and uninterrupted.",
  },
  {
    number: "02",
    title: "Gas Compression Solutions",
    description:
      "We provide systems that raise gas pressure for transport and use, to keep it moving efficiently through your system.",
  },
  {
    number: "03",
    title: "LNG Supply and Delivery",
    description:
      "We supply and transport liquefied natural gas where you need it, when you need it.",
  },
  {
    number: "04",
    title: "Industrial Generator Maintenance",
    description:
      "We service and repair industrial generators to keep your power running, cut downtime and extend equipment life.",
  },
  {
    number: "05",
    title: "Preventive and Corrective Maintenance",
    description:
      "We carry out scheduled checks on your equipment to stop problems before they start and fix issues quickly when they arise.",
  },
  {
    number: "06",
    title: "Gas Power Plant Operations",
    description:
      "We manage and monitor gas power plants, handling everything from fuel use to output to ensure efficient daily performance.",
  },
  {
    number: "07",
    title: "Engine Overhaul and Technical Diagnostics",
    description:
      "We inspect, diagnose, and rebuild engines to extend thier lifespan and prevent future breakdowns.",
  },
  {
    number: "08",
    title: "Energy Infrastructure Development",
    description:
      "We design and build the energy systems that power your operations and distribute energy across site.",
  },
  {
    number: "09",
    title: "Gas Supply & Compression Solutions",
    description:
      "We handle both gas delivery and compression, supporting smooth and efficient energy flow across your operations.",
  },
];

function subscribeToColumns(onChange: () => void) {
  const queries = [window.matchMedia("(min-width: 640px)"), window.matchMedia("(min-width: 1024px)")];
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

function getColumnCount() {
  return window.matchMedia("(min-width: 1024px)").matches ? 3
    : window.matchMedia("(min-width: 640px)").matches ? 2 : 1;
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article className="w-full rounded-lg bg-green-300/50 p-6">
      <Text variant="muted" size="base" className="block font-semibold">
        {item.number}
      </Text>
      <Heading level={6} className="mt-3 !text-gray-900 font-semibold">
        {item.title}
      </Heading>
      <Text variant="muted" size="base" className="mt-3 block leading-relaxed text-[15px]">
        {item.description}
      </Text>
    </article>
  );
}

export default function WhatWeDoSection() {
  const columnCount = useSyncExternalStore(subscribeToColumns, getColumnCount, () => 1);

  return (
    <section className="bg-white pt-8 pb-16 sm:pt-12 sm:pb-24">
      <div className="lg:mx-30 mx-10">
        <FadeIn direction="up" delay={100}>
          <Heading
            level={2}
            className="!text-xl md:!text-2xl lg:!text-3xl [word-spacing:-0.08em] !text-green-800 font-extrabold"
          >
            Energy Solutions at Gasplus
          </Heading>
        </FadeIn>

        <FadeIn direction="up" delay={250}>
          <Paragraph className="mt-4 max-w-2xl font-base !text-black !text-[15px]">
            With a commitment to sustainability, innovation, and excellence, we empower our clients to meet their energy needs efficiently and responsibly.
          </Paragraph>
        </FadeIn>

        <StaggerChildren
          className="mt-10 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={100}
          baseDelay={200}
          direction="up"
        >
          {Array.from({ length: columnCount }, (_, columnIndex) => (
            <div key={columnIndex} className="flex min-w-0 flex-col gap-4">
              {SERVICE_ITEMS.filter((_, index) => index % columnCount === columnIndex).map((item) => (
                <ServiceCard key={item.number} item={item} />
              ))}
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
