
import visionImg from "../assets/images/about-hero.png";
import { Heading, Paragraph } from "../components/Typography";
import Badge from "./about/Badge";
import MissionSection from "./about/Vission";
import Principles from "./about/Principles";
import WhatWeDo from "./about/WhatWeDo";

export default function About() {
   return (
     <div>
       <section className="grid grid-cols-1 bg-[#e9f3e2] sm:grid-cols-2">
         <div className="flex flex-col justify-center gap-6 px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
           <Badge>Our Mission</Badge>

           <Heading level={2} className="!text-gray-900">
             To deliver innovative, efficient, and sustainable energy solutions
             that empower industries, drive productivity, and create long-term
             value for our clients and stakeholders.
           </Heading>

           <Paragraph className="max-w-lg">
             We exist to provide gas and power solutions to the businesses that
             power the African continent
           </Paragraph>
         </div>

         <div className="h-72 sm:h-auto">
           <img
             src={visionImg}
             alt="Power plant cooling towers at sunset"
             className="h-full w-full object-cover"
           />
         </div>
       </section>
       <WhatWeDo />

       <MissionSection />
       <Principles />
     </div>
   );
}
