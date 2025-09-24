import { type User, type InsertUser, type Sponsor, type InsertSponsor, type Gallery, type InsertGallery, type Newsletter, type InsertNewsletter, users, sponsors, galleries, newsletters } from "./schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Sponsors
  createSponsor(sponsor: InsertSponsor): Promise<Sponsor>;
  getSponsors(): Promise<Sponsor[]>;
  
  // Galleries 
  createGallery(gallery: InsertGallery): Promise<Gallery>;
  getGalleries(): Promise<Gallery[]>;
  getGallery(id: string): Promise<Gallery | undefined>;
  
  // Newsletter
  createNewsletterSubscription(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscriptions(): Promise<Newsletter[]>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private sponsors: Map<string, Sponsor>;
  private galleries: Map<string, Gallery>;
  private newsletters: Map<string, Newsletter>;

  constructor() {
    this.users = new Map();
    this.sponsors = new Map();
    this.galleries = new Map();
    this.newsletters = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Sponsors
  async createSponsor(insertSponsor: InsertSponsor): Promise<Sponsor> {
    const id = randomUUID();
    const sponsor: Sponsor = { 
      ...insertSponsor, 
      id,
      phone: insertSponsor.phone || null,
      budget: insertSponsor.budget || null,
      createdAt: new Date()
    };
    this.sponsors.set(id, sponsor);
    return sponsor;
  }

  async getSponsors(): Promise<Sponsor[]> {
    return Array.from(this.sponsors.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // Galleries
  async createGallery(insertGallery: InsertGallery): Promise<Gallery> {
    const id = randomUUID();
    const gallery: Gallery = { 
      ...insertGallery, 
      id,
      description: insertGallery.description || null,
      coverImage: insertGallery.coverImage || null,
      images: insertGallery.images || null,
      isPublished: insertGallery.isPublished || "draft",
      createdAt: new Date()
    };
    this.galleries.set(id, gallery);
    return gallery;
  }

  async getGalleries(): Promise<Gallery[]> {
    return Array.from(this.galleries.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getGallery(id: string): Promise<Gallery | undefined> {
    return this.galleries.get(id);
  }

  // Newsletter
  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existing = Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === insertNewsletter.email
    );
    if (existing) {
      throw new Error("Este email já está inscrito na newsletter");
    }

    const id = randomUUID();
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id,
      status: "active",
      createdAt: new Date()
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscriptions(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email
    );
  }
}

// Database Storage Implementation
export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Sponsors
  async createSponsor(insertSponsor: InsertSponsor): Promise<Sponsor> {
    const [sponsor] = await db
      .insert(sponsors)
      .values({
        ...insertSponsor,
        phone: insertSponsor.phone || null,
        budget: insertSponsor.budget || null,
      })
      .returning();
    return sponsor;
  }

  async getSponsors(): Promise<Sponsor[]> {
    return await db.select().from(sponsors).orderBy(sponsors.createdAt);
  }

  // Galleries
  async createGallery(insertGallery: InsertGallery): Promise<Gallery> {
    const [gallery] = await db
      .insert(galleries)
      .values({
        ...insertGallery,
        description: insertGallery.description || null,
        coverImage: insertGallery.coverImage || null,
        images: insertGallery.images || null,
        isPublished: insertGallery.isPublished || "draft",
      })
      .returning();
    return gallery;
  }

  async getGalleries(): Promise<Gallery[]> {
    return await db.select().from(galleries).orderBy(galleries.createdAt);
  }

  async getGallery(id: string): Promise<Gallery | undefined> {
    const [gallery] = await db.select().from(galleries).where(eq(galleries.id, id));
    return gallery || undefined;
  }

  // Newsletter
  async createNewsletterSubscription(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const [newsletter] = await db
      .insert(newsletters)
      .values(insertNewsletter)
      .returning();
    return newsletter;
  }

  async getNewsletterSubscriptions(): Promise<Newsletter[]> {
    return await db.select().from(newsletters).orderBy(newsletters.createdAt);
  }

  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    const [newsletter] = await db.select().from(newsletters).where(eq(newsletters.email, email));
    return newsletter || undefined;
  }
}

export const storage = new DatabaseStorage();
