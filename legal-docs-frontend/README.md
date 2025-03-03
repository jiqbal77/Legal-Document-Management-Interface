# Legal Documents Frontend

A React-based frontend application for managing legal documents with PDF preview capabilities.

## Features

- Upload and manage PDF documents
- Preview PDFs with page navigation
- Display document extractions with page references
- Responsive grid layout
- Material-UI based modern interface

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Backend server running (legal-docs-backend)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
- Copy `.env.example` to `.env`
- Update `REACT_APP_API_URL` if your backend is running on a different URL

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Usage

1. Document Dashboard
   - View all uploaded documents in a grid layout
   - Click empty boxes to upload new documents
   - Click existing documents to view details

2. Upload Documents
   - Click any empty box to open the upload modal
   - Select a PDF file
   - Add a title for the document
   - Click Upload to save

3. View Documents
   - Click on an uploaded document to open the details modal
   - Preview the PDF on the left side
   - View extractions on the right side
   - Use "Go to Page" buttons to navigate to specific pages

## Development

- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Create production build

## Technologies Used

- React
- TypeScript
- Material-UI
- react-pdf
- Axios 