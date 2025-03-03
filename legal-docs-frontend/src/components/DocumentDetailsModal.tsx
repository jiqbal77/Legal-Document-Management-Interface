import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Document as PDFDocument, Page } from 'react-pdf';
import { Document } from '../types';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface DocumentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  document: Document | null;
}

const DocumentDetailsModal: React.FC<DocumentDetailsModalProps> = ({
  open,
  onClose,
  document,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (!document) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { height: '90vh' },
      }}
    >
      <DialogTitle>
        {document.title}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'flex', height: '100%' }}>
          {/* Left Panel - PDF Preview */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              borderRight: 1,
              borderColor: 'divider',
              pr: 2,
            }}
          >
            <PDFDocument
              file={`${API_URL}/documents/${document._id}/file`}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<LinearProgress />}
              error={<Typography color="error">Failed to load PDF</Typography>}
            >
              <Page
                pageNumber={currentPage}
                width={500}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                loading={<LinearProgress />}
                error={<Typography color="error">Failed to load page</Typography>}
              />
            </PDFDocument>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography>
                Page {currentPage} of {numPages}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Button
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <Button
                  disabled={currentPage >= numPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Right Panel - Extractions */}
          <Box sx={{ width: '300px', pl: 2 }}>
            <Typography variant="h6" gutterBottom>
              Extractions
            </Typography>
            <List>
              {document.extractions.map((extraction, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText
                      primary={extraction.text}
                      secondary={`Page ${extraction.pageNumber}`}
                    />
                    <Button
                      size="small"
                      onClick={() => goToPage(extraction.pageNumber)}
                    >
                      Go to Page
                    </Button>
                  </ListItem>
                  {index < document.extractions.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentDetailsModal; 