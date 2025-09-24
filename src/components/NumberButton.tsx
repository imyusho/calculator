import React from "react";
import { Button } from "./Button";

type Props = {
  onClick: (value: string) => void;
  children: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export const NumberButton: React.FC<Props> = ({ onClick, ...props }) => {
  return (
    <Button
      className="bg-[#303030]"
      onClick={() => onClick(props.children)}
      {...props}
    />
  );
};
