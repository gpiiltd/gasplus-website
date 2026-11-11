import team1 from "../../assets/images/team4.png";
import team2 from "../../assets/images/team3.png";
import team3 from "../../assets/images/team2.png";
import team4 from "../../assets/images/team1.png";
import { Heading, Paragraph } from "../../components/Typography";

interface Executive {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

const EXECUTIVES: Executive[] = [
  {
    name: "Ken Etete",
    role: "Chief Executive Officer",
    image: team1,
    linkedin: "https://www.linkedin.com/in/kenetete/?isSelfProfile=false",
  },
  {
    name: "Dr. Preye Angaye",
    role: "Executive Director, Corporate Strategy and Business Performance",
    image: team2,
    linkedin: "https://www.linkedin.com/in/preye-angaye-phd-acca-b93a11106/",
  },
  {
    name: "Princewill Pamo",
    role: "General Manager Infrastructure and New Business",
    image: team3,
    linkedin: "https://www.linkedin.com/in/princewill-pamo-5b9a22153/",
  },
  {
    name: "Chika Obiesie",
    role: "Head Of Marketing and Business Development",
    image: team4,
    linkedin: "https://www.linkedin.com/in/chika-obiesie-5b09a3374/",
  },
];

export default function Executives() {
  return (
    <section
      id="team"
      className="relative overflow-hidden bg-gradient-to-b from-white to-[#F2F2F2] pt-14 pb-24 lg:pt-16 lg:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-white sm:h-20"
        style={{ clipPath: "polygon(0 0, 40% 0, 60% 100%, 0 100%)" }}
      />

      <div className="mx-auto max-w-[1028px] px-4 sm:px-6">
        <header className="mx-auto max-w-lg text-center">
          <Heading
            level={3}
            className="!text-4xl font-bold leading-tight !text-[#253919] font-extrabold sm:text-3xl"
          >
            The Executives driving operations at GasPlus
          </Heading>
          <Paragraph className="mt-3 !text-[15px] leading-relaxed text-black ">
            GasPlus is led by energy leaders with hands-on experience across
            power generation, gas infrastructure, and industrial operations
            across Africa.
          </Paragraph>
        </header>

        <div className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-8">
          {EXECUTIVES.map((executive) => (
            <article key={executive.name} className="w-full sm:w-[calc(50%-0.625rem)] xl:w-[calc(25%-0.9375rem)]">
              <div className="aspect-[3/2] w-full overflow-hidden rounded-xl bg-gray-200">
                <img
                  src={executive.image}
                  alt={`Portrait of ${executive.name}`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <div className="mt-3 px-1">
                <h4 className="text-base font-semibold leading-snug text-gray-900">
                  {executive.name}
                </h4>
                <p className="mt-1 !text-[13px] leading-snug text-gray-700">
                  {executive.role}
                </p>
                <a
                  href={executive.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${executive.name} on LinkedIn`}
                  className="mt-2 inline-flex h-6 w-6 items-center justify-center rounded bg-[#0A66C2] text-sm font-bold leading-none text-white transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A66C2]"
                >
                  <span aria-hidden="true">in</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}