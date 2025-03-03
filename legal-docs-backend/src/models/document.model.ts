import mongoose from 'mongoose';
import { IDocument, IExtraction } from '../types';

const extractionSchema = new mongoose.Schema<IExtraction>({
  text: { type: String, required: true },
  pageNumber: { type: Number, required: true }
});

const documentSchema = new mongoose.Schema<IDocument>({
  title: { type: String, required: true },
  fileName: { type: String, required: true },
//   uploadedBy: { type: String, required: true },
  fileSize: { type: Number, required: true },
  mimeType: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  extractions: [extractionSchema]
});

export const Document = mongoose.model<IDocument>('Document', documentSchema);
