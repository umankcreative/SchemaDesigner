import { useState } from "react";
import { ChevronDown, ChevronUp, ArrowUp, ArrowDown, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { LandingPageSchemaType, GlobalTheme, ComponentType } from "@shared/schema";

interface PropertiesPanelProps {
  schema: LandingPageSchemaType;
  selectedComponent: string | null;
  onUpdateComponent: (componentName: string, updates: Partial<ComponentType>) => void;
  onUpdateGlobalTheme: (theme: GlobalTheme) => void;
  onRemoveComponent: (componentName: string) => void;
  onMoveComponent: (componentName: string, direction: 'up' | 'down') => void;
}

export default function PropertiesPanel({
  schema,
  selectedComponent,
  onUpdateComponent,
  onUpdateGlobalTheme,
  onRemoveComponent,
  onMoveComponent,
}: PropertiesPanelProps) {
  const [openSections, setOpenSections] = useState({
    globalTheme: true,
    selectedComponent: true,
    componentManagement: false,
  });

  const componentOrder = Object.keys(schema.components);
  const selectedComponentData = selectedComponent ? schema.components[selectedComponent] : null;

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateGlobalThemeColor = (colorKey: string, value: string) => {
    onUpdateGlobalTheme({
      ...schema.globalTheme,
      colors: { ...schema.globalTheme.colors, [colorKey]: value }
    });
  };

  const updateGlobalThemeFont = (fontKey: string, value: string) => {
    onUpdateGlobalTheme({
      ...schema.globalTheme,
      fonts: { ...schema.globalTheme.fonts, [fontKey]: value }
    });
  };

  const updateComponentContent = (contentKey: string, value: any) => {
    if (!selectedComponent || !selectedComponentData) return;
    
    onUpdateComponent(selectedComponent, {
      content: { ...selectedComponentData.content, [contentKey]: value }
    });
  };

  const renderComponentEditor = () => {
    if (!selectedComponent || !selectedComponentData) {
      return (
        <div className="p-4 text-center text-muted-foreground">
          <p className="text-sm">Select a component to edit its properties</p>
        </div>
      );
    }

    const content = selectedComponentData.content as any;

    // Basic content editors for different component types
    switch (selectedComponent) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Headline</Label>
              <Textarea
                value={content.headline || ''}
                onChange={(e) => updateComponentContent('headline', e.target.value)}
                className="mt-1 text-sm"
                rows={3}
                data-testid="input-hero-headline"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Subheadline</Label>
              <Textarea
                value={content.subheadline || ''}
                onChange={(e) => updateComponentContent('subheadline', e.target.value)}
                className="mt-1 text-sm"
                rows={3}
                data-testid="input-hero-subheadline"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">CTA Button Text</Label>
              <Input
                value={content.ctaButton?.text || ''}
                onChange={(e) => updateComponentContent('ctaButton', {
                  ...content.ctaButton,
                  text: e.target.value
                })}
                className="mt-1 text-sm"
                data-testid="input-hero-cta-text"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">CTA Button Link</Label>
              <Input
                value={content.ctaButton?.link || ''}
                onChange={(e) => updateComponentContent('ctaButton', {
                  ...content.ctaButton,
                  link: e.target.value
                })}
                className="mt-1 text-sm"
                data-testid="input-hero-cta-link"
              />
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Title</Label>
              <Input
                value={content.title || ''}
                onChange={(e) => updateComponentContent('title', e.target.value)}
                className="mt-1 text-sm"
                data-testid="input-features-title"
              />
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Subtitle</Label>
              <Textarea
                value={content.subtitle || ''}
                onChange={(e) => updateComponentContent('subtitle', e.target.value)}
                className="mt-1 text-sm"
                rows={2}
                data-testid="input-features-subtitle"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>Basic editor for {selectedComponent}</p>
              <pre className="mt-2 p-2 bg-muted rounded text-xs overflow-auto">
                {JSON.stringify(content, null, 2)}
              </pre>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-96 bg-card border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-sm mb-1">Properties Panel</h2>
        <p className="text-xs text-muted-foreground">Edit component content and styling</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Global Theme Section */}
        <Collapsible open={openSections.globalTheme} onOpenChange={() => toggleSection('globalTheme')}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between py-3 px-4 h-auto font-semibold border-b border-border"
              data-testid="toggle-global-theme"
            >
              <span className="text-sm">Global Theme</span>
              {openSections.globalTheme ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 bg-accent/50">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(schema.globalTheme.colors).map(([key, value]) => (
                  <div key={key}>
                    <Label className="block text-xs font-medium text-muted-foreground mb-1 capitalize">
                      {key.replace('-', ' ')}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded border border-border"
                        style={{ backgroundColor: `rgb(${value})` }}
                      />
                      <Input
                        value={value}
                        onChange={(e) => updateGlobalThemeColor(key, e.target.value)}
                        className="flex-1 text-xs"
                        placeholder="R G B"
                        data-testid={`input-color-${key}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                {Object.entries(schema.globalTheme.fonts).map(([key, value]) => (
                  <div key={key}>
                    <Label className="block text-xs font-medium text-muted-foreground mb-1 capitalize">
                      {key} Font
                    </Label>
                    <Select
                      value={value}
                      onValueChange={(newValue) => updateGlobalThemeFont(key, newValue)}
                    >
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="'Lora', serif">Lora</SelectItem>
                        <SelectItem value="'Lexend', sans-serif">Lexend</SelectItem>
                        <SelectItem value="'Inter', sans-serif">Inter</SelectItem>
                        <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                        <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Selected Component Section */}
        <Collapsible open={openSections.selectedComponent} onOpenChange={() => toggleSection('selectedComponent')}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between py-3 px-4 h-auto font-semibold border-b border-border"
              data-testid="toggle-selected-component"
            >
              <span className="text-sm">
                {selectedComponent ? `${selectedComponent} Content` : 'No Component Selected'}
              </span>
              {openSections.selectedComponent ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4">
            {renderComponentEditor()}
          </CollapsibleContent>
        </Collapsible>

        {/* Component Management Section */}
        <Collapsible open={openSections.componentManagement} onOpenChange={() => toggleSection('componentManagement')}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between py-3 px-4 h-auto font-semibold border-b border-border"
              data-testid="toggle-component-management"
            >
              <span className="text-sm">Component Management</span>
              {openSections.componentManagement ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 bg-accent/50">
            <div className="space-y-2">
              {componentOrder.map((componentName, index) => (
                <div
                  key={componentName}
                  className="flex items-center justify-between p-2 bg-background rounded border border-border"
                >
                  <span className="text-sm font-medium capitalize">{componentName}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveComponent(componentName, 'up')}
                      disabled={index === 0}
                      title="Move Up"
                      data-testid={`button-mgmt-move-up-${componentName}`}
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onMoveComponent(componentName, 'down')}
                      disabled={index === componentOrder.length - 1}
                      title="Move Down"
                      data-testid={`button-mgmt-move-down-${componentName}`}
                    >
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Remove ${componentName} component?`)) {
                          onRemoveComponent(componentName);
                        }
                      }}
                      title="Remove"
                      className="text-destructive hover:bg-destructive/10"
                      data-testid={`button-mgmt-remove-${componentName}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {componentOrder.length === 0 && (
                <div className="text-center text-muted-foreground py-4">
                  <p className="text-sm">No components added yet</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
