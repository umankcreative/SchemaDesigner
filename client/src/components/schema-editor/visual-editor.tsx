import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Smartphone, Tablet, Monitor, Settings } from "lucide-react";
import DropZone from "./drop-zone";
import ComponentPreview from "./component-preview";
import type { LandingPageSchemaType } from "@shared/schema";

interface VisualEditorProps {
  schema: LandingPageSchemaType;
  selectedComponent: string | null;
  viewMode: "visual" | "code";
  onSelectComponent: (componentName: string | null) => void;
  onAddComponent: (componentName: string, position?: number) => void;
  onRemoveComponent: (componentName: string) => void;
  onMoveComponent: (componentName: string, direction: 'up' | 'down') => void;
}

const DEVICE_SIZES = {
  mobile: { width: '375px', icon: Smartphone },
  tablet: { width: '768px', icon: Tablet },
  desktop: { width: '100%', icon: Monitor },
};

export default function VisualEditor({
  schema,
  selectedComponent,
  viewMode,
  onSelectComponent,
  onAddComponent,
  onRemoveComponent,
  onMoveComponent,
}: VisualEditorProps) {
  const [zoom, setZoom] = useState("100");
  const [device, setDevice] = useState<keyof typeof DEVICE_SIZES>("desktop");

  const componentOrder = Object.keys(schema.components);

  if (viewMode === "code") {
    return (
      <div className="flex-1 flex flex-col bg-muted/50">
        <div className="bg-card border-b border-border px-6 py-3">
          <h3 className="font-medium">Schema JSON</h3>
        </div>
        <div className="flex-1 p-6">
          <pre className="bg-card border border-border rounded-lg p-4 text-sm overflow-auto h-full">
            <code>{JSON.stringify(schema, null, 2)}</code>
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-muted/50">
      {/* Toolbar */}
      <div className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Zoom:</span>
            <Select value={zoom} onValueChange={setZoom}>
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">50%</SelectItem>
                <SelectItem value="75">75%</SelectItem>
                <SelectItem value="100">100%</SelectItem>
                <SelectItem value="125">125%</SelectItem>
                <SelectItem value="150">150%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="h-4 w-px bg-border"></div>
          
          <div className="flex items-center space-x-2">
            {Object.entries(DEVICE_SIZES).map(([key, { icon: Icon }]) => (
              <Button
                key={key}
                variant={device === key ? "default" : "outline"}
                size="sm"
                onClick={() => setDevice(key as keyof typeof DEVICE_SIZES)}
                data-testid={`button-device-${key}`}
              >
                <Icon className="w-4 h-4 mr-1" />
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Button>
            ))}
          </div>
        </div>
        
        <Button variant="outline" size="sm" data-testid="button-global-theme">
          <Settings className="w-4 h-4 mr-1" />
          Global Theme
        </Button>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto p-6">
        <div 
          className="mx-auto bg-card shadow-lg rounded-lg overflow-hidden transition-all duration-300"
          style={{ 
            width: DEVICE_SIZES[device].width,
            transform: `scale(${parseInt(zoom) / 100})`,
            transformOrigin: 'top center'
          }}
        >
          {/* Top Drop Zone */}
          <DropZone 
            onDrop={(componentName) => onAddComponent(componentName, 0)} 
            position={0}
          />

          {/* Render Components */}
          {componentOrder.map((componentName, index) => (
            <div key={`${componentName}-${index}`}>
              <ComponentPreview
                componentName={componentName}
                component={schema.components[componentName]}
                globalTheme={schema.globalTheme}
                isSelected={selectedComponent === componentName}
                onSelect={() => onSelectComponent(componentName)}
                onRemove={() => onRemoveComponent(componentName)}
                onMoveUp={() => onMoveComponent(componentName, 'up')}
                onMoveDown={() => onMoveComponent(componentName, 'down')}
                canMoveUp={index > 0}
                canMoveDown={index < componentOrder.length - 1}
              />
              
              {/* Drop Zone between components */}
              <DropZone 
                onDrop={(componentName) => onAddComponent(componentName, index + 1)} 
                position={index + 1}
              />
            </div>
          ))}

          {/* Bottom Drop Zone if no components */}
          {componentOrder.length === 0 && (
            <div className="p-16 text-center text-muted-foreground">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-lg font-medium mb-2">Start Building Your Landing Page</h3>
              <p className="text-sm">Drag components from the library to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
