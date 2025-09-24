import React from "react";
import { Button } from "./Button";

type Props = {
  onClick: (value: string) => void;
  children: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export const UtilityButton: React.FC<Props> = ({ onClick, ...props }) => {
  return (
    <Button
      className="bg-[#5c5c5c]"
      onClick={() => onClick(props.children)}
      {...props}
    />
  );
};
