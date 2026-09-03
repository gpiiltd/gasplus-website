
import { Heading,Text } from "../../components/Typography";
import TermsOfServiceContent from "./TermOfUse";


const TermsOfUsePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#2D4C1A]">
        <div className="max-w-7xl mx-auto px-6 pb-12 mb-10">
          <Heading level={2} className="mb-2 pt-24 text-white">
            Terms of Use
          </Heading>
          <Text variant="muted" size="sm" className="uppercase tracking-widest text-white">
            Updated March 04, 2026
          </Text>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <TermsOfServiceContent />
      </div>
    </div>
  );
};

export default TermsOfUsePage;