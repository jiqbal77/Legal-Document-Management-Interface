Project Setup and Environment Configuration
----------------------------------------

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm (v6 or higher)

### Backend Setup (legal-docs-backend)
1. Navigate to backend directory:
```bash
cd legal-docs-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root directory with following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/legal-docs
UPLOAD_DIR=uploads
JWT_SECRET=SOMESECRET
```

4. Create uploads directory:
```bash
mkdir uploads
```

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend server will be running on http://localhost:5000

### Frontend Setup (legal-docs-frontend)
1. Navigate to frontend directory:
```bash
cd legal-docs-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend application will be running on http://localhost:3000

### Project Structure
```
pdf-extraction/
├── legal-docs-backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── types/
│   ├── uploads/
│   └── .env
└── legal-docs-frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   └── types/
    └── .env
```

### Available Scripts

Backend:
- `npm start` - Start production server
- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build for production

Frontend:
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Development Notes
- Backend uses TypeScript for type safety
- Frontend is built with Create React App and TypeScript
- PDF extraction is handled by pdf-parse library
- File uploads are stored in the `uploads` directory
- MongoDB is used for storing document metadata and extractions

### Testing
#### Backend Tests
1. Create `.env.test` file in backend directory:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/legal-docs-test
UPLOAD_DIR=uploads-test
```

2. Run tests:
```bash
cd legal-docs-backend
npm test
```

The test suite includes:
- Document upload and validation
- Document retrieval (single and list)
- PDF file serving
- Error handling scenarios

Test files are located in `src/tests/` directory:
```
legal-docs-backend/
└── src/
    └── tests/
        ├── document.test.ts
        ├── setup.ts
        └── fixtures/
            └── test.pdf
```


Note: Ensure MongoDB is running locally before executing backend tests.
```


