import { containerClass } from "../../utils/constants";
import { useState, useSyncExternalStore } from "react";
import { ChevronDown } from "lucide-react";
import { Heading, Paragraph, Text} from "../../components/Typography";
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
      "Tailored captive power solutions that give industrial sites greater energy independence and consistent output.",
  },
  {
    number: "02",
    title: "Gas Compression Solutions",
    description:
      "Compression systems engineered to move gas efficiently from source to end use, sized to your facility's demand.",
  },
  {
    number: "03",
    title: "LNG Supply and Delivery",
    description:
      "Reliable liquefied natural gas sourcing, transport, and delivery for sites without pipeline access.",
  },
  {
    number: "04",
    title: "Industrial Generator Maintenance",
    description:
      "Scheduled servicing and rapid-response repairs that keep industrial generators running at peak reliability.",
  },
  {
    number: "05",
    title: "Preventive and Corrective Maintenance",
    description:
      "Structured maintenance programs that catch issues early and resolve faults quickly to minimize downtime.",
  },
  {
    number: "06",
    title: "Gas Power Plant Operations",
    description:
      "End-to-end operational support for gas power plants, from daily monitoring to performance optimization.",
  },
  {
    number: "07",
    title: "Engine Overhaul and Technical Diagnostics",
    description:
      "In-depth diagnostics and full engine overhauls that extend equipment lifespan and restore performance.",
  },
  {
    number: "08",
    title: "Energy Infrastructure Development",
    description:
      "Planning and delivery of energy infrastructure projects built for long-term operational reliability.",
  },
  {
    number: "09",
    title: "Gas Supply & Compression Solutions",
    description:
      "Integrated gas supply and compression services designed around your facility's specific throughput needs.",
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

function ServiceAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: ServiceItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`w-full cursor-pointer rounded-2xl p-6 transition-colors duration-600 ease-in-out hover:bg-[#E5F3DC] focus-within:bg-[#CAE7B9] motion-reduce:transition-none ${
        isOpen ? "bg-[#CAE7B9]" : "bg-gray-100"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3">
          <Text variant="muted" size="base" className="font-semibold">
            {item.number}
          </Text>

          <Heading level={6} className="!text-gray-900 font-semibold">
            {item.title}
          </Heading>
        </div>

        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-gray-500 transition-transform duration-600 ease-in-out motion-reduce:transition-none ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity,margin-top] duration-600 ease-in-out motion-reduce:transition-none ${
          isOpen
            ? "mt-4 grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <Text variant="muted" size="base" className="block leading-relaxed">
            {item.description}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default function WhatWeDoSection() {
  const [openNumber, setOpenNumber] = useState<string | null>(null);
  const columnCount = useSyncExternalStore(subscribeToColumns, getColumnCount, () => 1);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className={containerClass}>
        <FadeIn direction="up" delay={100}>
          <Heading level={2} className="!text-gray-900">
            How we provide value at Gasplus
          </Heading>
        </FadeIn>

        <FadeIn direction="up" delay={250}>
          <Paragraph className="mt-4 max-w-2xl font-base !text-gray-700">
            With a commitment to sustainability, innovation, and excellence, we empower our clients to meet their energy needs efficiently and responsibly.
          </Paragraph>
        </FadeIn>

        <StaggerChildren
          className="mt-10 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer"
          staggerDelay={100}
          baseDelay={200}
          direction="up"
        >
          {Array.from({ length: columnCount }, (_, columnIndex) => (
            <div key={columnIndex} className="flex min-w-0 flex-col gap-4 cursor-pointer">
              {SERVICE_ITEMS.filter((_, index) => index % columnCount === columnIndex).map((item) => (
                <ServiceAccordionItem
                  key={item.number}
                  item={item}
                  isOpen={openNumber === item.number}
                  onToggle={() =>
                    setOpenNumber((current) => current === item.number ? null : item.number)
                  }
                />
              ))}
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
