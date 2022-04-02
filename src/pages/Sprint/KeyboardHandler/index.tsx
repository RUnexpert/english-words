import React, { useEffect, useRef } from "react";

interface Props {
  onRightClick: () => void;
  onWrongClick: () => void;
}

export const KeyboardHandler: React.FC<Props> = ({onRightClick, onWrongClick}) => {
  const eventKeyboardListenerId = useRef<((event: KeyboardEvent) => void) | null>(null);
  useEffect(() => {
    eventKeyboardListenerId.current = (event: KeyboardEvent) => {
      event.preventDefault();

      if (event.code === "ArrowLeft") {
        onRightClick();
      }
      if (event.code === "ArrowRight") {
        onWrongClick();
      }
    };
    window.addEventListener("keydown", eventKeyboardListenerId.current);
    return () => {
      if (eventKeyboardListenerId.current !== null) {
        window.removeEventListener("keydown", eventKeyboardListenerId.current);
      }
    };
  }, [onRightClick, onWrongClick]);

  return null;
};
