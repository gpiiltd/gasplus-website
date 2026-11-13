import { containerClass } from "../../utils/constants";
import { useEffect, useRef } from "react";
import { Heading } from "../../components/Typography";
import gasplusImage8 from "../../assets/images/gasplus-image-8.jpg";
import gasplusImage5 from "../../assets/images/gasplus-image-5.jpg";
import gasplusImage3 from "../../assets/images/gasplus-image-3.jpg";
import lngImage from "../../assets/images/lng-3.jpeg";

const trustText =
  "We partner with manufacturing plants, commercial facilities, estates, and energy infrastructure projects that require stable, uninterrupted power supply.";
const words = trustText.split(" ");

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const wordElements = Array.from(section.querySelectorAll<HTMLElement>("[data-trust-word]"));
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const viewportHeight = document.documentElement.clientHeight;
      const top = section.getBoundingClientRect().top;
      const progress = Math.max(0, Math.min(1,
        (viewportHeight * 0.85 - top) / Math.max(viewportHeight * 0.5, 1),
      ));
      wordElements.forEach((word, index) => {
        word.style.color = progress * words.length > index ? "#9DF666" : "#454545";
      });
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={ref} className="w-full bg-gray-950 py-16 lg:px-10">
      <div className={`${containerClass} max-sm:!pr-2`}>
        <p
          className="text-xs font-semibold uppercase tracking-widest text-[#E5E5E5]"
        >
          Trusted by operators across Nigeria
        </p>

        <div className="mt-4 w-full">
          <Heading
            level={2}
            className="w-full break-normal !text-2xl font-extrabold leading-snug sm:!text-3xl lg:!text-3xl"
          >
            <span className="sr-only">{trustText}</span>
            <span aria-hidden="true" className="inline-flex max-w-full flex-wrap items-baseline gap-x-2">
              {words.map((word, index) => (
                <span
                  key={index}
                  className="inline-flex items-baseline"
                >
                  <span
                    data-trust-word
                    className="transition-colors duration-200 ease-out motion-reduce:!text-[#9DF666] motion-reduce:!transition-none"
                    style={{ color: "#454545" }}
                  >
                    {word === "plants," || word === "facilities," || word === "estates," ? word.slice(0, -1) : word}
                  </span>
                  {word === "plants," ? (
                    <>
                      <img
                        src={gasplusImage8}
                        alt=""
                        aria-hidden="true"
                        className="mx-1 inline-block h-[calc(1em+2px)] w-[calc(1em+2px)] rounded-md object-cover align-middle"
                      />
                      <span>,</span>
                    </>
                  ) : null}
                  {word === "facilities," ? (
                    <>
                      <img
                        src={gasplusImage5}
                        alt=""
                        aria-hidden="true"
                        className="mx-1 inline-block h-[calc(1em+2px)] w-[calc(1em+2px)] rounded-md object-cover align-middle"
                      />
                      <span>,</span>
                    </>
                  ) : null}
                  {word === "estates," ? (
                    <>
                      <img
                        src={gasplusImage3}
                        alt=""
                        aria-hidden="true"
                        className="mx-1 inline-block h-[calc(1em+2px)] w-[calc(1em+2px)] rounded-md object-cover align-middle"
                      />
                      <span>,</span>
                    </>
                  ) : null}
                  {word === "projects" ? (
                    <img
                      src={lngImage}
                      alt=""
                      aria-hidden="true"
                      className="mx-1 inline-block h-[calc(1em+2px)] w-[calc(1em+2px)] rounded-md object-cover align-middle"
                    />
                  ) : null}
                </span>
              ))}
            </span>
          </Heading>
        </div>
      </div>
    </section>
  );
}
