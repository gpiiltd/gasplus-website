interface SectionLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const SectionLayout: React.FC<SectionLayoutProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`max-w-7xl mx-auto px-6 py-16 md:py-20 ${className}`}>
      {children}
    </div>
  );
};

export default SectionLayout;
