import type { ButtonProps, ButtonVariant } from "./types";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  icon,
}) => {
  const base =
    "group inline-flex items-center justify-center gap-2 font-display tracking-wide font-semibold text-sm px-5 py-3 rounded-lg transition-all duration-300 ease-out cursor-pointer whitespace-nowrap hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-[0.97]";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-[#45712B]",
    secondary:
      "bg-[#666666] text-white border border-[#2a2f3e] hover:bg-[#222736]",
  };

  return (
    <button
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span>{children}</span>

      {icon && (
        <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </button>
  );
};