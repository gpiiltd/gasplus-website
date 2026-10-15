import team1 from "../assets/images/team4.png";
import team2 from "../assets/images/team3.png";
import team3 from "../assets/images/team2.png";
import team4 from "../assets/images/team1.png";
import { Heading, Paragraph } from "./Typography";
import { useNavigate } from "react-router-dom";

type Executive = {
  name: string;
  role: string;
  image: string;
  linkedin: string;
};

// Replace image paths and LinkedIn URLs with the real ones.
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

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect width="24" height="24" rx="4" fill="#4A80F0" />
      <path
        fill="#fff"
        d="M7.1 9.6h2.3V17H7.1V9.6Zm1.15-3.7a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66ZM10.9 9.6h2.2v1c.3-.58 1.05-1.2 2.17-1.2 2.32 0 2.75 1.52 2.75 3.5V17h-2.3v-3.7c0-.88-.02-2.02-1.23-2.02-1.23 0-1.42.96-1.42 1.95V17h-2.3V9.6h.13Z"
      />
    </svg>
  );
}

function ExecutiveCard({ executive }: { executive: Executive }) {
  return (
    <article>
      <div className="aspect-[3/2] w-full overflow-hidden rounded-xl bg-gray-200">
        <img
          src={executive.image}
          alt={`Portrait of ${executive.name}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div className="mt-3 flex items-start justify-between gap-3 px-1">
        <h3 className="text-base font-semibold leading-snug text-gray-900">
          {executive.name}
        </h3>
        <a
          href={executive.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${executive.name} on LinkedIn`}
          className="shrink-0 rounded transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6B9B45]"
        >
          <LinkedInIcon className="h-5 w-5" />
        </a>
      </div>
      <p className="mt-1 px-1 text-sm leading-snug text-gray-700">
        {executive.role}
      </p>
    </article>
  );
}

// Faint decorative squares, like the pixel pattern behind the section.
const SQUARES = [
//   "left-0 top-[42%] h-14 w-20",
//   "left-8 top-[58%] h-12 w-14",
  "left-[18%] top-[36%] h-12 w-12",
  "right-[22%] top-[52%] h-12 w-28",
//   "left-8 bottom-[6%] h-14 w-14",
  "left-[16%] bottom-[2%] h-16 w-24",
//   "left-[46%] bottom-[1%] h-14 w-14",
  "right-[14%] bottom-[2%] h-12 w-16",
];

export default function ExecutivesSection() {
      const navigate = useNavigate();

  return (
    <section   id="team"
 className="relative overflow-hidden bg-gradient-to-b from-white to-[#F2F2F2] py-14 lg:py-16">
      {/* Bottom: white shape, tip pointing up toward the left */}
     
        {/* Bottom: white band, anchored right with a slanted left edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-white sm:h-12"
        style={{ clipPath: "polygon(67% 0, 100% 0, 100% 100%, 56% 100%)" }}
      />

      {/* Decorative squares */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {SQUARES.map((position) => (
          <span
            key={position}
            className={`absolute bg-[#6B9B45]/5 ${position}`}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1028px] px-4 sm:px-6">
        <header className="mx-auto max-w-lg text-center">
          <Heading level={3} className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
            Meet the executives driving operations at GasPlus
          </Heading>
          <Paragraph className="mt-3 text-sm leading-relaxed text-gray-700">
            Gasplus is led by energy leaders with hands-on experience across
            power generation, gas infrastructure, and industrial operations
            across Africa.
          </Paragraph>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2">
          {EXECUTIVES.map((executive) => (
            <ExecutiveCard key={executive.name} executive={executive} />
          ))}
        </div>
      </div>
    </section>
  );
}
