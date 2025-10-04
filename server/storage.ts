import { type Application, type InsertApplication, type Admin, type InsertAdmin } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Application operations
  createApplication(application: InsertApplication): Promise<Application>;
  getApplication(id: string): Promise<Application | undefined>;
  getApplicationByReference(referenceNumber: string): Promise<Application | undefined>;
  getAllApplications(): Promise<Application[]>;
  updateApplicationStatus(
    id: string, 
    status: "submitted" | "under_review" | "approved" | "rejected",
    reviewedBy?: string,
    adminNotes?: string
  ): Promise<Application | undefined>;
  
  // Admin operations
  getAdmin(id: string): Promise<Admin | undefined>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
}

export class MemStorage implements IStorage {
  private applications: Map<string, Application>;
  private admins: Map<string, Admin>;

  constructor() {
    this.applications = new Map();
    this.admins = new Map();
    
    // Create default admin account
    const defaultAdmin: Admin = {
      id: randomUUID(),
      username: "admin",
      password: "admin123", // In production, this should be hashed
      fullName: "System Administrator",
      createdAt: new Date(),
    };
    this.admins.set(defaultAdmin.id, defaultAdmin);
  }

  // Application methods
  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = randomUUID();
    const referenceNumber = `RCC-2025-${Math.floor(Math.random() * 900000 + 100000)}`;
    
    const application: Application = {
      id,
      referenceNumber,
      ...insertApplication,
      email: insertApplication.email || null,
      status: "submitted",
      submittedDate: new Date(),
      reviewDate: null,
      completedDate: null,
      adminNotes: null,
      reviewedBy: null,
    };
    
    this.applications.set(id, application);
    return application;
  }

  async getApplication(id: string): Promise<Application | undefined> {
    return this.applications.get(id);
  }

  async getApplicationByReference(referenceNumber: string): Promise<Application | undefined> {
    return Array.from(this.applications.values()).find(
      (app) => app.referenceNumber === referenceNumber
    );
  }

  async getAllApplications(): Promise<Application[]> {
    return Array.from(this.applications.values()).sort(
      (a, b) => b.submittedDate.getTime() - a.submittedDate.getTime()
    );
  }

  async updateApplicationStatus(
    id: string,
    status: "submitted" | "under_review" | "approved" | "rejected",
    reviewedBy?: string,
    adminNotes?: string
  ): Promise<Application | undefined> {
    const application = this.applications.get(id);
    if (!application) return undefined;

    const now = new Date();
    const updatedApplication: Application = {
      ...application,
      status,
      reviewedBy: reviewedBy || application.reviewedBy,
      adminNotes: adminNotes || application.adminNotes,
      reviewDate: application.reviewDate || now,
      completedDate: (status === "approved" || status === "rejected") ? now : application.completedDate,
    };

    this.applications.set(id, updatedApplication);
    return updatedApplication;
  }

  // Admin methods
  async getAdmin(id: string): Promise<Admin | undefined> {
    return this.admins.get(id);
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(
      (admin) => admin.username === username
    );
  }

  async createAdmin(insertAdmin: InsertAdmin): Promise<Admin> {
    const id = randomUUID();
    const admin: Admin = {
      ...insertAdmin,
      id,
      createdAt: new Date(),
    };
    this.admins.set(id, admin);
    return admin;
  }
}

export const storage = new MemStorage();
