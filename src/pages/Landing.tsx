import Hero from "./Herosection/Hero";
import Services from "./Services";
import WhyChooseUs from "./WhyChooseUs";

const Landing = () => {
  return (
    <div>
      <Hero />
      <WhyChooseUs />
        <Services />

      {/* <AnimatedScreen>
        <Stats />
      </AnimatedScreen>
      <AnimatedScreen>
        <TestimonialsSection />
      </AnimatedScreen>
      <div className="bg-secondary-light mb-12">
        <div className={`${containerClass} mx-auto px-4`}>
          <AnimatedScreen className="mb-24">
            <FAQSection />
          </AnimatedScreen>
          <AnimatedScreen>
            <FooterCTA />
          </AnimatedScreen>
        </div>
      </div> */}
    </div>
  );
};

export default Landing;
