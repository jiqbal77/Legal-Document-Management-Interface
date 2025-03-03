import fs from 'fs';
import pdf from 'pdf-parse';
import { IExtraction } from '../types';

export class PDFService {
  static async extractText(filePath: string): Promise<IExtraction[]> {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      
      // Split text into paragraphs and filter out empty lines
      const paragraphs = data.text
        .split('\n\n')
        .filter((p: string) => p.trim().length > 0);

      // Create extractions with page numbers
      const extractions: IExtraction[] = [];
      let currentPage = 1;
      let textProcessed = 0;

      paragraphs.forEach((paragraph: string) => {
        // Calculate approximate page number based on text position
        // Each page typically contains around 3500 characters
        const charPosition = textProcessed + paragraph.length;
        currentPage = Math.floor(charPosition / 3500) + 1;
        
        if (paragraph.length >= 50) { // Only include significant paragraphs
          extractions.push({
            text: paragraph.substring(0, 200), // Limit extraction length
            pageNumber: Math.min(currentPage, data.numpages)
          });
        }
        
        textProcessed += paragraph.length;
      });

      return extractions;
    } catch (error) {
      console.error('PDF extraction error:', error);
      return [];
    }
  }
} 