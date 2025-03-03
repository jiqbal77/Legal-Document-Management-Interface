import { describe, it, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import path from 'path';
import { app } from '../app';
import { Document } from '../models/document.model';
import fs from 'fs';

describe('Document Controller', () => {
  // Create test PDF file
  const testPdfPath = path.join(__dirname, 'fixtures', 'test.pdf');
  
  beforeAll(() => {
    // Ensure fixtures directory exists
    const fixturesDir = path.join(__dirname, 'fixtures');
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir);
    }
    // Create a simple PDF file for testing if it doesn't exist
    if (!fs.existsSync(testPdfPath)) {
      fs.writeFileSync(testPdfPath, '%PDF-1.4\n%Test PDF');
    }
  });

  describe('POST /api/documents', () => {
    it('should upload a PDF file', async () => {
      const response = await request(app)
        .post('/api/documents')
        .attach('file', testPdfPath)
        .field('title', 'Test Document');

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe('Test Document');
      expect(response.body.mimeType).toBe('application/pdf');
      expect(response.body).toHaveProperty('fileSize');
      expect(response.body).toHaveProperty('fileName');
      expect(response.body).toHaveProperty('extractions');
    });

    it('should return 400 when no file is uploaded', async () => {
      const response = await request(app)
        .post('/api/documents')
        .field('title', 'Test Document');

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('No file uploaded');
    });
  });

  describe('GET /api/documents', () => {
    it('should return list of documents', async () => {
      const doc = new Document({
        title: 'Test Doc',
        fileName: 'test.pdf',
        fileSize: 1024,
        mimeType: 'application/pdf',
        extractions: [{ text: 'Test text', pageNumber: 1 }]
      });
      await doc.save();

      const response = await request(app).get('/api/documents');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('fileName');
    });
  });

  describe('GET /api/documents/:id', () => {
    it('should return a single document', async () => {
      const doc = new Document({
        title: 'Test Doc',
        fileName: 'test.pdf',
        fileSize: 1024,
        mimeType: 'application/pdf',
        extractions: [{ text: 'Test text', pageNumber: 1 }]
      });
      await doc.save();

      const response = await request(app)
        .get(`/api/documents/${doc._id}`);

      expect(response.status).toBe(200);
      expect(response.body.title).toBe('Test Doc');
      expect(response.body.fileName).toBe('test.pdf');
    });

    it('should return 404 for non-existent document', async () => {
      const response = await request(app)
        .get('/api/documents/000000000000000000000000');

      expect(response.status).toBe(404);
      expect(response.body.message).toBe('Document not found');
    });
  });

  describe('GET /api/documents/:id/file', () => {
    it('should return PDF file', async () => {
      const doc = new Document({
        title: 'Test Doc',
        fileName: 'test.pdf',
        fileSize: 1024,
        mimeType: 'application/pdf',
        extractions: [{ text: 'Test text', pageNumber: 1 }]
      });
      await doc.save();

      // Create test file in uploads directory
      const uploadsDir = path.join(__dirname, '../../uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }
      fs.writeFileSync(path.join(uploadsDir, 'test.pdf'), '%PDF-1.4\n%Test PDF');

      const response = await request(app)
        .get(`/api/documents/${doc._id}/file`);

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('application/pdf');
      expect(response.header['content-disposition']).toContain('inline');
    });
  });
});
