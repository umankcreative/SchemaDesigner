import { useState, useCallback } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Layers, Upload, Download, Undo, Redo, Eye, Code, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ComponentLibrary from "@/components/schema-editor/component-library";
import VisualEditor from "@/components/schema-editor/visual-editor";
import PropertiesPanel from "@/components/schema-editor/properties-panel";
import ImportModal from "@/components/schema-editor/import-modal";
import { useSchemaEditor } from "@/hooks/use-schema-editor";
import { apiRequest } from "@/lib/queryClient";
import type { Schema, LandingPageSchemaType } from "@shared/schema";

export default function SchemaEditor() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<"visual" | "code">("visual");
  const [showImportModal, setShowImportModal] = useState(false);
  
  const {
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
  } = useSchemaEditor(id);

  // Query for existing schema if ID is provided
  const { data: existingSchema, isLoading } = useQuery({
    queryKey: ["/api/schemas", id],
    enabled: !!id,
  });

  // Create schema mutation
  const createSchemaMutation = useMutation({
    mutationFn: async (data: { name: string; content: LandingPageSchemaType }) => {
      const response = await apiRequest("POST", "/api/schemas", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Schema created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/schemas"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create schema",
        variant: "destructive",
      });
    },
  });

  // Update schema mutation
  const updateSchemaMutation = useMutation({
    mutationFn: async (data: { name?: string; content?: LandingPageSchemaType }) => {
      if (!id) throw new Error("No schema ID");
      const response = await apiRequest("PATCH", `/api/schemas/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Schema saved successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/schemas", id] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save schema",
        variant: "destructive",
      });
    },
  });

  // Export schema
  const handleExport = useCallback(async () => {
    if (!id) {
      // Export current schema as JSON
      const dataStr = JSON.stringify(schema, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = `schema-${Date.now()}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Success",
        description: "Schema exported successfully",
      });
      return;
    }

    try {
      const response = await fetch(`/api/schemas/${id}/export`);
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `schema-${id}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "Schema exported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export schema",
        variant: "destructive",
      });
    }
  }, [id, schema, toast]);

  // Save changes
  const handleSave = useCallback(async () => {
    const schemaData = {
      name: (existingSchema as any)?.name || `Schema - ${new Date().toLocaleDateString()}`,
      content: schema
    };

    if (id) {
      updateSchemaMutation.mutate(schemaData);
    } else {
      createSchemaMutation.mutate(schemaData);
    }
  }, [id, schema, existingSchema, createSchemaMutation, updateSchemaMutation]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading schema...</p>
        </div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Layers className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Schema Editor</h1>
                <p className="text-xs text-muted-foreground">Visual Landing Page Builder</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowImportModal(true)}
              data-testid="button-import"
            >
              <Upload className="w-4 h-4 mr-2" />
              Import Schema
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={handleExport}
              data-testid="button-export"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={undo}
                disabled={!canUndo}
                data-testid="button-undo"
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={redo}
                disabled={!canRedo}
                data-testid="button-redo"
              >
                <Redo className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center border border-border rounded-md">
              <Button
                variant={viewMode === "visual" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("visual")}
                data-testid="button-visual-mode"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "code" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("code")}
                data-testid="button-code-mode"
              >
                <Code className="w-4 h-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              disabled={createSchemaMutation.isPending || updateSchemaMutation.isPending}
              data-testid="button-save"
            >
              {createSchemaMutation.isPending || updateSchemaMutation.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Component Library */}
          <ComponentLibrary
            onAddComponent={addComponent}
            data-testid="component-library"
          />

          {/* Visual Editor */}
          <VisualEditor
            schema={schema}
            selectedComponent={selectedComponent}
            viewMode={viewMode}
            onSelectComponent={setSelectedComponent}
            onAddComponent={addComponent}
            onRemoveComponent={removeComponent}
            onMoveComponent={moveComponent}
            data-testid="visual-editor"
          />

          {/* Properties Panel */}
          <PropertiesPanel
            schema={schema}
            selectedComponent={selectedComponent}
            onUpdateComponent={updateComponent}
            onUpdateGlobalTheme={updateGlobalTheme}
            onRemoveComponent={removeComponent}
            onMoveComponent={moveComponent}
            data-testid="properties-panel"
          />
        </div>

        {/* Import Modal */}
        <ImportModal
          open={showImportModal}
          onOpenChange={setShowImportModal}
          onImport={(importedSchema) => {
            setSchema(importedSchema);
            toast({
              title: "Success",
              description: "Schema imported successfully",
            });
          }}
          data-testid="import-modal"
        />
      </div>
    </DndProvider>
  );
}
