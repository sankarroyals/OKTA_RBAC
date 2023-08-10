/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable max-len */

import React, {useEffect, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {createTheme, styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, FormControl, InputBase, MenuItem, Select, TablePagination, TextareaAutosize} from '@mui/material';

import SwapVertIcon from '@mui/icons-material/SwapVert';
import theme from '../../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {getDropDownData_API} from '../../../redux/features/apiCall';
import CommonConfSingleRow from './RolesAccessSingleRow';
import customealltheme from '../../../theme';
import {setSortFilter, setSortType} from '../../../redux/features/configurations';
import config from '../../../Utils/Config';

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

const CustomInput = styled(InputBase)(({theme}) => ({
  '& .MuiInputBase-input': {
    'borderRadius': 4,
    'position': 'relative',
    'backgroundColor': theme.palette.background.paper,
    'border': '1px solid #ced4da',
    'fontSize': 16,
    'padding': '10px 26px 10px 12px',
    'transition': theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
    },
  },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: ' #FFFFFF',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const customTheme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        root: {
          '*::-webkit-scrollbar': {
            marginInlineEnd: '1rem',
            width: '5px',
          },
          '*::-webkit-scrollbar-track': {
            marginInlineEnd: '1rem',
            background: '#inherit',
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#a6a7a8',
            borderRadius: '2px',
            marginInlineEnd: '1rem',
          },
          '.MuiMenu-paper': {
            maxHeight: '150px',
            overflowY: 'auto',
            width: '100px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
        },
      },
    },
  },
  selectMenuBox: {
    padding: '3px 12px',
    fontSize: '12px',
    font: 'normal normal normal 13px/15px \'Segoe UI\' ',
    color: 'rgba(85, 87, 89, 1)',
  },
  selectBox: {
    '.MuiOutlinedInput-input': {
      'padding': '11.5px 14px',
      'border': 'none',
      '.MuiOutlinedInput-notchedOutline:hover': {
        border: '1px solid blue',
      },
    },
    '.MuiSelect-select': {
      font: 'normal normal normal 13px/15px \'Segoe UI\' ',
      color: 'rgba(85, 87, 89, 1)',
    },
  },
});


function CommonConfTable({idKey, submitClicked, filterResetClicked, setPage, Roles, accessControl, sortValues, ActiveSectors, page, data, ActiveCategories, setErrMsg, setIsErrorPopupVisible, setAddingTrigger, addingTrigger, heads, values, singleUpdate, newRowUpdate, pagination, setPagination}) {
  // Calculating start and end date
  const currentDate = new Date().toISOString().split('T')[0];
  const tenYearsAhead = new Date();
  tenYearsAhead.setFullYear(tenYearsAhead.getFullYear() + 10);
  const year = tenYearsAhead.getFullYear();
  const month = String(tenYearsAhead.getMonth() + 1).padStart(2, '0');
  const day = String(tenYearsAhead.getDate()).padStart(2, '0');
  const tenYearsAheadFormatted = `${year}-${month}-${day}`;
  const [AddNewRow, setNewRow] = useState(false);


  const handleAddRow = () =>{
    setNewRow(true);
  };

  // This editeddetails used for storing the adding details
  const [editedDetails, setEditDetails] = useState({
  });
  const Edit = config.AccessLevel.Edit;
  const nullvalue='N/A';
  const [categoryId, setcategoryId] = React.useState(0);
  const [sectorId, setsectorId] = React.useState(0);
  const [rol, setRol] = useState('');
  const [editModeDisableTrigger, setEditModeDisableTrigger]=useState(false); // to disable the edit of any row
  const [username, setUsername]= useState('');
  const [useremail, setUseremail]= useState('');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setEditModeDisableTrigger((editModeDisableTriggerValue)=>!editModeDisableTriggerValue);
  };

  const handleChangeRowsPerPage = (event) => {
    setPagination(+event.target.value);
    setPage(0);
  };

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setSortType(''));
  }, [dispatch]);

  const sorttype = useSelector((state)=>state.configurations.selectedSortType);


  const saveTheRow = () =>{
    // Call the adding api from here
    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(pepsico\.com|pepsicorptst\.com|corp\.pep\.tst)$/;
      if (re.test(email)) {
        return true;
      } else {
        return false;
      }
    }

    const result=validateEmail(document.getElementById('buypow').value);
    // console.log('editedDetails ', editedDetails);
    newRowUpdate(
        {
          'userName': document.getElementById('standu').value,
          'email': result==true ? document.getElementById('buypow').value: setErrMsg('email issue'),
          'sectorId': sectorId,
          'personaId': editedDetails.persona,
          'oldPersonaId': editedDetails.persona,
          'categoryId': categoryId,
          'activeStartDate': editedDetails.active_start_date ? editedDetails.active_start_date : currentDate,
          'activeEndDate': editedDetails.active_end_date ? editedDetails.active_end_date : tenYearsAheadFormatted,
          'active': editedDetails.is_active===true || editedDetails.is_active===false ? editedDetails.is_active : true,
          'requestType': 'Add',
          'oldSectorId': sectorId,
          'oldCategoryId': categoryId,
        },
    ).then((res)=>{
      // console.log('resssss ', res);
      setAddingTrigger(!addingTrigger);
      if (res && res.userMessage) {
        setIsErrorPopupVisible(true);
        if (result==false) {
          setErrMsg('Please use mail ID ending with @pepsico.com');
        } else {
          setErrMsg(res.userMessage);
        }
      } else if (res) {
        setAddingTrigger(!addingTrigger);
        setEditDetails({});
        setcategoryId(0);
        setsectorId(0);
        setRol('');
        setNewRow(false);
      }
    }).catch((err)=>{
      setIsErrorPopupVisible(true);
      setErrMsg('Error has been occured');
      setAddingTrigger(!addingTrigger);
    });
  };

  useEffect(()=> {
    setNewRow(false);
  }, [page, submitClicked, filterResetClicked]);

  const apiRespDropdownData = useSelector((state)=>state?.api?.apiValueDropdownData);

  useEffect(() => {
    dispatch(getDropDownData_API());
  }, [dispatch]);

  const handleChangeIsActive = (e)=>{
    setEditDetails({
      ...editedDetails, is_active: e.target.value,
    });
  };

  const activeStartDateValue= editedDetails.active_start_date ? editedDetails.active_start_date : currentDate;
  const activeEndDateValue = editedDetails.active_end_date ? editedDetails.active_end_date : tenYearsAheadFormatted;
  const showSectorAndCategorySelector = rol==='Sector Governance' || rol==='Sector Admin' || rol==='Sector Finance';
  return (<>
    <>
      <Box sx={{width: '100%', padding: '0px 18px'}}>
        <Box sx={{marginTop: '20px'}}>
          {accessControl===Edit && <Box> <Button
            onClick={handleAddRow}
            sx={theme.palette.AddNewTableButton}
          >
            <AddIcon />  Add new row
          </Button></Box>}
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
              <TableHead>
                <TableRow>
                  {heads.map((h, index)=>(
                    // <StyledTableCell align="left" key={index}>
                    <StyledTableCell align="left" key={index} style={{whiteSpace: 'noWrap'}} sx={{fontSize: '12px'}}>
                      <Box style={customealltheme.palette.TableHead}>
                        <Box>{h}</Box>
                        {sortValues[index] === true &&
                        <Box style={{transform: 'translateY(5px)', cursor: 'pointer', opacity: '0.5'}}
                          onClick={(e)=>{
                            dispatch(setSortFilter(values[index]));
                            if (sorttype === 'asc' ) {
                              dispatch(setSortType('desc'));
                            } if (sorttype === 'desc' || sorttype === '') {
                              dispatch(setSortType('asc'));
                            }
                          }}
                          onMouseOver={(e)=>{
                            e.target.style.opacity = '1';
                          }}
                          onMouseLeave={(e)=>{
                            e.target.style.opacity = '0.5';
                          }}
                        > <SwapVertIcon />{sorttype}</Box>}

                      </Box>

                    </StyledTableCell>
                  ))}
                  {accessControl===Edit && <StyledTableCell align="left">Action</StyledTableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {AddNewRow === true &&
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        <TextareaAutosize id="standu" style={theme.palette.TextArea}
                          placeholder="Type in here…"
                          defaultValue={editedDetails.user_name}
                          minRows={1}
                          maxRows={4}
                          onChange={(e)=>{
                            setEditDetails({...editedDetails, user_name: e.target.value});
                            setUsername(e.target.value);
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <TextareaAutosize id="buypow" style={theme.palette.TextArea}
                          placeholder="Type in here…"
                          defaultValue={editedDetails['email']}
                          minRows={1}
                          maxRows={4}
                          onChange={(e)=>{
                            setEditDetails({...editedDetails, email: e.target.value});
                            setUseremail(e.target.value);
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row" >
                        <FormControl style={{width: '100px'}}>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            sx={customTheme.selectBox}
                            value={editedDetails.persona}
                            onChange={(e)=>{
                              setEditDetails({...editedDetails, persona: e.target.value});
                              // setRolesvalid(e.target.value);
                            }}
                            label="Select"
                            input={<CustomInput label="Tag" />}
                            displayEmpty
                            className="newclass"
                          >
                            { Roles?.map((obj, index) => (
                              <MenuItem
                                sx={customTheme.selectMenuBox}
                                key={obj.role_id}
                                value={obj.role_id}
                                className="this-is-new-class"
                                onClick={(e)=>{
                                  setRol(obj.description);
                                }}
                              >
                                {obj.description}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {showSectorAndCategorySelector===true ?
                        <FormControl style={{width: '100px'}}>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            sx={customTheme.selectBox}
                            value={sectorId}
                            onChange={(e)=>{
                              setsectorId(e.target.value);
                            }}
                            label="Select"
                            input={<CustomInput label="Tag" />}
                            displayEmpty
                            className="newclass"
                          >
                            <MenuItem value="" sx={customTheme.selectMenuBox}>
                              <span>Select</span>
                            </MenuItem>
                            {ActiveSectors.length !== 0 &&
                              ActiveSectors
                                  .map((obj) => obj.sectors)
                                  .flat()
                                  .sort((a, b) => a.name.localeCompare(b.name))
                                  .map((r) => (
                                    <MenuItem
                                      sx={customTheme.selectMenuBox}
                                      key={r?.id}
                                      value={r?.id}
                                      className="this-is-new-class"
                                    >
                                      {r.name}
                                    </MenuItem>
                                  ))}
                          </Select>
                        </FormControl> :
                        <FormControl style={{width: '100px'}}>
                          {nullvalue}
                        </FormControl>
                        }
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {showSectorAndCategorySelector===true ?
                        <FormControl style={{width: '100px'}}>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            sx={customTheme.selectBox}
                            value={categoryId}
                            onChange={(e)=>{
                              setcategoryId(e.target.value);
                            }}
                            label="Select"
                            input={<CustomInput label="Tag" />}
                            displayEmpty
                            className="newclass"
                          >
                            <MenuItem value="" sx={customTheme.selectMenuBox}>
                              <span>Select</span>
                            </MenuItem>
                            {ActiveCategories.length !== 0 &&
                                  ActiveCategories?.map((obj) => (

                                    <MenuItem
                                      sx={customTheme.selectMenuBox}
                                      key={obj?.category_id}
                                      value={obj?.category_id}
                                      className="this-is-new-class"
                                      // onClick={(e)=>{
                                      //   setcom(obj.category);
                                      // }}
                                    >
                                      {obj.category}
                                    </MenuItem>

                                  ))}
                          </Select>
                        </FormControl> :
                        <FormControl style={{width: '100px'}}>
                          {nullvalue}
                        </FormControl>}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        <FormControl style={{width: '100px'}}>
                          <Select
                            labelId="demo-multiple-checkbox-label"
                            sx={customTheme.selectBox}
                            value={editedDetails.is_active===true || editedDetails.is_active===false ? editedDetails.is_active : true}
                            onChange={handleChangeIsActive}
                            label="Select"
                            input={<CustomInput label="Tag" />}
                            displayEmpty
                            className="newclass"
                          >

                            { [true, false]?.map((obj, index) => (
                              <MenuItem
                                sx={customTheme.selectMenuBox}
                                key={index}
                                value={obj}
                                className="this-is-new-class"
                              >
                                {obj === true? 'Y' : 'N'}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                      </StyledTableCell>
                      <StyledTableCell>
                        <input type="date" id="datemin" name="datemin" min={currentDate} value={activeStartDateValue} onChange={(e)=>{
                          setEditDetails({...editedDetails, active_start_date: e.target.value});
                        }}/>
                      </StyledTableCell>


                      <StyledTableCell>
                        <input type="date" id="datemin" name="datemin" min={activeStartDateValue} value={activeEndDateValue} onChange={(e)=>{
                          setEditDetails({...editedDetails, active_end_date: e.target.value});
                        }}/>
                      </StyledTableCell>

                      <StyledTableCell component="th" scope="row">

                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">

                      </StyledTableCell>

                      <StyledTableCell align="left" >

                        <Box sx={{display: 'flex', gap: '5px'}}>
                          {username !=='' && useremail !==''?
                          <Box sx={{border: '1px solid gray',
                            display: 'flex', border: '0.5px solid #CECECE', borderRadius: '4px',
                            width: '58px', alignItems: 'center', gap: '5px', padding: '2px 6px',
                            cursor: 'pointer', background: '#4297d3', color: 'white', justifyContent: 'center'}} onClick={saveTheRow}>
                            <Box>Save</Box>
                          </Box> : <Box sx={{border: '1px solid gray',
                            display: 'flex', border: '0.5px solid #CECECE', borderRadius: '4px',
                            width: '58px', alignItems: 'center', gap: '5px', padding: '2px 6px',
                            cursor: 'not-allowed', background: '#4297d3', color: 'white', justifyContent: 'center'}}>
                            <Box>Save</Box>
                          </Box>}

                          <Box sx={{border: '1px solid gray',
                            display: 'flex', border: '0.5px solid #CECECE', borderRadius: '4px',
                            width: '58px', alignItems: 'center', gap: '5px', padding: '2px 6px',
                            cursor: 'pointer'}} onClick={(e)=>{
                            setNewRow(false);
                            setEditDetails({});
                            setcategoryId(0);
                            setsectorId(0);
                            setRol('');
                          }}>
                            <Box>Delete</Box>
                          </Box>
                        </Box>


                      </StyledTableCell>
                    </StyledTableRow>
                }
                {data?.slice(page * pagination, page * pagination + pagination)
                    ?.map((row, key) => (
                      <CommonConfSingleRow row={row} key={key} setAddingTrigger={setAddingTrigger}
                        addingTrigger={addingTrigger} values={values}
                        idKey={idKey}
                        singleUpdate={singleUpdate} Roles={Roles}
                        setErrMsg={setErrMsg}
                        accessControl={accessControl}
                        setIsErrorPopupVisible={setIsErrorPopupVisible} ActiveSectors={ActiveSectors}
                        ActiveCategories={ActiveCategories}
                        editModeDisableTrigger={editModeDisableTrigger}
                        filterResetClicked={filterResetClicked}
                        submitClicked={submitClicked}
                        page = {page}
                      />
                    ))}

                {/* Add a New row ehich takes values length and display needed textareas */}

              </TableBody>
            </Table>
          </TableContainer>

          {data.length>0 && <TablePagination
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
