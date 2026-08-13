import { useState, useRef } from "react";

export interface UseDraggableOptions {
  initialPosition?: { x: number; y: number };
  ignoreTags?: string[];
}

export function useDraggable(options: UseDraggableOptions = {}) {
  const {
    initialPosition = { x: 0, y: 0 },
    ignoreTags = ["BUTTON", "INPUT", "TEXTAREA", "A"],
  } = options;

  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (ignoreTags.includes(target.tagName)) {
      return;
    }
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe catch if pointer capture is lost
      }
    }
  };

  const resetPosition = () => {
    setPosition(initialPosition);
  };

  return {
    position,
    isDragging,
    resetPosition,
    bindProps: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
    },
    style: {
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      cursor: isDragging ? "grabbing" : "grab",
      userSelect: isDragging ? "none" : ("auto" as const),
      touchAction: "none",
      zIndex: isDragging ? 1000 : 10,
    },
  };
}

export default useDraggable;
