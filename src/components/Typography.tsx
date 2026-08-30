import React, { type JSX } from "react";
import type {
  HeadingProps,
  LabelProps,
  LinkProps,
  ParagraphProps,
  TextProps,
} from "./types";

export const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  className = "",
  style,
}) => {
  const baseClasses =
    "font-outfit tracking-wide font-bold text-text-primary";

  const sizeClasses = {
    1: "text-3xl md:text-4xl lg:text-6xl",
    2: "text-2xl md:text-3xl lg:text-5xl",
    3: "text-xl md:text-2xl lg:text-3xl",
    4: "text-lg md:text-xl lg:text-2xl",
    5: "text-base md:text-lg lg:text-xl",
    6: "text-sm md:text-base lg:text-lg",
  };

  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className={`${baseClasses} ${sizeClasses[level]} ${className}`} style={style}>
      {children}
    </Tag>
  );
};

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  size = "base",
  className = "",
}) => {
  const sizeClasses = {
    sm: "text-sm md:text-base",
    base: "text-base md:text-lg",
    lg: "text-lg md:text-xl",
  };

  return (
    <p
      className={`font-euclid text-text-secondary leading-relaxed tracking-wide ${sizeClasses[size]} ${className}`}
    >
      {children}
    </p>
  );
};

export const Text: React.FC<TextProps> = ({
  children,
  variant = "default",
  size = "base",
  className = "",
}) => {
  const variantClasses = {
    muted: "text-text-secondary",
    default: "text-primary-700",
    strong: "text-text-primary font-semibold",
  };

  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
  };

  return (
    <span
      className={`font-display tracking-wide ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  required = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-display tracking-wide block text-sm font-medium text-text-primary mb-1 ${className}`}
    >
      {children}
      {required && <span className="text-danger-500 ml-1">*</span>}
    </label>
  );
};

export const Link: React.FC<LinkProps> = ({
  children,
  href,
  className = "",
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-display text-primary hover:text-secondary underline transition tracking-wide ${className}`}
    >
      {children}
    </a>
  );
};
