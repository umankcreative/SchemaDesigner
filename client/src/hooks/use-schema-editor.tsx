import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { LandingPageSchemaType, GlobalTheme, ComponentType } from "@shared/schema";

interface SchemaHistory {
  schema: LandingPageSchemaType;
  timestamp: number;
}

export function useSchemaEditor(schemaId?: string) {
  // Default schema structure
  const defaultSchema: LandingPageSchemaType = {
    globalTheme: {
      colors: {
        primary: "58 134 255",
        secondary: "255 190 11",
        background: "243 244 246",
        surface: "131 56 236",
        "text-base": "17 24 39",
        "text-muted": "55 65 81"
      },
      fonts: {
        heading: "'Lora', sans-serif",
        body: "'Lexend', sans-serif"
      }
    },
    components: {}
  };

  const [schema, setSchemaState] = useState<LandingPageSchemaType>(defaultSchema);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [history, setHistory] = useState<SchemaHistory[]>([{ schema: defaultSchema, timestamp: Date.now() }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Load existing schema if ID is provided
  const { data: existingSchema } = useQuery({
    queryKey: ["/api/schemas", schemaId],
    enabled: !!schemaId,
  });

  useEffect(() => {
    if ((existingSchema as any)?.content) {
      setSchemaState((existingSchema as any).content);
      setHistory([{ schema: (existingSchema as any).content, timestamp: Date.now() }]);
      setHistoryIndex(0);
    }
  }, [existingSchema]);

  const addToHistory = useCallback((newSchema: LandingPageSchemaType) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ schema: newSchema, timestamp: Date.now() });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const setSchema = useCallback((newSchema: LandingPageSchemaType) => {
    setSchemaState(newSchema);
    addToHistory(newSchema);
  }, [addToHistory]);

  const updateGlobalTheme = useCallback((theme: GlobalTheme) => {
    const newSchema = { ...schema, globalTheme: theme };
    setSchema(newSchema);
  }, [schema, setSchema]);

  const addComponent = useCallback((componentName: string, position?: number) => {
    const componentOrder = Object.keys(schema.components);
    const insertPosition = position !== undefined ? position : componentOrder.length;
    
    // Default component content based on component name
    const getDefaultContent = (name: string) => {
      switch (name) {
        case 'navigation':
          return {
            logoUrl: "https://placehold.co/140x40/111827/ffffff?text=Logo",
            navLinks: [
              { text: "Home", link: "#" },
              { text: "About", link: "#about" },
              { text: "Contact", link: "#contact" }
            ],
            ctaButton: { text: "Get Started", link: "#cta" }
          };
        case 'hero':
          return {
            headline: "Your Amazing Headline Here",
            subheadline: "A compelling subheadline that explains your value proposition.",
            ctaButton: { text: "Get Started", link: "#cta" },
            visual: {
              type: "image",
              imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600",
              altText: "Hero image"
            }
          };
        case 'features':
          return {
            title: "Amazing Features",
            subtitle: "Discover what makes us different",
            featureList: [
              { icon: "⚡", title: "Fast", description: "Lightning fast performance" },
              { icon: "🔒", title: "Secure", description: "Bank-level security" },
              { icon: "🎯", title: "Accurate", description: "Precise results every time" }
            ]
          };
        default:
          return {};
      }
    };

    const newComponent: ComponentType = {
      content: getDefaultContent(componentName) as any,
      theme: {}
    };

    const newComponents = { ...schema.components };
    const newOrder = [...componentOrder];
    
    // Insert at specific position
    newOrder.splice(insertPosition, 0, componentName);
    
    // Rebuild components object in new order
    const orderedComponents: typeof newComponents = {};
    newOrder.forEach(name => {
      if (name === componentName) {
        orderedComponents[componentName] = newComponent;
      } else {
        orderedComponents[name] = newComponents[name];
      }
    });

    setSchema({ ...schema, components: orderedComponents });
  }, [schema, setSchema]);

  const removeComponent = useCallback((componentName: string) => {
    const newComponents = { ...schema.components };
    delete newComponents[componentName];
    
    if (selectedComponent === componentName) {
      setSelectedComponent(null);
    }
    
    setSchema({ ...schema, components: newComponents });
  }, [schema, selectedComponent, setSchema]);

  const moveComponent = useCallback((componentName: string, direction: 'up' | 'down') => {
    const componentOrder = Object.keys(schema.components);
    const currentIndex = componentOrder.indexOf(componentName);
    
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= componentOrder.length) return;
    
    // Swap positions
    [componentOrder[currentIndex], componentOrder[newIndex]] = [componentOrder[newIndex], componentOrder[currentIndex]];
    
    // Rebuild components object in new order
    const orderedComponents: typeof schema.components = {};
    componentOrder.forEach(name => {
      orderedComponents[name] = schema.components[name];
    });

    setSchema({ ...schema, components: orderedComponents });
  }, [schema, setSchema]);

  const updateComponent = useCallback((componentName: string, updates: Partial<ComponentType>) => {
    const newComponents = { ...schema.components };
    newComponents[componentName] = { ...newComponents[componentName], ...updates };
    setSchema({ ...schema, components: newComponents });
  }, [schema, setSchema]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setSchemaState(history[newIndex].schema);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setSchemaState(history[newIndex].schema);
      setHistoryIndex(newIndex);
    }
  }, [history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    schema,
    selectedComponent,
    history,
    historyIndex,
    setSchema,
    setSelectedComponent,
    addComponent,
    removeComponent,
    moveComponent,
    updateComponent,
    updateGlobalTheme,
    undo,
    redo,
    canUndo,
    canRedo
  };
}
