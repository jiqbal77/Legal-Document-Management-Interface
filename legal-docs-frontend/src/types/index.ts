export interface Document {
  _id: string;
  title: string;
  fileName: string;
  // uploadedBy: string;
  fileSize: number;
  mimeType: string;
  uploadDate: string;
  extractions: Extraction[];
}

export interface Extraction {
  text: string;
  pageNumber: number;
}

export interface UploadResponse {
  document: Document;
  message: string;
} 