import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({ className, ...props }) => {
  const baseClass =
    "aspect-square rounded-full flex items-center justify-center active:scale-115 transition transform select-none";

  return <button className={`${baseClass} ${className}`} {...props} />;
};
