import { useState } from "react";
import { Button } from "./components/Button";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const onPress = (val: string) => setInput((s) => s + val);

  return (
    <div className="h-dvh flex flex-col bg-black text-white p-4">
      <div className="flex-1 flex flex-col text-right p-4">
        <div className="flex-1" />
        <div className="text-gray-400 text-5xl break-words">
          {input.replaceAll("*", "×").replaceAll("/", "÷")}
        </div>
        <div className="text-8xl font-light">{result || "0"}</div>
      </div>

      <div className="grid grid-cols-4 gap-3 p-3">
        <Button
          category="utility"
          onClick={() => {
            setInput("");
            setResult("");
          }}
        >
          AC
        </Button>
        <Button
          category="utility"
          onClick={() => setInput((s) => s.slice(0, -1))}
        >
          ⌫
        </Button>
        <Button category="utility" onClick={() => onPress("%")}>
          %
        </Button>
        <Button category="operation" onClick={() => onPress("/")}>
          ÷
        </Button>

        <Button category="number" onClick={() => onPress("7")}>
          7
        </Button>
        <Button category="number" onClick={() => onPress("8")}>
          8
        </Button>
        <Button category="number" onClick={() => onPress("9")}>
          9
        </Button>
        <Button category="operation" onClick={() => onPress("*")}>
          ×
        </Button>

        <Button category="number" onClick={() => onPress("4")}>
          4
        </Button>
        <Button category="number" onClick={() => onPress("5")}>
          5
        </Button>
        <Button category="number" onClick={() => onPress("6")}>
          6
        </Button>
        <Button category="operation" onClick={() => onPress("-")}>
          -
        </Button>

        <Button category="number" onClick={() => onPress("1")}>
          1
        </Button>
        <Button category="number" onClick={() => onPress("2")}>
          2
        </Button>
        <Button category="number" onClick={() => onPress("3")}>
          3
        </Button>
        <Button category="operation" onClick={() => onPress("+")}>
          +
        </Button>

        <Button
          category="utility"
          onClick={() => {
            if (result) {
              setResult(String(-parseFloat(result)));
            } else if (input) {
              setInput(input.startsWith("-") ? input.slice(1) : "-" + input);
            }
          }}
        >
          +/-
        </Button>
        <Button category="number" onClick={() => onPress("0")}>
          0
        </Button>
        <Button category="number" onClick={() => onPress(".")}>
          .
        </Button>
        <Button
          category="operation"
          onClick={() => {
            try {
              if (!/^[0-9+\-*/().\s]+$/.test(input)) {
                setResult("Error");
                return;
              }
              const value = Function(`return ${input}`)();
              setResult(String(value));
            } catch {
              setResult("Error");
            }
          }}
        >
          =
        </Button>
      </div>
    </div>
  );
}
