import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSponsorSchema, insertGallerySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Sponsors routes
  app.post("/api/sponsors", async (req, res) => {
    try {
      const validatedData = insertSponsorSchema.parse(req.body);
      const sponsor = await storage.createSponsor(validatedData);
      res.json(sponsor);
    } catch (error) {
      console.error("Sponsor creation error:", error);
      res.status(400).json({ 
        error: "Dados inválidos", 
        details: error instanceof Error ? error.message : "Erro desconhecido" 
      });
    }
  });

  app.get("/api/sponsors", async (req, res) => {
    try {
      const sponsors = await storage.getSponsors();
      res.json(sponsors);
    } catch (error) {
      console.error("Get sponsors error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  // Galleries routes
  app.post("/api/galleries", async (req, res) => {
    try {
      const validatedData = insertGallerySchema.parse(req.body);
      const gallery = await storage.createGallery(validatedData);
      res.json(gallery);
    } catch (error) {
      console.error("Gallery creation error:", error);
      res.status(400).json({ 
        error: "Dados inválidos", 
        details: error instanceof Error ? error.message : "Erro desconhecido" 
      });
    }
  });

  app.get("/api/galleries", async (req, res) => {
    try {
      const galleries = await storage.getGalleries();
      res.json(galleries);
    } catch (error) {
      console.error("Get galleries error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  app.get("/api/galleries/:id", async (req, res) => {
    try {
      const gallery = await storage.getGallery(req.params.id);
      if (!gallery) {
        return res.status(404).json({ error: "Galeria não encontrada" });
      }
      res.json(gallery);
    } catch (error) {
      console.error("Get gallery error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
