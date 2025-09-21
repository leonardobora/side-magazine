import { type User, type InsertUser, type Sponsor, type InsertSponsor, type Gallery, type InsertGallery } from "@shared/schema";
import { randomUUID } from "crypto";

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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private sponsors: Map<string, Sponsor>;
  private galleries: Map<string, Gallery>;

  constructor() {
    this.users = new Map();
    this.sponsors = new Map();
    this.galleries = new Map();
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
}

export const storage = new MemStorage();
