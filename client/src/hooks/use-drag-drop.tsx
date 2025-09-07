import { useDrag, useDrop } from "react-dnd";
import { useCallback } from "react";

interface DragItem {
  type: string;
  componentName?: string;
  index?: number;
}

export function useComponentDrag(componentName: string) {
  const [{ isDragging }, drag] = useDrag({
    type: "COMPONENT",
    item: { type: "COMPONENT", componentName },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return { isDragging, drag };
}

export function useComponentDrop(
  onDrop: (componentName: string, position?: number) => void,
  position?: number
) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "COMPONENT",
    drop: (item: DragItem) => {
      if (item.componentName) {
        onDrop(item.componentName, position);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return { isOver, canDrop, drop };
}

export function useComponentReorder(
  componentName: string,
  index: number,
  onMove: (dragIndex: number, hoverIndex: number) => void
) {
  const [{ isDragging }, drag] = useDrag({
    type: "REORDER",
    item: { type: "REORDER", componentName, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: "REORDER",
    hover: (item: DragItem & { index: number }) => {
      if (!item.index && item.index !== 0) return;
      if (item.index === index) return;
      
      onMove(item.index, index);
      item.index = index;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return { isDragging, isOver, drag, drop };
}
