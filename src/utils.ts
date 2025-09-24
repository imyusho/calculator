export const MAX_WIDTH = 430;

export const getFontSize = (scale: number) => {
  return `calc(min(100vw, ${MAX_WIDTH}px) * ${scale})`;
};

export const isOperator = (value: string) => {
  return !!["+", "-", "×", "÷"].find((x) => x === value);
};

const isNumber = (value: string) => {
  return /^[0-9]$/.test(value);
};

export const withThousandSeparators = (input: string) => {
  return input.replace(/\d+(\.\d+)?/g, (num) => {
    const [integerPart, decimalPart] = num.split(".");
    const formattedInteger = Number(integerPart).toLocaleString();
    return decimalPart
      ? `${formattedInteger}.${decimalPart}`
      : formattedInteger;
  });
};

export const getResult = (input: string) => {
  let expr = input;

  while (!isNumber(expr[expr.length - 1]) && expr) {
    expr = expr.slice(0, -1);
  }

  expr = expr.replaceAll("×", "*").replaceAll("÷", "/");

  try {
    const result = Function(`"use strict"; return (${expr})`)();
    return withThousandSeparators(String(result));
  } catch {
    return ERROR_MESSAGE;
  }
};

export const ERROR_MESSAGE = "Error";
