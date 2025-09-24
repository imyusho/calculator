import React from "react";
import { Button } from "./Button";

type Props = {
  onClick: (value: string) => void;
  children: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export const OperationButton: React.FC<Props> = ({
  onClick,
  children,
  ...props
}) => {
  return (
    <Button
      className="bg-[#ff9200] text-[1.3em]"
      onClick={() => onClick(children)}
      {...props}
    >
      <span className="h-fit leading-0 -mt-[8%]">{children}</span>
    </Button>
  );
};
