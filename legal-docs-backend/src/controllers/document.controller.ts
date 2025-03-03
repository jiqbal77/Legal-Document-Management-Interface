import { RequestHandler, Response } from 'express';
import { Document } from '../models/document.model';
import path from 'path';
import fs from 'fs';
import { PDFService } from '../services/pdf.service';

export class DocumentController {
  static upload: RequestHandler = async (req: any, res): Promise<any> => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      // Extract text from PDF
      const filePath = path.join(__dirname, '../../uploads', file.filename);
      const extractions = await PDFService.extractText(filePath);

      const document = new Document({
        title: req.body.title,
        fileName: file.filename,
        // uploadedBy: req.user?.id,
        fileSize: file.size,
        mimeType: file.mimetype,
        extractions: extractions
      });

      await document.save();
      return res.status(201).json(document);
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(400).json({ message: 'Upload failed' });
    }
  }

  static getDocuments: RequestHandler = async (req: any, res): Promise<any> => {
    try {
      const documents = await Document.find({ uploadedBy: req.user?.id });
      return res.json(documents);
    } catch (error) {
      return res.status(400).json({ message: 'Failed to fetch documents' });
    }
  }

  static getDocument: RequestHandler = async (req: any, res): Promise<any> => {
    try {
      const document = await Document.findOne({
        _id: req.params.id,
        uploadedBy: req.user?.id
      });

      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      res.json(document);
    } catch (error) {
      return res.status(400).json({ message: 'Failed to fetch document' });
    }
  }

  static getFile: RequestHandler = async (req: any, res): Promise<any> => {
    try {
      const document = await Document.findOne({
        _id: req.params.id,
        uploadedBy: req.user?.id
      });

      if (!document) {
        return res.status(404).json({ message: 'Document not found' });
      }

      const filePath = path.join(__dirname, '../../uploads', document.fileName);
      
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'File not found' });
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${document.title}.pdf"`);
      
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      return res.status(400).json({ message: 'Failed to fetch file' });
    }
  }
}
