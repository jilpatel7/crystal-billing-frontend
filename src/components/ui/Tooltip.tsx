import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface TooltipProps {
  targetRef: React.RefObject<HTMLElement>;
  content: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ targetRef, content }) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.right + 8 + window.scrollX, // Add spacing to right
      });
    }
  }, [targetRef]);

  return ReactDOM.createPortal(
    <div
      className="fixed z-50 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-md whitespace-nowrap"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {content}
    </div>,
    document.getElementById("tooltip-root")!
  );
};
