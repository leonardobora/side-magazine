import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSponsorSchema, insertGallerySchema, insertNewsletterSchema } from "./schema";

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

  // Newsletter routes
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existing = await storage.getNewsletterByEmail(validatedData.email);
      if (existing) {
        return res.status(409).json({ 
          error: "Este email já está inscrito na newsletter" 
        });
      }
      
      const newsletter = await storage.createNewsletterSubscription(validatedData);
      res.json({ 
        message: "Inscrição realizada com sucesso!", 
        newsletter: { email: newsletter.email, id: newsletter.id } 
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(400).json({ 
        error: "Dados inválidos", 
        details: error instanceof Error ? error.message : "Erro desconhecido" 
      });
    }
  });

  app.get("/api/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      console.error("Get newsletter subscriptions error:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
