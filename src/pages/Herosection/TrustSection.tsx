import { useInView } from "../../components/animations/useInView";
import { Heading, Paragraph } from "../../components/Typography";


export default function TrustSection() {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.15,
  });

  const lines = [
    "We partner with manufacturing plants, commercial facilities, estates,",
    "and energy infrastructure projects that require stable, uninterrupted",
    "power supply.",
  ];

  return (
    <section
      ref={ref}
      className="w-full bg-gray-950 px-6 py-10 sm:px-10 lg:px-16"
    >
      <div className="mx-auto w-full">
        {/* Eyebrow */}
        <Paragraph
          size="sm"
          className={`text-xs font-semibold uppercase tracking-widest transition-all duration-700 ease-out ${
            inView
              ? "translate-y-0 opacity-100 text-gray-400"
              : "translate-y-4 opacity-0 text-gray-500"
          }`}
        >
          Trusted by operators across Nigeria
        </Paragraph>

        {/* Full-width line reveal */}
        <div className="mt-4 w-full overflow-hidden">
          <Heading level={2} className="w-full !text-2xl font-extrabold leading-snug sm:!text-3xl lg:!text-4xl">
            {lines.map((line, index) => (
              <span
                key={line}
                className="block overflow-hidden"
              >
                <span
                  className="block"
                  style={{
                    transform: inView
                      ? "translateY(0)"
                      : "translateY(100%)",
                    opacity: inView ? 1 : 0.08,
                    color: inView ? "#9DF666" : "#4b5563",
                    transition: `
                      transform 650ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms,
                      opacity 650ms ease-out ${index * 100}ms,
                      color 0ms linear ${index * 100 + 650}ms
                    `,
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </Heading>
        </div>
      </div>
    </section>
  );
}
