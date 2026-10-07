import { useEffect, useRef, useState } from "react";
import { containerClass } from "../../utils/constants";
import { useInView } from "../../components/animations/useInView";
import { Heading } from "../../components/Typography";

const trustText =
  "We partner with manufacturing plants, commercial facilities, estates, and energy infrastructure projects that require stable, uninterrupted power supply.";
const words = trustText.split(" ");

export default function TrustSection() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.15 });
  const measureRef = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const element = measureRef.current;
    if (!element) return;

    let frame = 0;
    let disposed = false;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (disposed) return;
        const nextLines: string[] = [];
        let previousTop = -1;
        for (const word of element.querySelectorAll<HTMLSpanElement>("[data-word]")) {
          if (word.offsetTop !== previousTop) {
            nextLines.push(word.textContent ?? "");
            previousTop = word.offsetTop;
          } else {
            nextLines[nextLines.length - 1] += ` ${word.textContent}`;
          }
        }
        setLines((current) =>
          current.join("\n") === nextLines.join("\n") ? current : nextLines,
        );
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    document.fonts.addEventListener("loadingdone", measure);
    void document.fonts.ready.then(() => {
      if (!disposed) measure();
    });
    measure();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.fonts.removeEventListener("loadingdone", measure);
    };
  }, []);

  return (
    <section ref={ref} className="w-full bg-gray-950 py-10">
      <div className={`${containerClass} max-sm:!pr-2`}>
        <p
          className={`text-xs font-semibold uppercase tracking-widest transition-opacity duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ color: "#E5E5E5" }}
        >
          Trusted by operators across Nigeria
        </p>

        <div className="mt-4 w-full">
          <Heading
            level={2}
            className="relative w-full break-normal !text-2xl font-extrabold leading-snug sm:!text-3xl lg:!text-4xl"
          >
            <span className="sr-only">{trustText}</span>
            {/* Measure actual wrapping with the same width and typography. */}
            <span
              ref={measureRef}
              aria-hidden="true"
              className="invisible pointer-events-none absolute inset-x-0 top-0 block"
            >
              {words.map((word, index) => (
                <span key={index}>
                  <span data-word className="inline-block whitespace-nowrap">{word}</span>
                  {index < words.length - 1 ? " " : null}
                </span>
              ))}
            </span>

            <span aria-hidden="true" className="block text-[#9DF666]">
              {(lines.length ? lines : [trustText]).map((line, index) => (
                <span key={index} className="block overflow-hidden">
                  <span
                    className="block motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:!transition-none"
                    style={{
                      transform: inView && lines.length ? "translateY(0)" : "translateY(110%)",
                      opacity: inView && lines.length ? 1 : 0,
                      transition:
                        "transform 850ms cubic-bezier(0.16, 1, 0.3, 1), opacity 650ms ease-out",
                      transitionDelay: `${500 + index * 250}ms`,
                    }}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </span>
          </Heading>
        </div>
      </div>
    </section>
  );
}
