import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Check, X, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LandingPageSchema, type LandingPageSchemaType } from "@shared/schema";

interface ImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (schema: LandingPageSchemaType) => void;
}

export default function ImportModal({ open, onOpenChange, onImport }: ImportModalProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setValidationError(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const jsonFile = files.find(file => file.type === 'application/json' || file.name.endsWith('.json'));
    
    if (jsonFile) {
      handleFileSelect(jsonFile);
    } else {
      toast({
        title: "Invalid File",
        description: "Please select a valid JSON file",
        variant: "destructive",
      });
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const validateAndImportFile = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setValidationError(null);

    try {
      const text = await selectedFile.text();
      const parsedData = JSON.parse(text);
      
      // Validate against schema
      const validatedSchema = LandingPageSchema.parse(parsedData);
      
      onImport(validatedSchema);
      onOpenChange(false);
      setSelectedFile(null);
      
      toast({
        title: "Success",
        description: "Schema imported successfully",
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        setValidationError(`Schema validation failed: ${error.errors.map((e: any) => e.message).join(', ')}`);
      } else if (error instanceof SyntaxError) {
        setValidationError("Invalid JSON format");
      } else {
        setValidationError("Failed to import schema");
      }
      
      toast({
        title: "Import Failed",
        description: "Please check the file format and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedFile(null);
    setValidationError(null);
    setDragOver(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Schema</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-primary bg-primary/5' : 'border-border'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop your schema.json file here
            </p>
            <p className="text-xs text-muted-foreground mb-4">or</p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              data-testid="button-browse-files"
            >
              Browse Files
            </Button>
            <Input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileInputChange}
              className="hidden"
              data-testid="input-file-upload"
            />
          </div>

          {/* Selected File */}
          {selectedFile && (
            <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedFile(null)}
                data-testid="button-remove-file"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Validation Error */}
          {validationError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{validationError}</p>
            </div>
          )}

          {/* File Requirements */}
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center space-x-2 mb-1">
              <Check className="w-3 h-3 text-green-600" />
              <span>Supports .json files</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-3 h-3 text-green-600" />
              <span>Validates schema structure</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleClose} data-testid="button-cancel">
              Cancel
            </Button>
            <Button
              onClick={validateAndImportFile}
              disabled={!selectedFile || isLoading}
              data-testid="button-import"
            >
              {isLoading ? "Importing..." : "Import"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
