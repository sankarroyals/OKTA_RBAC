import {CircularProgress} from '@mui/material';
import {Box} from '@mui/system';
import React from 'react';

const Loading = () => {
  return (
    <Box sx={{display: 'flex', padding: '2px',
      justifyContent: 'center', alignItems: 'center', height: '20vh'}}>
      <CircularProgress sx={{color: '#0099D8'}} />
    </Box>
  );
};

export default Loading;
