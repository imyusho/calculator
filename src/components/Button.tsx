import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  category: "operation" | "number" | "utility";
};

export const Button: React.FC<Props> = ({ category, ...props }) => {
  const baseClass =
    "aspect-square rounded-full flex items-center justify-center text-3xl font-light active:scale-105 transition transform";

  let categoryClass = "";
  switch (category) {
    case "operation":
      categoryClass = "bg-orange-500 text-white";
      break;
    case "number":
      categoryClass = "bg-gray-700 text-white";
      break;
    case "utility":
      categoryClass = "bg-gray-400 text-black";
      break;
  }

  return <button className={`${baseClass} ${categoryClass}`} {...props} />;
};
