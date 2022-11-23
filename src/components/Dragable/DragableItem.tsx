import React, { useState } from "react";

interface DragableItemType {
  children: React.ReactNode;
}

const DragableItem: React.FC<DragableItemType> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);

  function handleDragStart() {
    setIsDragging(true);
  }

  function handleDragEnd() {
    setIsDragging(false);
  }

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`draggable-item ${isDragging ? "dragging" : ""}`}
    >
      {children}
    </div>
  );
};

export default DragableItem;
