import React, { useRef, useState } from "react";

interface DragableContainerType {
  children: React.ReactNode;
  className: string;
}

const DragableContainer: React.FC<DragableContainerType> = ({
  children,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [afterEl, setAfterEl] = useState<Element | null>(null);
  const [currDragEl, setCurrDragEl] = useState<Node | null>(null);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();

    const draggingEl = document.querySelector(".dragging");
    setCurrDragEl(draggingEl);

    const { element: afterElement } = getAfterEl(e.currentTarget, e.clientY);
    afterElement && setAfterEl(afterElement);
  }

  function getAfterEl(
    container: Element,
    y: number
  ): { offset: number; element?: Element } {
    const dragables = container.querySelectorAll(
      ".draggable-item:not(.dragging)"
    );

    if (Array.isArray(Array.from(dragables)) && Array.from(dragables)[0])
      return Array.from(dragables).reduce(
        (acc, node) => {
          const { top, height } = node.getBoundingClientRect();
          const nodeOfset = y - top - height / 2;
          if (nodeOfset < 0 && nodeOfset > acc.offset)
            return { offset: nodeOfset, element: node };
          else return acc;
        },
        {
          offset: Number.NEGATIVE_INFINITY,
        }
      );
    else setAfterEl(null);

    return { offset: Number.NEGATIVE_INFINITY };
  }

  function handleDrop() {
    if (currDragEl && afterEl)
      containerRef.current?.insertBefore(currDragEl, afterEl);
    else if (currDragEl && !afterEl)
      containerRef.current?.appendChild(currDragEl);

    setCurrDragEl(null);
    setAfterEl(null);
  }

  return (
    <div
      ref={containerRef}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`container ${className}`}
    >
      {children}
    </div>
  );
};

export default DragableContainer;
