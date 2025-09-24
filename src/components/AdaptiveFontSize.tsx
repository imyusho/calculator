import React, { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export type AdaptiveFontSizeProps = {
  maxFontSize: number;
  minFontSize: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const AdaptiveFontSize: React.FC<AdaptiveFontSizeProps> = ({
  maxFontSize,
  minFontSize,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const naturalWidth = getNaturalWidth(container, maxFontSize);
    flushSync(() => {
      const preferefFontSize =
        (maxFontSize * container.offsetWidth) / naturalWidth - 1;

      setFontSize(
        preferefFontSize > maxFontSize
          ? maxFontSize
          : preferefFontSize < minFontSize
          ? minFontSize
          : preferefFontSize
      );
    });
  }, [props.children, maxFontSize, minFontSize]);

  return <div ref={containerRef} style={{ fontSize, ...style }} {...props} />;
};

function getNaturalWidth(element: HTMLElement, fontSize: number) {
  const clone = element.cloneNode(true);

  if (!(clone instanceof HTMLElement)) {
    throw new Error("Clone is not an HTMLElement");
  }

  clone.style.position = "absolute";
  clone.style.visibility = "hidden";
  clone.style.whiteSpace = "nowrap";
  clone.style.width = "auto";
  clone.style.fontSize = `${fontSize}px`;

  document.body.appendChild(clone);
  const width = clone.clientWidth;
  document.body.removeChild(clone);

  return width;
}
