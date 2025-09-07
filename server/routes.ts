import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSchemaSchema, LandingPageSchema } from "@shared/schema";
import multer from "multer";

const upload = multer({ dest: 'uploads/' });

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all schemas
  app.get("/api/schemas", async (req, res) => {
    try {
      const schemas = await storage.getAllSchemas();
      res.json(schemas);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schemas" });
    }
  });

  // Get schema by ID
  app.get("/api/schemas/:id", async (req, res) => {
    try {
      const schema = await storage.getSchema(req.params.id);
      if (!schema) {
        return res.status(404).json({ message: "Schema not found" });
      }
      res.json(schema);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schema" });
    }
  });

  // Create new schema
  app.post("/api/schemas", async (req, res) => {
    try {
      const validatedData = insertSchemaSchema.parse(req.body);
      const schema = await storage.createSchema(validatedData);
      res.status(201).json(schema);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid schema data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create schema" });
    }
  });

  // Update schema
  app.patch("/api/schemas/:id", async (req, res) => {
    try {
      const validatedData = insertSchemaSchema.partial().parse(req.body);
      const schema = await storage.updateSchema(req.params.id, validatedData);
      if (!schema) {
        return res.status(404).json({ message: "Schema not found" });
      }
      res.json(schema);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid schema data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update schema" });
    }
  });

  // Delete schema
  app.delete("/api/schemas/:id", async (req, res) => {
    try {
      const success = await storage.deleteSchema(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Schema not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete schema" });
    }
  });

  // Import schema file
  app.post("/api/schemas/import", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fs = await import('fs');
      const fileContent = fs.readFileSync(req.file.path, 'utf8');
      const parsedContent = JSON.parse(fileContent);
      
      // Validate the schema structure
      const validatedSchema = LandingPageSchema.parse(parsedContent);
      
      const schema = await storage.createSchema({
        name: req.body.name || `Imported Schema - ${new Date().toISOString()}`,
        content: validatedSchema
      });

      // Clean up uploaded file
      fs.unlinkSync(req.file.path);

      res.status(201).json(schema);
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ message: "Invalid schema format", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to import schema" });
    }
  });

  // Export schema
  app.get("/api/schemas/:id/export", async (req, res) => {
    try {
      const schema = await storage.getSchema(req.params.id);
      if (!schema) {
        return res.status(404).json({ message: "Schema not found" });
      }

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="${schema.name}.json"`);
      res.json(schema.content);
    } catch (error) {
      res.status(500).json({ message: "Failed to export schema" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
