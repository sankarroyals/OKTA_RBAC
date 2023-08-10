/* This Page is the  common Error message  page which  used to show message when there is no data present in the table.
*/

import {Box} from '@mui/material';
import React from 'react';
import theme from '../../../../theme';

const ErrorMessage = ({message, errmsg}) => {
  return (

    <Box sx={{display: 'flex',
      padding: '2px', justifyContent: 'center',
      alignItems: 'center', height: '10vh', marginLeft: '70px'}}>
      <Box sx={theme.palette.noAvailableText}>
        {errmsg === '' ? `No ${message} details available for the selected data` : errmsg}
      </Box>
    </Box>
  );
};

export default ErrorMessage;
