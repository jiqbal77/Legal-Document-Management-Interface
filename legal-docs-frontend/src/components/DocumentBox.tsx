import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { Document } from '../types';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface DocumentBoxProps {
  document: Document | null;
  onClick: () => void;
}

const DocumentBox: React.FC<DocumentBoxProps> = ({ document, onClick }) => {
  return (
    <Paper
      sx={{
        p: 2,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
      onClick={onClick}
    >
      {document ? (
        <>
          <InsertDriveFileIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="subtitle1" noWrap>
            {document.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date(document.uploadDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {(document.fileSize / 1024).toFixed(2)} KB
          </Typography>
        </>
      ) : (
        <Box sx={{ textAlign: 'center' }}>
          <InsertDriveFileIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="body1" color="text.secondary">
            Click to Upload
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default DocumentBox; 