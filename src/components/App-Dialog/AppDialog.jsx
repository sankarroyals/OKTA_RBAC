import {Dialog, DialogContent, DialogTitle} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';
import {AppButton} from '../AppButton/AppButton';
import {AppNotSelectedButton} from '../AppButton/AppButton';

export const AppDialog = ({open, handleClose, text}) => {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') handleClose();
      }}
    >
      <DialogContent style={{position: 'relative', padding: '2rem', fontWeight: 500}}>
        <center>
          <font color="#6D7888">{text}</font>
        </center>
        <center>
          <div style={{padding: '1rem'}}>
            <AppButton label="OK" onClick={() => handleClose()} />
          </div>
        </center>
      </DialogContent>
    </Dialog>
  );
};


export const AppDialog3 = ({open, handleClose, text, save}) => {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') handleClose();
      }}
    >
      <DialogContent style={{position: 'relative', padding: '2rem', fontWeight: 500}}>
        <center>
          <font color="#6D7888">{text}</font>
        </center>
        <div style={{display: 'flex', gap: '-80px'}}>
          <div style={{padding: '1rem'}}>
            <AppButton label="Close" onClick={() => handleClose()} />
          </div>
          <div style={{padding: '1rem'}}>
            <AppButton label="OK" onClick={() => save()} />
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export const AppErrorDialog = ({open, handleClose, text}) => {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') handleClose();
      }}
    >
      <DialogContent style={{position: 'relative', padding: '2rem', fontWeight: 500}}>
        <center>
          <ErrorIcon />
        </center>
        <div>
          <font color="#6D7888">{text}</font>
        </div>
        <center>
          <div style={{padding: '1rem'}}>
            <AppButton label="OK" onClick={() => handleClose()} />
          </div>
        </center>
      </DialogContent>
    </Dialog>
  );
};

const dropdownSpan = {
  font: 'normal normal 600 12px/15px \'Segoe UI\' ',
  color: 'rgba(59, 70, 85, 1)',
  marginBottom: '5px',
};
export const BulkUploadError = ({open, handleClose, text}) => {
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') handleClose();
      }}
    >
      <DialogContent style={{position: 'relative', fontWeight: 500}}>
        <DialogTitle id="scroll-dialog-title-error" style={{color: '#F44336', padding: '0px', marginBottom: '10px', font: 'normal normal normal 18px \'Segoe UI\''}}>{text.length} Errors has occured.</DialogTitle>

        <ul style={{marginLeft: '2px', paddingInlineStart: '20px'}}>
          {text.length>0 && text.map((t, i)=>(
            <li style={dropdownSpan} key={i}>{t}</li>
          ))}

        </ul>
        <center>
          <div style={{padding: '1rem'}}>
            <AppButton label="OK" onClick={() => handleClose()} />
          </div>
        </center>
      </DialogContent>
    </Dialog>
  );
};
export const AppConfirmDialog = ({open, handleClose, text,
  setNo=handleClose, setYes, ifYesFirst=true, secondLineText=null}) => {
  const firstButton = 'Yes';
  const firstAction = setYes;
  const secondButton = 'No';
  const secondAction = setNo;
  // if (!ifYesFirst) {
  //   firstButton = 'No';
  //   firstAction = setNo;
  //   secondButton = 'Yes';
  //   secondAction = setYes;
  // }
  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') handleClose();
      }}
    >
      <DialogContent style={{position: 'relative', padding: '2rem', fontWeight: 500}}>
        <div>
          <font color="#6D7888">{text}</font>
          {secondLineText && <><p></p><font color="#6D7888">{secondLineText}</font></>}
        </div>
        <center>
          <div style={{padding: '1rem'}}>
            {ifYesFirst ?
            <>
              <AppButton label={firstButton} onClick={() => firstAction()}/>
            &nbsp;&nbsp;&nbsp;&nbsp;
              <AppNotSelectedButton label={secondButton}
                onClick={() => secondAction()}/>
            </> :
            <>
              <AppNotSelectedButton label={secondButton}
                onClick={() => secondAction()}/>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <AppButton label={firstButton} onClick={() => firstAction()}/>
            </>
            }

          </div>
        </center>
      </DialogContent>
    </Dialog>
  );
};
