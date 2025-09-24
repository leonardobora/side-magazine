import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { InsertNewsletter, InsertSponsor, InsertGallery } from '@shared/schema';

// Mock the db import to avoid database connection requirements
vi.mock('../db', () => ({
  db: {},
}));

// Import after mocking
const { MemStorage, validateEmail, generateId, sanitizeEmail } = await import('../storage');

describe('Storage Utility Functions', () => {
  describe('validateEmail', () => {
    it('should validate correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test..test@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('generateId', () => {
    it('should generate a unique ID', () => {
      const id1 = generateId();
      const id2 = generateId();
      
      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
      expect(typeof id1).toBe('string');
      expect(id1.length).toBeGreaterThan(0);
    });
  });

  describe('sanitizeEmail', () => {
    it('should convert email to lowercase and trim whitespace', () => {
      expect(sanitizeEmail('  TEST@EXAMPLE.COM  ')).toBe('test@example.com');
      expect(sanitizeEmail('User@Domain.Org')).toBe('user@domain.org');
      expect(sanitizeEmail('test@example.com')).toBe('test@example.com');
    });
  });
});

describe('MemStorage', () => {
  let storage: MemStorage;

  beforeEach(() => {
    storage = new MemStorage();
  });

  describe('Newsletter subscriptions', () => {
    it('should create and retrieve newsletter subscription', async () => {
      const newsletterData: InsertNewsletter = {
        email: 'test@example.com',
        name: 'Test User',
      };

      const result = await storage.createNewsletterSubscription(newsletterData);
      
      expect(result).toBeDefined();
      expect(result.email).toBe(newsletterData.email);
      expect(result.name).toBe(newsletterData.name);
      expect(result.id).toBeDefined();
    });

    it('should retrieve newsletter subscription by email', async () => {
      const newsletterData: InsertNewsletter = {
        email: 'test@example.com',
        name: 'Test User',
      };

      await storage.createNewsletterSubscription(newsletterData);
      const retrieved = await storage.getNewsletterByEmail('test@example.com');
      
      expect(retrieved).toBeDefined();
      expect(retrieved!.email).toBe(newsletterData.email);
    });

    it('should return undefined for non-existent email', async () => {
      const result = await storage.getNewsletterByEmail('nonexistent@example.com');
      expect(result).toBeUndefined();
    });

    it('should list all newsletter subscriptions', async () => {
      const newsletter1: InsertNewsletter = {
        email: 'user1@example.com',
        name: 'User 1',
      };
      
      const newsletter2: InsertNewsletter = {
        email: 'user2@example.com',
        name: 'User 2',
      };

      await storage.createNewsletterSubscription(newsletter1);
      await storage.createNewsletterSubscription(newsletter2);
      
      const subscriptions = await storage.getNewsletterSubscriptions();
      
      expect(subscriptions).toHaveLength(2);
      expect(subscriptions.some(s => s.email === 'user1@example.com')).toBe(true);
      expect(subscriptions.some(s => s.email === 'user2@example.com')).toBe(true);
    });
  });

  describe('Sponsors', () => {
    it('should create and store sponsor', async () => {
      const sponsorData: InsertSponsor = {
        companyName: 'Test Company',
        contactName: 'John Doe',
        email: 'john@testcompany.com',
        phone: '+1234567890',
        partnershipType: 'Gold',
        budget: '10000',
        message: 'We would like to sponsor the event',
      };

      const result = await storage.createSponsor(sponsorData);
      
      expect(result).toBeDefined();
      expect(result.companyName).toBe(sponsorData.companyName);
      expect(result.contactName).toBe(sponsorData.contactName);
      expect(result.email).toBe(sponsorData.email);
      expect(result.id).toBeDefined();
    });

    it('should retrieve all sponsors', async () => {
      const sponsor1: InsertSponsor = {
        companyName: 'Company 1',
        contactName: 'Contact 1',
        email: 'contact1@company1.com',
        partnershipType: 'Silver',
        message: 'Message 1',
      };

      const sponsor2: InsertSponsor = {
        companyName: 'Company 2', 
        contactName: 'Contact 2',
        email: 'contact2@company2.com',
        partnershipType: 'Bronze',
        message: 'Message 2',
      };

      await storage.createSponsor(sponsor1);
      await storage.createSponsor(sponsor2);
      
      const sponsors = await storage.getSponsors();
      
      expect(sponsors).toHaveLength(2);
      expect(sponsors.some(s => s.companyName === 'Company 1')).toBe(true);
      expect(sponsors.some(s => s.companyName === 'Company 2')).toBe(true);
    });
  });

  describe('Galleries', () => {
    it('should create and retrieve gallery', async () => {
      const galleryData: InsertGallery = {
        title: 'Test Gallery',
        description: 'A test gallery',
        coverImage: 'cover.jpg',
        images: ['image1.jpg', 'image2.jpg'],
        isPublished: 'published',
      };

      const result = await storage.createGallery(galleryData);
      
      expect(result).toBeDefined();
      expect(result.title).toBe(galleryData.title);
      expect(result.description).toBe(galleryData.description);
      expect(result.id).toBeDefined();
    });

    it('should retrieve gallery by id', async () => {
      const galleryData: InsertGallery = {
        title: 'Test Gallery',
        description: 'A test gallery',
        isPublished: 'draft',
      };

      const created = await storage.createGallery(galleryData);
      const retrieved = await storage.getGallery(created.id!);
      
      expect(retrieved).toBeDefined();
      expect(retrieved!.title).toBe(galleryData.title);
      expect(retrieved!.id).toBe(created.id);
    });

    it('should return undefined for non-existent gallery', async () => {
      const result = await storage.getGallery('non-existent-id');
      expect(result).toBeUndefined();
    });
  });
});