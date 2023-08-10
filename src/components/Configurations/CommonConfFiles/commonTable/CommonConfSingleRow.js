/* This Page is the  common table page which has features like  editing the row and used by different
admin pages.
*/

import styled from '@emotion/styled';
import {Box, TableCell, TableRow, TextareaAutosize} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {tableCellClasses} from '@mui/material/TableCell';
import {BiEdit} from 'react-icons/bi';
import theme from '../../../../theme';

const CommonConfSingleRow = ({row, setAddingTrigger, addingTrigger,
  values, editValues, dateValues, idKey, singleUpdate,
  setErrMsg, setIsErrorPopupVisible}) => {
  const [editMode, setEditMode] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [editedDetails, setEditDetails] = useState({});

  function toCamelCase(arr) {
    let string = arr[0];
    for (let i=1; i<arr.length; i++) {
      string = string+ arr[i].charAt(0).toUpperCase()+arr[i].
          slice(1, arr[i].length);
    }
    return string;
  }
  // ADDING ALL VALUES AS A KEYS AND GIVING  VALUES FOR  SINGLE ROW
  useEffect(()=>{
    const keyvalues = {};
    values.map((h, index)=>{
      keyvalues[h] = row[h];
    });
    setEditDetails({...keyvalues});
  }, [row, values]);

  const editTheRow = () =>{
    setEditMode(true);
  };

  // when indiviual edited and clicked this will send a update request
  const saveTheRow = () =>{
    setEditMode(false);
    setTimeout(()=>{
      setAddingTrigger(!addingTrigger);
    }, 1000);
    const keyvalues = {};
    const originalEdited = {...editedDetails};
    values.map((h, index)=>{
      if (document.getElementById(h) !==null) {
        originalEdited[h] = document.getElementById(h).value;
      }

      keyvalues[toCamelCase(h.split('_'))] =
       document.getElementById(h) !==null ?
      document.getElementById(h).value : editedDetails[h];
    });
    setEditDetails({...originalEdited});
    idKey.map((idkey)=>{
      keyvalues[`${idkey}`] = row[idkey];
      keyvalues[toCamelCase(idkey.split('_'))] = row[idkey];
      delete keyvalues[idkey];
    });


    singleUpdate({...keyvalues, active: true, isActive: true}).then((res)=>{
      if (res.userMessage) {
        setIsErrorPopupVisible(true);
        setErrMsg(res.userMessage);
        setAddingTrigger(!addingTrigger);
      }
    }).catch((err)=>{
      setIsErrorPopupVisible(true);
      setErrMsg('Error has been occured');
      setAddingTrigger(!addingTrigger);
    });
  };

  const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#eff6fc',
      color: 'rgba(59, 70, 85, 1)',
      font: 'normal normal 600 13px/19px \'Segoe UI\'',
      padding: '9px',
    },
    [`&.${tableCellClasses.body}`]: {
      font: 'normal normal normal 13px/19px \'Segoe UI\'',
      color: 'rgba(109, 120, 136, 1)',
      padding: '9px',
    },
  }));

  const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#f8f8f8',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <StyledTableRow>
      { values.map((h, index)=>(
        dateValues[index] === false ?
          <StyledTableCell component="th" scope="row" key={index}>
            { editMode===true && editValues[index] === true ?
                <TextareaAutosize id={h} style={theme.palette.TextArea}
                  placeholder="Type in here…"
                  defaultValue={editedDetails[h]}
                  minRows={1}
                  maxRows={4}
                /> :
              editedDetails[h]
            }
          </StyledTableCell> :
        <><StyledTableCell component="th" scope="row">
          {`${new Date(row[h]).getDate() < 10 ? '0' +
              new Date(row[h]).getDate() :
              new Date(row[h]).getDate()}-${new Date(row[h]).getMonth() < 10 ?
          monthArr[new Date(row[h]).getMonth()] :
          monthArr[new Date(row[h]).getMonth()] }-${new Date(row[h]).getFullYear()}`}
        </StyledTableCell></>

      ),
      )}


      <StyledTableCell align="left">
        {editMode === false ? <Box sx={{border: '1px solid gray',
          display: 'flex', border: '0.5px solid #CECECE', borderRadius: '4px',
          width: '58px', alignItems: 'center', gap: '5px', padding: '2px 6px',
          cursor: 'pointer'}} onClick={editTheRow}>
          <BiEdit style={{fontSize: '13px', color: '#3174b6'}} />
          <Box>Edit</Box>
        </Box> :
        <Box sx={{display: 'flex', gap: '5px'}}>
          <Box sx={{border: '1px solid gray',
            display: 'flex', border: '0.5px solid #CECECE', borderRadius: '4px',
            width: '58px', alignItems: 'center', gap: '5px', padding: '2px 6px',
            cursor: 'pointer', background: '#4297d3', color: 'white',
            justifyContent: 'center'}} onClick={saveTheRow}>
            <Box>Save</Box>
          </Box>
          <Box sx={{border: '1px solid gray',
            display: 'flex', border: '0.5px solid #CECECE', borderRadius: '4px',
            width: '58px', alignItems: 'center', gap: '5px', padding: '2px 6px',
            cursor: 'pointer'}} onClick={(e)=>setEditMode(false)}>
            <Box>Cancel</Box>
          </Box>
        </Box>
        }

      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CommonConfSingleRow;
