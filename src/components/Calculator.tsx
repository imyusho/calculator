import { useState, type FC } from "react";
import { flushSync } from "react-dom";
import { useElementWidth } from "../hooks";
import {
  getFontSize,
  getResult,
  isOperator,
  MAX_WIDTH,
  withThousandSeparators,
} from "../utils";
import {
  AdaptiveFontSize,
  type AdaptiveFontSizeProps,
} from "./AdaptiveFontSize";
import { NumberButton } from "./NumberButton";
import { OperationButton } from "./OperationButton";
import { UtilityButton } from "./UtilityButton";

export const Calculator: FC = () => {
  const [input, setInput] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [hasTransition, setHasTransition] = useState(false);

  const result = getResult(input);

  const { containerRef, width = MAX_WIDTH } = useElementWidth();

  const resetIfFinished = (defaultValue: string = "") => {
    if (isFinished) {
      setIsFinished(false);
      setInput(defaultValue);
    }
  };

  const onNumber = (number: string) => {
    setHasTransition(false);
    resetIfFinished();

    setInput((x) => x + number);
  };

  const onOperator = (operator: string) => {
    setHasTransition(false);
    resetIfFinished(result);

    setInput((x) => {
      if (x === "" || x === "-") {
        return operator === "-" ? operator : `0${operator}`;
      }

      if (x === "" || x === "-") {
        return operator === "-" ? operator : `0${operator}`;
      }

      const lastDigit = x[x.length - 1];
      if (isOperator(lastDigit)) {
        return `${x.slice(0, -1)}${operator}`;
      }

      return x + operator;
    });
  };

  const primaryInputProps: AdaptiveFontSizeProps = {
    className: `break-words leading-[1.2] font-light ${
      hasTransition ? "transition-all" : ""
    }`,
    maxFontSize: width * 0.2,
    minFontSize: width * 0.1,
  };

  const secondaryInputProps: AdaptiveFontSizeProps = {
    className: `break-words leading-[1.2] text-gray-400 ${
      hasTransition ? "transition-all" : ""
    }`,
    maxFontSize: width * 0.1,
    minFontSize: width * 0.05,
  };

  return (
    <div
      ref={containerRef}
      style={{
        maxWidth: MAX_WIDTH,
        fontSize: getFontSize(0.085),
      }}
      className="h-full mx-auto"
    >
      <div className="h-full flex flex-col text-[#fefefe] pb-12 font-extralight">
        <div className="flex-1 flex flex-col text-right p-4">
          <div className="flex-1" />
          <div className="">
            <AdaptiveFontSize
              {...(!isFinished ? primaryInputProps : secondaryInputProps)}
            >
              {withThousandSeparators(input) || "0"}
            </AdaptiveFontSize>
            {input && (
              <AdaptiveFontSize
                {...(isFinished ? primaryInputProps : secondaryInputProps)}
              >
                {result || "0"}
              </AdaptiveFontSize>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 pb-3 px-4">
          <UtilityButton
            onClick={() => {
              setHasTransition(false);
              resetIfFinished();

              setInput("");
            }}
          >
            AC
          </UtilityButton>
          <UtilityButton
            onClick={() => {
              setHasTransition(false);
              resetIfFinished();

              setInput((s) => s.slice(0, -1));
            }}
          >
            ⌫
          </UtilityButton>
          <UtilityButton
            onClick={() => {
              setHasTransition(false);
              resetIfFinished();

              const { 0: value, index } = input.match(/\d*\.?\d*$/) ?? {};
              if (value == undefined) return;

              setInput(input.slice(0, index) + Number(value) / 100);
            }}
          >
            %
          </UtilityButton>
          <OperationButton onClick={onOperator}>÷</OperationButton>

          <NumberButton onClick={onNumber}>7</NumberButton>
          <NumberButton onClick={onNumber}>8</NumberButton>
          <NumberButton onClick={onNumber}>9</NumberButton>
          <OperationButton onClick={onOperator}>×</OperationButton>

          <NumberButton onClick={onNumber}>4</NumberButton>
          <NumberButton onClick={onNumber}>5</NumberButton>
          <NumberButton onClick={onNumber}>6</NumberButton>
          <OperationButton onClick={onOperator}>-</OperationButton>

          <NumberButton onClick={onNumber}>1</NumberButton>
          <NumberButton onClick={onNumber}>2</NumberButton>
          <NumberButton onClick={onNumber}>3</NumberButton>
          <OperationButton onClick={onOperator}>+</OperationButton>

          <UtilityButton onClick={() => {}}>+/-</UtilityButton>
          <NumberButton onClick={onNumber}>0</NumberButton>
          <NumberButton onClick={onNumber}>.</NumberButton>
          <OperationButton
            onClick={() => {
              flushSync(() => setHasTransition(true));
              setIsFinished(true);
            }}
          >
            =
          </OperationButton>
        </div>
      </div>
    </div>
  );
};
