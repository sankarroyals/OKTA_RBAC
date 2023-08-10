/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import {Box, FormControl, InputBase, MenuItem, Select, TableCell, TableRow, TextareaAutosize, createTheme} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {tableCellClasses} from '@mui/material/TableCell';
import {BiEdit, BiErrorAlt} from 'react-icons/bi';
import {useSelector} from 'react-redux';
import theme from '../../../theme';
import dayjs from 'dayjs';
import customealltheme from '../../../theme';
import config from '../../../Utils/Config';
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

const CommonConfSingleRow = ({row, submitClicked, filterResetClicked, setAddingTrigger, addingTrigger, accessControl, Roles, ActiveCategories,
  values, idKey, singleUpdate, ActiveSectors,
  setErrMsg, setIsErrorPopupVisible, editModeDisableTrigger, page}) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const [editMode, setEditMode] = useState(false);
  const today = dayjs(null);

  const [sectorId, setsectorId] = React.useState('');
  const [roleId, setRoleId] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');
  const [activeStartDate, setActiveStartDate] = useState(null);
  const [activeEndDate, setActiveEndDate] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [editedDetails, setEditDetails] = useState({});
  const [active, setactive] = React.useState('');
  const [showSectorAndCategorySelector, setShowSectorAndCategorySelector] = React.useState(editMode===true && editedDetails.is_editable ==='Y' && (editedDetails.user_role==='Sector Governance' || editedDetails.user_role==='Sector Admin' || editedDetails.user_role==='Sector Finance'));

  const Edit = config.AccessLevel.Edit;

  const currentRoleId=useSelector((state)=>state?.roleBasedAccess?.currentRoleId);
  const loggedInUserId=useSelector((state)=>state?.roleBasedAccess?.userId);

  function toCamelCase(arr) {
    let string = arr[0];
    for (let i=1; i<arr.length; i++) {
      string = string+ arr[i].charAt(0).toUpperCase()+arr[i].
          slice(1, arr[i].length);
    }
    return string;
  }
  const resetDateOnCancel = () => {
    const ds = new Date(row['active_start_date']);
    const ys = ds.getFullYear();
    const ms= (ds.getMonth() + 1).toString().padStart(2, '0');
    const das = ds.getDate().toString().padStart(2, '0');

    const formattedKeyStartDateCancel = `${ys}-${ms}-${das}`;

    const ds2 = new Date(row['active_end_date']);
    const ys2 = ds2.getFullYear();
    const ms2= (ds2.getMonth() + 1).toString().padStart(2, '0');
    const das2 = ds2.getDate().toString().padStart(2, '0');

    const formattedKeyEndDateCancel = `${ys2}-${ms2}-${das2}`;

    setActiveStartDate(formattedKeyStartDateCancel);
    setActiveEndDate(formattedKeyEndDateCancel);
    setEditMode(false);
  };

  const handleactivestatus = (e) => {
    setactive(e.target.value);
  };

  useEffect(()=>{
    if (editMode===true) {
      setEditMode(false);
    }
  }, [editModeDisableTrigger]);
  useEffect(()=>{
    setEditMode(false);
  }, [page, submitClicked, filterResetClicked]);
  // ADDING ALL VALUES AS A KEYS AND GIVING  VALUES FOR  SINGLE ROW
  useEffect(()=>{
    const keyvalues = {};
    values.map((h, index)=>{
      keyvalues[h] = row[h];
    });
    setEditDetails({...keyvalues});
  }, [row, values]);

  const editTheRow = () =>{
    resetDateOnCancel();
    // console.log('row ', row);
    setEditMode(true);
    setShowSectorAndCategorySelector((editedDetails.user_role==='Sector Governance' || editedDetails.user_role==='Sector Admin' || editedDetails.user_role==='Sector Finance'));
  };
  // when indiviual edited and clicked this will send a update request
  const saveTheRow = () =>{
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

    const sectorID = sectorId && sectorId!=='' ? sectorId : keyvalues.sectorId;
    const categoryID = categoryId && categoryId!=='' ? categoryId : keyvalues.categoryId;
    // console.log('keyvalues ', keyvalues);
    singleUpdate({'userId': keyvalues.userId,
      'userName': document.getElementById('userN').value,
      'email': row.email,
      'personaId': roleId!=='' ? roleId : row.user_role_id,
      'oldPersonaId': row.user_role_id,
      'sectorId': showSectorAndCategorySelector && sectorID ? sectorID : 0,
      'categoryId': showSectorAndCategorySelector && categoryID ? categoryID : 0,
      'activeStartDate': activeStartDate ? activeStartDate : new Date(row.active_start_date).toISOString().split('T')[0],
      'activeEndDate': activeEndDate ? activeEndDate : new Date(row.active_end_date).toISOString().split('T')[0],
      'active': active === true || active === false ? active : row.is_active,
      'requestType': Edit,
      'oldSectorId': row.sector_id,
      'oldCategoryId': row.category_id,
    }).then((res)=>{
      setAddingTrigger(!addingTrigger);
      if (res.userMessage) {
        setIsErrorPopupVisible(true);
        setErrMsg(res.userMessage);
        // setAddingTrigger(!addingTrigger);
      } else if (res) {
        setEditMode(false);
        setsectorId(0);
        setCategoryId(0);
        setRoleId('');
        setactive('');
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
      backgroundColor: ' #FFFFFF',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const activeStartDateValue = activeStartDate ? activeStartDate : new Date(row.active_start_date).toISOString().split('T')[0];
  const nextDate = new Date(row.active_end_date);
  nextDate.setDate(nextDate.getDate() + 1);
  const endDateStr = nextDate.toISOString().split('T')[0];
  const activeEndDateValue = activeEndDate ? activeEndDate : endDateStr;

  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        { editMode===true ?
                <TextareaAutosize id="userN" style={theme.palette.TextArea}
                  placeholder="Type in here…"
                  defaultValue={editedDetails.user_name}
                  minRows={1}
                  maxRows={4}
                /> :
              `${editedDetails.user_name}`
        }
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {editedDetails.email}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        { editMode===true && editedDetails.is_buyplan_associated ==='N' ?
        <FormControl style={{width: '100px'}}>
          <Select
            labelId="demo-multiple-checkbox-label"
            sx={customTheme.selectBox}
            value={roleId}
            onChange={(e)=>{
              setRoleId(e.target.value);
              setShowSectorAndCategorySelector([8, 9, 10].includes(e.target.value));
            }}
            label="Select"
            input={<CustomInput label="Tag" />}
            displayEmpty
            className="newclass"
          >
            <MenuItem value="" sx={customTheme.selectMenuBox} style={{display: 'none'}}>
              <span>{row['user_role']}</span>
            </MenuItem>
            { Roles ?.map((obj, index) => (
              <MenuItem
                sx={customTheme.selectMenuBox}
                key={obj.role_id}
                value={obj.role_id}
                className="this-is-new-class"
              >
                {obj.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl> :
              `${editedDetails.user_role}`
        }
        {/* {editedDetails.user_role} */}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        { editMode && showSectorAndCategorySelector ?
            <FormControl style={{width: '100px'}}>
              <Select
                labelId="demo-multiple-checkbox-label"
                sx={customTheme.selectBox}
                value={sectorId ? sectorId : row.sector_id}
                onChange={(e)=>{
                  setsectorId(e.target.value);
                }}
                label="Select"
                input={<CustomInput label="Tag" />}
                displayEmpty
                className="newclass"
              >
                <MenuItem value="" sx={customTheme.selectMenuBox} style={{display: 'none'}}>
                  <span>{row['sector']}</span>
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
              (editMode && !showSectorAndCategorySelector ? '' : (editedDetails.sector ? `${editedDetails.sector}` : ''))
        }
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        { editMode && showSectorAndCategorySelector ?
            <Select
              labelId="demo-multiple-checkbox-label"
              sx={customTheme.selectBox}
              value={categoryId ? categoryId : row.category_id}
              onChange={(e)=>{
                setCategoryId(e.target.value);
              }}
              label="Select"
              input={<CustomInput label="Tag" />}
              displayEmpty
              className="newclass"
            >
              <MenuItem value="" sx={customTheme.selectMenuBox} style={{display: 'none'}}>
                <span>{row['category']}</span>
              </MenuItem>
              {ActiveCategories.length !== 0 &&
                                  ActiveCategories?.map((obj) => (

                                    <MenuItem
                                      sx={customTheme.selectMenuBox}
                                      key={obj?.category_id}
                                      value={obj?.category_id}
                                      className="this-is-new-class"
                                    >
                                      {obj.category}
                                    </MenuItem>
                                  ))}
            </Select> :
              (editMode && !showSectorAndCategorySelector ? '' : (editedDetails.category ? `${editedDetails.category}` : ''))
        }
      </StyledTableCell>

      <StyledTableCell component="th" scope="row">
        {editMode === true && editedDetails.is_editable ==='Y' && editedDetails.is_buyplan_associated === 'N' ? (
          <FormControl style={{width: '100px'}}>
            <Select
              labelId="demo-multiple-checkbox-label"
              sx={customTheme.selectBox}
              value={active!=='' ? active : row.is_active}
              onChange={handleactivestatus}
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
        ) : (
          `${row.is_active ? 'Y' : 'N'}`
        )}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {editMode === true && editedDetails.is_editable ==='Y' && editedDetails.is_buyplan_associated === 'N' ?
          <input type="date" id="datemin" name="datemin" min={currentDate} value={activeStartDateValue} onChange={(e)=>{
            setActiveStartDate(e.target.value);
          }}/> :
          row['active_start_date'] ? row['active_start_date'] : ''}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {editMode === true ?
          <input type="date" id="datemin" name="datemin" min={currentDate} value={activeEndDateValue} onChange={(e)=>{
            setActiveEndDate(e.target.value);
          }}/> :
          row['active_end_date'] ? row['active_end_date'] : ''}
      </StyledTableCell>

      <StyledTableCell component="th" scope="row">
        {row['last_updated_by']?row['last_updated_by']:''}
      </StyledTableCell>

      <StyledTableCell component="th" scope="row">
        {`${new Date(row['last_updated_on']).getDate() < 10 ? '0' +
              new Date(row['last_updated_on']).getDate() :
              new Date(row['last_updated_on']).getDate()}-${new Date(row['last_updated_on']).getMonth() < 10 ?
          monthArr[new Date(row['last_updated_on']).getMonth()] :
          monthArr[new Date(row['last_updated_on']).getMonth()] }-${new Date(row['last_updated_on']).getFullYear()}`}
      </StyledTableCell>

      {(accessControl === Edit && row.is_editable=='Y') ? <StyledTableCell align="left">
        {editMode === false ? (
        <Box
          sx={{
            border: '1px solid gray',
            display: 'flex',
            border: '0.5px solid #CECECE',
            borderRadius: '4px',
            width: '58px',
            alignItems: 'center',
            gap: '5px',
            padding: '2px 6px',
            cursor: 'pointer',
          }}
          onClick={editTheRow} style={customealltheme.palette.TableEdit}
        >
          <BiEdit style={{fontSize: '13px', color: '#3174b6'}} />
          <Box>Edit</Box>
        </Box>
        ) : (
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
            cursor: 'pointer'}} onClick={(e)=>{
            setEditMode(false);
            setsectorId(0);
            setCategoryId(0);
            setRoleId('');
            resetDateOnCancel();
          }}>
            <Box>Cancel</Box>
          </Box>
        </Box>
        )}

      </StyledTableCell> : accessControl !== Edit ? '' : <StyledTableCell>
        <Box
          sx={{
            border: '1px solid #CECECE',
            display: 'flex',
            borderRadius: '4px',
            width: '58px',
            alignItems: 'center',
            gap: '5px',
            padding: '2px 6px',
            cursor: 'not-allowed',
            color: '#CECECE',
          }}
          style={customealltheme.palette.TableEdit}
        >
          <BiErrorAlt style={{fontSize: '13px', color: '#CECECE'}} />
          <Box>Edit</Box>
        </Box>
      </StyledTableCell> }
    </StyledTableRow>
  );
};

export default CommonConfSingleRow;
