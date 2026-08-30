import { Heading, Paragraph, } from "../../components/Typography";
import Badge from "./Badge";
import visionImg from "../../assets/images/about2.png";

export default function VisionSection() {
  return (
    <section className="grid grid-cols-1 bg-[#150e1a] sm:grid-cols-2">
      <div className="flex flex-col justify-center gap-6 px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
        <Badge>Our Vision</Badge>

        <Heading level={2} className="!text-white">
          To become a leading provider of reliable gas-powered energy and
          industrial maintenance solutions across Africa.
        </Heading>

        <Paragraph className="!text-gray-300 max-w-lg">
          We want to become the most trusted name in gas and power
          infrastructure and industrial maintenance
        </Paragraph>
      </div>

      <div className="h-72 sm:h-auto">
        <img
          src={visionImg}
          alt="GasPlus field engineers on an offshore platform"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
