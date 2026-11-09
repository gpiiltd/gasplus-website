import { Heading, Paragraph, } from "../../components/Typography";
import Badge from "./Badge";
import visionImg from "../../assets/images/about2.png";
import { FadeIn } from "../../components/animations/Animations";

export default function VisionSection() {
  return (
    <section className="flex flex-col bg-[#150e1a]">
      <div className="site-container pt-16 pb-6 sm:pt-24 sm:pb-8">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <FadeIn direction="up" delay={100}>
            <Badge>Our Vision</Badge>
          </FadeIn>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
            <FadeIn direction="up" delay={250} className="min-w-0 flex-1">
              <Heading level={3} className="!text-white -mt-3">
                To become the most trusted name in gas and power infrastructure and industrial maintenance.
              </Heading>
            </FadeIn>

            <FadeIn direction="up" delay={400} className="min-w-0 flex-1">
              <Paragraph className="!text-gray-300 max-w-lg !text-[16px]">
                Our vision is to provide reliable gas-powered energy and industrial maintenance solutions to businesses across Africa.
              </Paragraph>
            </FadeIn>
          </div>
        </div>
      </div>

      <FadeIn
        direction="right"
        delay={200}
        className="site-container w-full pb-16 sm:pb-24"
      >
        <div className="mx-auto h-64 w-full max-w-5xl overflow-hidden rounded-lg sm:h-96">
          <img
            src={visionImg}
            alt="GasPlus field engineers on an offshore platform"
            className="h-full w-full object-cover"
          />
        </div>
      </FadeIn>
    </section>
  );
}
