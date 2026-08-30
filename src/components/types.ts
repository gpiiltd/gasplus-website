
// Heading Component
export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Paragraph Component
export interface ParagraphProps {
  children: React.ReactNode;
  size?: "sm" | "base" | "lg";
  className?: string;
}

// Text Component (for smaller text, labels, etc.)
export interface TextProps {
  children: React.ReactNode;
  variant?: "muted" | "default" | "strong";
  size?: "xs" | "sm" | "base";
  className?: string;
}

// Label Component
export interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

// Link Component
export interface LinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}


export type ButtonVariant = "primary" | "secondary";
 
export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
}
 
export interface NavLink {
  label: string;
  href: string;
}


