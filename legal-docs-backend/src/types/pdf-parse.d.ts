declare module 'pdf-parse' {
  interface PDFData {
    numpages: number;
    text: string;
  }
  
  function PDFParse(dataBuffer: Buffer): Promise<PDFData>;
  export default PDFParse;
} 