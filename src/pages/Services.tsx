import bgImage from "../assets/images/Layout.png";
import ippImg from "../assets/images/energy1.png";
import lngImg from "../assets/images/energy2.png";
import cngImg from "../assets/images/energy3.png";
import maintenanceImg from "../assets/images/energy4.png";
import { useInView } from "../components/animations/useInView";
import { Heading, Paragraph } from "../components/Typography";
import { containerClass } from "../utils/constants";

interface Service {
  number: string;
  title: string;
  description: string;
  image: string;
}

const SERVICES: Service[] = [
  {
    number: "01",
    title: "Independent Power Producers (IPP)",
    description:
      "At GasPlus, we specialize in Independent Power Producer (IPP) captive power generation, providing tailored energy solutions that empower businesses to achieve greater energy independence and operational efficiency. Our IPP services are designed to meet the specific power needs of industrial sectors, ensuring reliable and cost-effective energy supply.",
    image: ippImg,
  },
  {
    number: "02",
    title: "Liquified Natural Gas",
    description:
      "The GasPlus Domestic LNG is designed to bridge the gap between natural gas producers and energy consumers without pipeline access. Our integrated value chain encompasses LNG sourcing, liquefaction, cryogenic transportation, storage, regasification, and end-user supply. This model enables industries, embedded power plants, manufacturing facilities, and commercial customers to benefit from a secure, flexible, and lower-carbon energy solution.",
    image: lngImg,
  },
  {
    number: "03",
    title: "CNG Virtual Pipeline Distribution",
    description:
      "At GasPlus, our CNG Virtual Pipeline Distribution service provides an efficient and flexible solution for delivering compressed natural gas (CNG) directly from our mother stations to industrial users and AutoGas fleets. This innovative approach eliminates the need for extensive pipeline infrastructure, allowing your business to access clean and cost-effective energy seamlessly.",
    image: cngImg,
  },
  {
    number: "04",
    title: "Industrial Gas Generator Maintenance & Technical Support Services",
    description:
      "At GasPlus, we understand that reliable power generation is crucial for your industrial operations. Our Industrial Gas Generator Maintenance services are designed to ensure your systems operate at peak performance, minimize downtime, and extend the life of your equipment.",
    image: maintenanceImg,
  },
];

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const imageOnLeft = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 items-center gap-8 py-10 sm:grid-cols-2 sm:gap-12 sm:py-14"
    >
      <div
        className={`transition-all duration-700 ease-out ${
          imageOnLeft ? "sm:order-2" : "sm:order-1"
        } ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <span className="text-sm font-bold tracking-wide text-gray-400">
          {service.number}
        </span>
        <Heading level={3} className="mt-2 !text-2xl font-extrabold leading-snug !text-white sm:!text-3xl">
          {service.title}
        </Heading>
        <Paragraph className="mt-4 max-w-md !text-gray-300">{service.description}</Paragraph>
      </div>

      <div
        className={`overflow-hidden  transition-all duration-700 ease-out ${
          imageOnLeft ? "sm:order-1" : "sm:order-2"
        } ${
          inView
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-95 opacity-0"
        }`}
      >
        <img
          src={service.image}
          alt={service.title}
          className="h-[220px] w-full object-cover sm:h-[260px]"
        />
      </div>
    </div>
  );
}

export default function Services() {
  const { ref: headerRef, inView: headerInView } = useInView<HTMLDivElement>({
    threshold: 0.4,
  });

  return (
    <section className="relative overflow-hidden">
      {/* Background image — supplied as-is, no extra design layered on top */}
      <img
        src={bgImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Diagonal transition shape, top-left, matching the section above */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-16 w-full bg-[#e9f3e2] sm:h-20"
        style={{ clipPath: "polygon(0 0, 60% 0, 40% 100%, 0 100%)" }}
      />

      {/* Diagonal transition shape, bottom, into the section below */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-white sm:h-20"
        style={{ clipPath: "polygon(0 0, 40% 0, 60% 100%, 0 100%)" }}
      />

      <div className={`${containerClass} relative mx-auto  px-4 py-16 sm:py-20 lg:py-28`}>
        {/* Header */}
        <div
          ref={headerRef}
          className={`transition-all duration-700 ease-out ${
            headerInView
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
         <div className="w-full pt-2 sm:w-3/4 lg:w-2/4">
  <Heading level={2} className="!text-2xl font-extrabold leading-tight !text-white sm:!text-3xl md:!text-4xl">
    Energy solutions built for efficient{" "}
    <span className="text-green-500">business operation</span>
  </Heading>
</div>
       
          <Paragraph className="mt-4 max-w-2xl !text-gray-300">
            At GasPlus, our advanced systems for gas power generation, CNG
            mother station management, and industrial generator maintenance
            ensure reliable, cost-effective energy to power your operations.
          </Paragraph>
        </div>

        {/* Rows */}
        <div className="mt-8 divide-y divide-white/10">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.number} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
