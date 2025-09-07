import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useComponentDrag } from "@/hooks/use-drag-drop";

interface ComponentItem {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  color: string;
}

const COMPONENT_CATEGORIES = {
  navigation: [
    {
      name: "navigation",
      displayName: "Navigation",
      description: "Header navigation bar",
      icon: "fa-bars",
      color: "text-primary bg-primary/20"
    }
  ],
  content: [
    {
      name: "hero",
      displayName: "Hero",
      description: "Main hero section",
      icon: "fa-star",
      color: "text-green-600 bg-green-500/20"
    },
    {
      name: "features",
      displayName: "Features",
      description: "Feature showcase grid",
      icon: "fa-th-large",
      color: "text-blue-600 bg-blue-500/20"
    },
    {
      name: "howItWorks",
      displayName: "How It Works",
      description: "Step-by-step process",
      icon: "fa-list-ol",
      color: "text-purple-600 bg-purple-500/20"
    },
    {
      name: "socialProof",
      displayName: "Social Proof",
      description: "Client logos & testimonials",
      icon: "fa-award",
      color: "text-orange-600 bg-orange-500/20"
    },
    {
      name: "productShowcase",
      displayName: "Product Showcase",
      description: "Product feature displays",
      icon: "fa-desktop",
      color: "text-teal-600 bg-teal-500/20"
    },
    {
      name: "horizontalScroll",
      displayName: "Horizontal Scroll",
      description: "Scrollable card sections",
      icon: "fa-arrows-alt-h",
      color: "text-indigo-600 bg-indigo-500/20"
    },
    {
      name: "about",
      displayName: "About",
      description: "About us section",
      icon: "fa-info-circle",
      color: "text-cyan-600 bg-cyan-500/20"
    },
    {
      name: "problemSolution",
      displayName: "Problem Solution",
      description: "Problem and solution cards",
      icon: "fa-lightbulb",
      color: "text-yellow-600 bg-yellow-500/20"
    },
    {
      name: "comparison",
      displayName: "Comparison",
      description: "Feature comparison table",
      icon: "fa-table",
      color: "text-pink-600 bg-pink-500/20"
    },
    {
      name: "testimonials",
      displayName: "Testimonials",
      description: "Customer testimonials",
      icon: "fa-quote-left",
      color: "text-rose-600 bg-rose-500/20"
    },
    {
      name: "pricing",
      displayName: "Pricing",
      description: "Pricing plans section",
      icon: "fa-dollar-sign",
      color: "text-emerald-600 bg-emerald-500/20"
    },
    {
      name: "faq",
      displayName: "FAQ",
      description: "Frequently asked questions",
      icon: "fa-question-circle",
      color: "text-violet-600 bg-violet-500/20"
    },
    {
      name: "resources",
      displayName: "Resources",
      description: "Blog posts and resources",
      icon: "fa-book",
      color: "text-slate-600 bg-slate-500/20"
    },
    {
      name: "integrations",
      displayName: "Integrations",
      description: "Integration logos",
      icon: "fa-plug",
      color: "text-zinc-600 bg-zinc-500/20"
    },
    {
      name: "awards",
      displayName: "Awards",
      description: "Awards and recognition",
      icon: "fa-trophy",
      color: "text-amber-600 bg-amber-500/20"
    },
    {
      name: "newsletter",
      displayName: "Newsletter",
      description: "Newsletter signup",
      icon: "fa-envelope",
      color: "text-sky-600 bg-sky-500/20"
    },
    {
      name: "ctaBanner",
      displayName: "CTA Banner",
      description: "Call to action banner",
      icon: "fa-bullhorn",
      color: "text-red-600 bg-red-500/20"
    },
    {
      name: "ctaRepeated",
      displayName: "CTA Repeated",
      description: "Secondary call to action",
      icon: "fa-redo",
      color: "text-orange-600 bg-orange-500/20"
    }
  ],
  footer: [
    {
      name: "footer",
      displayName: "Footer",
      description: "Site footer section",
      icon: "fa-ellipsis-h",
      color: "text-gray-600 bg-gray-500/20"
    }
  ]
};

interface ComponentLibraryProps {
  onAddComponent: (componentName: string) => void;
}

function DraggableComponentItem({ component, onAddComponent }: { 
  component: ComponentItem; 
  onAddComponent: (componentName: string) => void; 
}) {
  const { isDragging, drag } = useComponentDrag(component.name);

  return (
    <div
      ref={drag}
      className={`component-item bg-accent rounded-md p-3 cursor-grab ${isDragging ? 'dragging' : ''}`}
      onClick={() => onAddComponent(component.name)}
      data-testid={`component-item-${component.name}`}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 rounded flex items-center justify-center ${component.color}`}>
          <i className={`fas ${component.icon} text-sm`}></i>
        </div>
        <div>
          <div className="text-sm font-medium">{component.displayName}</div>
          <div className="text-xs text-muted-foreground">{component.description}</div>
        </div>
      </div>
    </div>
  );
}

export default function ComponentLibrary({ onAddComponent }: ComponentLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredComponents = Object.entries(COMPONENT_CATEGORIES).reduce((acc, [category, components]) => {
    const filtered = components.filter(component =>
      component.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    
    return acc;
  }, {} as Record<string, ComponentItem[]>);

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-sm mb-3">Component Library</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-component-search"
          />
        </div>
      </div>

      {/* Component Categories */}
      <div className="flex-1 overflow-y-auto p-4">
        {Object.entries(filteredComponents).map(([categoryKey, components]) => {
          const categoryNames = {
            navigation: "Navigation",
            content: "Content",
            footer: "Footer"
          };
          
          return (
            <div key={categoryKey} className="mb-6">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                {categoryNames[categoryKey as keyof typeof categoryNames]}
              </h3>
              <div className="space-y-2">
                {components.map((component) => (
                  <DraggableComponentItem
                    key={component.name}
                    component={component}
                    onAddComponent={onAddComponent}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {Object.keys(filteredComponents).length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <i className="fas fa-search text-2xl mb-2"></i>
            <p className="text-sm">No components found</p>
          </div>
        )}
      </div>
    </div>
  );
}
