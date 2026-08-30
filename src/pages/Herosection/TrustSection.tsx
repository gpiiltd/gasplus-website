import { useInView } from "../../components/animations/useInView";
import { containerClass } from "../../utils/constants";

const PARTNER_TEXT =
  "We partner with manufacturing plants, commercial facilities, estates, and energy infrastructure projects that require stable, uninterrupted power supply.";

export default function TrustSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  const words = PARTNER_TEXT.split(" ");
  const lastIndex = words.length - 1;

  return (
    <section ref={ref} className="bg-gray-950 px-6 py-10 sm:px-10 lg:px-16">
      <div className={`mx-auto ${containerClass} max-w-6xl`}>
        {/* Eyebrow label */}
        <p
          className={`text-xs font-semibold uppercase tracking-widest text-gray-400 transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          Trusted by operators across Nigeria
        </p>
        <h2 className="mt-4 text-2xl font-extrabold leading-snug sm:text-3xl lg:text-4xl">
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className={`inline-block transition-all duration-700 ease-out ${
                inView
                  ? "translate-y-0 text-[#9DF666] opacity-100"
                  : "translate-y-3 text-[#333333] opacity-0"
              }`}
              style={{ transitionDelay: `${(lastIndex - i) * 40}ms` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
