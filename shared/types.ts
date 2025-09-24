import { z } from "zod";

// Frontend-safe type definitions and validation schemas
// These contain NO database table definitions or sensitive server code

// Validation schemas for client-side forms
export const insertSponsorSchema = z.object({
  companyName: z.string().min(1, "Nome da empresa é obrigatório"),
  contactName: z.string().min(1, "Nome do contato é obrigatório"),
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
  partnershipType: z.string().min(1, "Tipo de parceria é obrigatório"),
  message: z.string().min(1, "Mensagem é obrigatória"),
  phone: z.string().optional(),
  budget: z.string().optional(),
});

export const insertGallerySchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  description: z.string().optional(),
  coverImage: z.string().optional(),
  images: z.array(z.string()).optional(),
  isPublished: z.string().default("draft"),
});

export const insertNewsletterSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
});

// Exported types for frontend use (safe - no database details)
export type InsertSponsor = z.infer<typeof insertSponsorSchema>;
export type InsertGallery = z.infer<typeof insertGallerySchema>;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;

// Safe public types (what the frontend needs to know)
export type Sponsor = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  partnershipType: string;
  budget?: string;
  message: string;
  createdAt: string;
};

export type Gallery = {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  images?: string[];
  isPublished: string;
  createdAt: string;
};

export type Newsletter = {
  id: string;
  email: string;
  status: string;
  createdAt: string;
};

// User type for frontend (no sensitive data)
export type User = {
  id: string;
  username: string;
  // NOTE: password is never exposed to frontend
};