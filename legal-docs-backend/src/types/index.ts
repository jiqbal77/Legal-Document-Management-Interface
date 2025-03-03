import { Request } from 'express';

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IDocument {
  _id: string;
  title: string;
  fileName: string;
  // uploadedBy: string;
  fileSize: number;
  mimeType: string;
  uploadDate: Date;
  extractions: IExtraction[];
}

export interface IExtraction {
  text: string;
  pageNumber: number;
}

export interface IAuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
} 