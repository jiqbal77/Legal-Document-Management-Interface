import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import { AuthController } from '../controllers/auth.controller';
import { DocumentController } from '../controllers/document.controller';
import multer from 'multer';

const router = Router();
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Auth routes
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Document routes
router.post('/documents', upload.single('file'), DocumentController.upload);
router.get('/documents', DocumentController.getDocuments);
router.get('/documents/:id', DocumentController.getDocument);
router.get('/documents/:id/file', DocumentController.getFile);

export default router;
