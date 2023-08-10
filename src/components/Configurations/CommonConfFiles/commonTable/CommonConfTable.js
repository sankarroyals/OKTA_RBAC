/* eslint-disable max-len */

/* This Page is the  common table page which has features like adding and editing the rows and used by different
admin pages.
*/


import React, {useEffect, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, TablePagination, TextareaAutosize} from '@mui/material';
import CommonConfSingleRow from './CommonConfSingleRow';
import theme from '../../../../theme';

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


function CommonConfTable({idKey, data, setErrMsg, setIsErrorPopupVisible, setAddingTrigger, addingTrigger, heads, values, editValues, dateValues, singleUpdate, newRowUpdate, pagination, setPagination}) {
  const [AddNewRow, setNewRow] = useState(false);
  const handleAddRow = () =>{
    setNewRow(true);
  };

  // This editeddetails used for storing the adding details

  const [editedDetails, setEditDetails] = useState({});

  const [page, setPage] = React.useState(0);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination(+event.target.value);
    setPage(0);
  };

  // ADDING ALL VALUES AS A KEYS AND GIVING EMPTY VALUES FOR ADDING NEW ROW
  useEffect(()=>{
    const keyvalues = {};
    values.map((h, index)=>{
      keyvalues[h] = '';
    });
    setEditDetails({...keyvalues});
  }, [values]);


  function toCamelCase(arr) {
    let string = arr[0];
    for (let i=1; i<arr.length; i++) {
      string = string+ arr[i].charAt(0).toUpperCase()+arr[i].
          slice(1, arr[i].length);
    }
    return string;
  }

  const saveTheRow = () =>{
    // Call the adding api from here
    setNewRow(false);
    setTimeout(()=>{
      setAddingTrigger(!addingTrigger);
    }, 1000);
    Object.keys(editedDetails).map((obj)=>{
      if (editedDetails[toCamelCase(obj.split('_'))] !== editedDetails[`${obj}`]) {
        editedDetails[toCamelCase(obj.split('_'))] = editedDetails[`${obj}`];
        delete editedDetails[`${obj}`];
      }
    });
    newRowUpdate({...editedDetails, active: true, isActive: true}).then((res)=>{
      if (res.userMessage) {
        // console.log('object1');
        setIsErrorPopupVisible(true);
        setErrMsg(res.userMessage);
        setAddingTrigger(!addingTrigger);
      }
    }).catch((err)=>{
      setIsErrorPopupVisible(true);
      setErrMsg('Error has been occured');
      setAddingTrigger(!addingTrigger);
    });
    // console.log('object3');
    setEditDetails({});
  };

  return (<>
    <>
      <Box sx={{width: '100%', padding: '0px 18px'}}>
        <Box sx={{marginTop: '20px'}}>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {heads.map((h, index)=>(
                    <StyledTableCell align="left" key={index}>{h}</StyledTableCell>
                  ))}
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.slice(page * pagination, page * pagination + pagination)
                    ?.map((row, key) => (
                      <CommonConfSingleRow row={row} key={key} setAddingTrigger={setAddingTrigger}
                        addingTrigger={addingTrigger} values={values}
                        editValues={editValues} dateValues={dateValues} idKey={idKey}
                        singleUpdate={singleUpdate}
                        setErrMsg={setErrMsg}
                        setIsErrorPopupVisible={setIsErrorPopupVisible}
                      />
                    ))}

                {/* Add a New row ehich takes values length and display needed textareas */}
                {AddNewRow === true &&
                    <StyledTableRow>
                      {values.map((h, index)=>(
                        editValues[index] === true ? <StyledTableCell component="th" scope="row" key={index}>
                          <TextareaAutosize style={theme.palette.TextArea}
                            placeholder="Type in here…"
                            defaultValue={editedDetails[`${h}`]}
                            minRows={1}
                            maxRows={4}
                            onChange={(e)=>{
                              setEditDetails({...editedDetails,
                                [`${h}`]: e.target.value});
                            }}
                          />
                        </StyledTableCell> :
                        <StyledTableCell component="th" scope="row" key={index}>
                        </StyledTableCell>
                      ))}

                      <StyledTableCell align="left">

                        <Box sx={{display: 'flex', gap: '5px'}}>
                          <Box sx={{border: '1px solid gray',
                            display: 'flex', border: '0.5px solid #CECECE', borderRadius: '4px',
                            width: '58px', alignItems: 'center', gap: '5px', padding: '2px 6px',
                            cursor: 'pointer', background: '#4297d3', color: 'white', justifyContent: 'center'}} onClick={saveTheRow}>
                            <Box>Save</Box>
                          </Box>
                          <Box sx={{border: '1px solid gray',
                            display: 'flex', border: '0.5px solid #CECECE', borderRadius: '4px',
                            width: '58px', alignItems: 'center', gap: '5px', padding: '2px 6px',
                            cursor: 'pointer'}} onClick={(e)=>{
                            setNewRow(false);
                            setEditDetails({});
                          }}>
                            <Box>Delete</Box>
                          </Box>
                        </Box>


                      </StyledTableCell>
                    </StyledTableRow>
                }
              </TableBody>
            </Table>
          </TableContainer>
          <Box> <Button
            onClick={handleAddRow}
            sx={theme.palette.AddNewTableButton}
          >
            <AddIcon />  Add new row
          </Button></Box>
          {data.length>0 &&
            <TablePagination
              rowsPerPageOptions={[2, 5, 10, 15]}
              component="div"
              count={data?.length || 0}
              rowsPerPage={pagination}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />}
        </Box>
      </Box>
    </>

  </>);
}

export default CommonConfTable;
