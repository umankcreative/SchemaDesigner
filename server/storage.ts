import { type Schema, type InsertSchema } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getSchema(id: string): Promise<Schema | undefined>;
  getAllSchemas(): Promise<Schema[]>;
  createSchema(schema: InsertSchema): Promise<Schema>;
  updateSchema(id: string, schema: Partial<InsertSchema>): Promise<Schema | undefined>;
  deleteSchema(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private schemas: Map<string, Schema>;

  constructor() {
    this.schemas = new Map();
  }

  async getSchema(id: string): Promise<Schema | undefined> {
    return this.schemas.get(id);
  }

  async getAllSchemas(): Promise<Schema[]> {
    return Array.from(this.schemas.values());
  }

  async createSchema(insertSchema: InsertSchema): Promise<Schema> {
    const id = randomUUID();
    const now = new Date().toISOString();
    const schema: Schema = { 
      ...insertSchema, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.schemas.set(id, schema);
    return schema;
  }

  async updateSchema(id: string, updateData: Partial<InsertSchema>): Promise<Schema | undefined> {
    const existing = this.schemas.get(id);
    if (!existing) return undefined;
    
    const updated: Schema = {
      ...existing,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    this.schemas.set(id, updated);
    return updated;
  }

  async deleteSchema(id: string): Promise<boolean> {
    return this.schemas.delete(id);
  }
}

export const storage = new MemStorage();
