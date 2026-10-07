import { containerClass } from "../utils/constants";
interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`${containerClass} py-16 md:py-20 ${className}`}>
      {children}
    </div>
  );
};

export default SectionLayout;
