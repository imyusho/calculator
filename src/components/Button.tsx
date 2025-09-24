import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({ className, ...props }) => {
  const baseClass =
    "aspect-square rounded-full flex items-center justify-center active:scale-110 transition transform";

  return <button className={`${baseClass} ${className}`} {...props} />;
};
