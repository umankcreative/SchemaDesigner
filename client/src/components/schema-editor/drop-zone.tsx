import { Plus } from "lucide-react";
import { useComponentDrop } from "@/hooks/use-drag-drop";

interface DropZoneProps {
  onDrop: (componentName: string) => void;
  position?: number;
  className?: string;
}

export default function DropZone({ onDrop, position, className = "" }: DropZoneProps) {
  const { isOver, canDrop, drop } = useComponentDrop(onDrop, position);

  return (
    <div
      ref={drop}
      className={`drop-zone m-4 flex items-center justify-center text-muted-foreground ${
        isOver && canDrop ? 'drag-over' : ''
      } ${className}`}
      data-testid={`drop-zone-${position || 'default'}`}
    >
      <div className="text-center">
        <Plus className="w-6 h-6 mx-auto mb-2" />
        <p className="text-sm">Drop components here</p>
      </div>
    </div>
  );
}
