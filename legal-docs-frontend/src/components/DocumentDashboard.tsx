import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import DocumentBox from './DocumentBox';
import UploadModal from './UploadModal';
import DocumentDetailsModal from './DocumentDetailsModal';
import { Document } from '../types';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const DocumentDashboard: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${API_URL}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleBoxClick = (document: Document | null) => {
    if (document) {
      setSelectedDocument(document);
      setIsDetailsModalOpen(true);
    } else {
      setIsUploadModalOpen(true);
    }
  };

  const handleUploadSuccess = () => {
    setIsUploadModalOpen(false);
    fetchDocuments();
  };

  // Create array of 9 boxes
  const boxes = Array(9).fill(null).map((_, index) => {
    const document = documents[index];
    return (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <DocumentBox
          document={document}
          onClick={() => handleBoxClick(document)}
        />
      </Grid>
    );
  });

  return (
    <>
      <Grid container spacing={3}>
        {boxes}
      </Grid>

      <UploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />

      <DocumentDetailsModal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        document={selectedDocument}
      />
    </>
  );
};

export default DocumentDashboard; 