import { useEffect, useRef, useState } from "react";

export const useElementWidth = () => {
  const [width, setWidth] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const resizeObserver = new ResizeObserver(() => {
      setWidth(container.offsetWidth);
    });
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return { containerRef, width };
};
