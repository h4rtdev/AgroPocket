import { z } from "zod";

// User Schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const insertUserSchema = userSchema.omit({ id: true });
export const loginSchema = userSchema.pick({ email: true, password: true });

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;

// Crop Schema (Plantação)
export const cropSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(1, "Name is required"),
  area: z.coerce.number().positive("Area must be positive"),
  areaUnit: z.enum(["hectare", "acre", "m2"]),
  plantingDate: z.string(),
  status: z.enum(["planted", "growing", "harvested", "failed"]),
  notes: z.string().optional(),
  createdAt: z.string(),
});

export const insertCropSchema = cropSchema.omit({ id: true, userId: true, createdAt: true });

export type Crop = z.infer<typeof cropSchema>;
export type InsertCrop = z.infer<typeof insertCropSchema>;

// Input Schema (Insumo)
export const inputSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().min(1, "Name is required"),
  type: z.enum(["fertilizer", "pesticide", "seed", "equipment", "other"]),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
  cost: z.coerce.number().nonnegative("Cost must be non-negative"),
  purchaseDate: z.string(),
  supplier: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.string(),
});

export const insertInputSchema = inputSchema.omit({ id: true, userId: true, createdAt: true });

export type Input = z.infer<typeof inputSchema>;
export type InsertInput = z.infer<typeof insertInputSchema>;

// Harvest Schema (Colheita)
export const harvestSchema = z.object({
  id: z.string(),
  userId: z.string(),
  cropId: z.string(),
  cropName: z.string(),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  unit: z.string().min(1, "Unit is required"),
  harvestDate: z.string(),
  quality: z.enum(["excellent", "good", "fair", "poor"]),
  notes: z.string().optional(),
  createdAt: z.string(),
});

export const insertHarvestSchema = harvestSchema.omit({ id: true, userId: true, createdAt: true });

export type Harvest = z.infer<typeof harvestSchema>;
export type InsertHarvest = z.infer<typeof insertHarvestSchema>;

// History Entry Schema (Histórico)
export const historyEntrySchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(["crop", "input", "harvest", "other"]),
  action: z.enum(["created", "updated", "deleted"]),
  description: z.string(),
  timestamp: z.string(),
  relatedId: z.string().optional(),
});

export type HistoryEntry = z.infer<typeof historyEntrySchema>;
