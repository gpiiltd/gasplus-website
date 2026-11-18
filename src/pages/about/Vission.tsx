import { Heading, Paragraph, } from "../../components/Typography";
import visionImg from "../../assets/images/about2.png";
import { FadeIn } from "../../components/animations/Animations";

export default function VisionSection() {
  return (
    <section className="flex flex-col bg-[#1D151D]">
      <div className="site-container !pt-15 pb-6 sm:pt-24 sm:pb-8">
        <div className=" flex w-full px-11 flex-col gap-6">
          <FadeIn direction="up" delay={100}>
            <h6 className="!text-white font-semibold text-[14px]">Our Vision</h6>
          </FadeIn>

          <div className="flex flex-col gap-6 md:flex-row mx-auto md:gap-10">
            <FadeIn direction="up" delay={250} className="min-w-0 flex-1">
              <Heading level={3} className="!text-white -mt-3">
                To become the most trusted name in gas and power infrastructure and industrial maintenance.
              </Heading>
            </FadeIn>

            <FadeIn direction="up" delay={400} className="min-w-0 flex-1">
              <Paragraph className="!text-[#E5E5E5] max-w-lg lg:!text-[16px]">
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
        <div className="px-11">
          <div className="h-64 w-full overflow-hidden rounded-lg sm:h-96">
            <img
              src={visionImg}
              alt="GasPlus field engineers on an offshore platform"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
