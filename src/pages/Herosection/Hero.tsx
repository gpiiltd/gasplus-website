import { useEffect, useRef, useState } from "react";
import HERO_IMG from "../../assets/images/gasplus-bg.png";
import LNG_SHIP_IMG from "../../assets/images/gasplus-image-4.jpg";
import PIPELINE_IMG from "../../assets/images/gasplus-lng.jpeg";
import LNG_TANKS_IMG from "../../assets/images/lng-landing (1).jpeg";
import STORAGE_IMG from "../../assets/images/lng-3.jpeg";
import { Button } from "../../components/Button";
import { Heading, Paragraph } from "../../components/Typography";
import TrustSection from "./TrustSection";
import { containerClass } from "../../utils/constants";
import routeNames from "../../routes/routes";
import { useNavigate } from "react-router-dom";
import { FadeIn } from "../../components/animations/Animations";

const HERO_SLIDES = [
  HERO_IMG,
  LNG_SHIP_IMG,
  PIPELINE_IMG,
  LNG_TANKS_IMG,
  STORAGE_IMG,
];



export default function Hero() {
  const navigate = useNavigate();
  const [trackIndex, setTrackIndex] = useState(HERO_SLIDES.length);
  const activeSlide = trackIndex % HERO_SLIDES.length;
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const shouldSnapThumbnailsRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setTrackIndex((currentIndex) => currentIndex + 1);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const viewport = thumbnailsRef.current;
    const activeThumbnail =
      viewport?.querySelectorAll("button")[trackIndex];
    if (!viewport || !activeThumbnail) return;

    viewport.scrollTo({
      left:
        activeThumbnail.getBoundingClientRect().left -
        viewport.getBoundingClientRect().left +
        viewport.scrollLeft,
      behavior:
        shouldSnapThumbnailsRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
    });
    shouldSnapThumbnailsRef.current = false;
  }, [trackIndex]);

  useEffect(() => {
    if (trackIndex < HERO_SLIDES.length * 2) return;

    const timeoutId = window.setTimeout(() => {
      shouldSnapThumbnailsRef.current = true;
      setTrackIndex(HERO_SLIDES.length);
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, [trackIndex]);

  return (
    <>
      <section
        aria-label="GasPlus energy solutions"
        aria-roledescription="carousel"
        className="relative overflow-hidden bg-gray-950"
      >
        <div className="absolute inset-0">
          {HERO_SLIDES.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-screen w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-gray-/20 to-gray-/10" />
        </div>

        {/* Content */}
        <div
          className={`relative z-10 ${containerClass} pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-22 lg:pb-20`}
        >
          <div className="max-w-2xl lg:pl-10">
            <FadeIn direction="up" delay={100} threshold={0}>
              <Heading
                level={1}
                className="!text-4xl font-semibold !font-serif leading-[1.1] !text-white sm:!text-5xl"
              >
                Dependable power and gas solutions for your operations
              </Heading>
            </FadeIn>

            <FadeIn direction="up" delay={250} threshold={0}>
              <Paragraph className="mt-5 max-w-md !text-base text-white sm:!text-[15px]">
                GasPlus is committed to delivering high-quality, sustainable and
                advanced energy solutions, with extensive experience in gas
                power generation and maintenance.
              </Paragraph>
            </FadeIn>

            <FadeIn direction="up" delay={550} threshold={0}>
              <div className="mt-6">
                <Button
                  onClick={() => navigate(`/${routeNames.contact}`)}
                  className="!px-8"
                >
                  Contact Us
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>

        <div
          ref={thumbnailsRef}
          className="hero-thumbnail-viewport relative z-10 -mt-15 pb-5"
        >
          <div
            role="group"
            aria-label="Choose a hero slide"
            className="hero-thumbnail-track flex w-max"
          >
            {[...HERO_SLIDES, ...HERO_SLIDES, ...HERO_SLIDES].map(
              (image, indexInTrack) => {
                const index = indexInTrack % HERO_SLIDES.length;
                const isDuplicate =
                  indexInTrack < HERO_SLIDES.length ||
                  indexInTrack >= HERO_SLIDES.length * 2;

                return (
                  <button
                    key={`${indexInTrack}-${image}`}
                    type="button"
                    aria-label={
                      isDuplicate ? undefined : `Show slide ${index + 1}`
                    }
                    aria-pressed={!isDuplicate && index === activeSlide}
                    aria-hidden={isDuplicate}
                    tabIndex={isDuplicate ? -1 : undefined}
                    onClick={() => setTrackIndex(HERO_SLIDES.length + index)}
                    className={`hero-thumbnail relative overflow-hidden rounded-md transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${
                      index === activeSlide
                        ? "z-10 scale-y-[1.10] opacity-100"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-full object-cover"
                    />
                  </button>
                );
              },
            )}
          </div>
        </div>
      </section>
      <TrustSection />
    </>
  );
}
