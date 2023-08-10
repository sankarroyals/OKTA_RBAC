/* eslint-disable max-len */
import {Dialog, Button, Select, DialogTitle, FormControl, MenuItem} from '@mui/material';
import {styled} from '@mui/material/styles';

const StyledDialog = styled(Dialog)(({}) => ({
  'backgroundColor': '#24589E',
  '& .MuiDialog-paper': {
    minWidth: '250px',
    padding: '20px',
  },

}));

const StyledDialogTitle = styled(DialogTitle)(({}) => ({
  'justifyContent': 'center',
  'display': 'flex',
  'fontSize': '13px',
  'fontFamily': 'Segoe UI',
}));

const StyledFormControl = styled(FormControl)(({}) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: '20px',
}));

const StyledMenuItem =styled(MenuItem)(({}) => ({
  'fontSize': '13px',
  'fontFamily': 'Segoe UI',
}));

const StyledButton = styled(Button)(({theme}) => ({
  'backgroundColor': theme.palette.customBackground.activeButtonBackground,
  'color': theme.palette.customText.white,
  'textTransform': 'none',
  'minWidth': '0',
  'padding': '8px 24px',
  '&:hover': {
    backgroundColor: theme.palette.customBackground.activeButtonBackground,
  },
  'fontFamily': 'Segoe UI',
  'borderRadius': '5px',
  'fontSize': '12px',
  'marginLeft': '10px',
}));

const StyledSelect = styled(Select)(({theme}) => ({
  'display': 'flex',
  'minWidth': '144px',
  'maxWidth': '144px',
  '& .MuiInputBase-input': {
    'padding': '7.5px 26px 7.5px 12px',
    'border': `1px solid ${theme.palette.customColor.horizontalLineColor}`,
    'borderRadius': 4,
    'color': theme.palette.customText.lightGrey,
    'fontSize': '13px',
    'fontFamily': 'Segoe UI',
    '&:focus': {
      borderRadius: 4,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    display: 'none',
  },
}));

export default {
  StyledDialog,
  StyledDialogTitle,
  StyledButton,
  StyledSelect,
  StyledFormControl,
  StyledMenuItem,
};
