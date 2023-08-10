/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
/* eslint-disable camelcase */
/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {styled} from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {Box} from '@mui/material';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {generateMonthDropDownValues} from '../../../services/utils';
import {getDropDownData_API} from '../../../redux/features/apiCall';
import {setPlayBookFilter, setRoleAccessFilter, setSortType} from '../../../redux/features/configurations';
import customealltheme from '../../../theme';
import _ from 'lodash'
const dropdownSpan = {
  font: 'normal normal 600 12px/15px \'Segoe UI\' ',
  color: 'rgba(59, 70, 85, 1)',
};

const theme = createTheme({
  components: {
    MuiMenu: {
      styleOverrides: {
        root: {
          '*::-webkit-scrollbar': {
            'marginInlineEnd': '1rem',
            'width': '5px',
          },
          '*::-webkit-scrollbar-track': {
            'marginInlineEnd': '1rem',
            'background': '#inherit',
          },
          '*::-webkit-scrollbar-thumb': {
            'background': '#a6a7a8',
            'borderRadius': '2px',
            'marginInlineEnd': '1rem',

          },
          '.MuiMenu-paper': {
            'maxHeight': '150px',
            'overflowY': 'auto',
            'width': '100px',
            'whiteSpace': 'nowrap',
            'textOverflow': 'ellipsis',
          },
        },
      },
    },
  },
});

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

let planMonths;

function RolesAccessList({row, buyplanowner, setFiltersResetClicked, setSubmitClicked, country, ActiveSubCommodities, Roles, ActiveMasterSectors, ActiveSectors, ActiveCategories, ActiveCommodities}) {
  const selectedDropDownData = useSelector((state)=>state?.api?.selectedDropDownData);

  const [valueCategory, setValueCategory] = React.useState([]);
  const [valueCommodity, setValueCommodity] = React.useState([]);
  const [valueSubCommodity, setValueSubCommodity] = React.useState([]);
  const [personName, setPersonName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [valueRegion, setValueRegion] = React.useState([]);

  const [selectedCommodities, setSelectedCommodities] = React.useState([]);
  const [RolesAll, setRolesAll] = React.useState([]);
  const [selectedSubCommodities, setSelectedSubCommodities] = React.useState([]);
  const [selectedRegionIdList, setSelectedRegionIdList] = React.useState([]);
  const [selectedemailList, setselectedemailList] = React.useState([]);

  const [isSectorSelected, setIsSectorSelected] = React.useState();
  const [IsMasterSectorSelected, setIsMasterSectorSelected] = React.useState();
  const [isCategorySelected, setIsCategorySelected] = React.useState();
  const [isCommoditySelected, setIsCommodiitySelected] = React.useState();
  const [valueSector, setValueSector] = React.useState([]);
  const [sidebar, setSidebar] = React.useState(false);


  // Sidebar filters
  const [PlayBookId, setPlayBookId] = React.useState([]);
  const [PlayBookName, setPlayBookName] = React.useState([]);
  const [buyOwner, setbuyOwner] = React.useState([]);
  const [uniqueUsers, setUniqueUsers]= React.useState([]);
  const [uniqueEmails, setUniqueEmails]= React.useState([]);

  const handleSubmit =()=> {
    dispatch(setRoleAccessFilter({
      user_name: personName!=='' ? [personName] : [],
      email: email!=='' ? [email] : [],
      sector: valueSector,
      category: valueCategory,
      user_role: RolesAll,
    }));
    setSubmitClicked((preValue) => !preValue);
  };

  useEffect(() => {
    const uniqueUsers = [...new Set(row.map((r) => r.user_name?.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'case'}));
    const uniqueEmails = [...new Set(row.map((r) => r.email?.trim()).filter(Boolean))].sort();
    setUniqueUsers(uniqueUsers);
    setUniqueEmails(uniqueEmails);
  }, [row]);


  const apiRespDropdownData = useSelector((state)=>state?.api?.apiValueDropdownData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDropDownData_API());
  }, [dispatch]);


  const handleRoleChange = (event) => {
    const {
      target: {value},
    } = event;
    if (value[value.length - 1] === 'select_all') {
      const str = ['select_all'];
      Roles?.map((row) => str.push(row?.description));
      setRolesAll(str);
    } else if (RolesAll.includes('select_all') && !value.includes('select_all')) {
      setRolesAll([]);
    } else {
      if (RolesAll.includes('select_all')) setRolesAll([]);
      const tepVal = Array.from(value);
      if (tepVal.includes('select_all')) tepVal.splice(tepVal.indexOf('select_all'), 1);
      setRolesAll(tepVal);
    }
  };

  const handleSideBar = () =>{
    if (sidebar === false) {
      setSidebar(!sidebar);
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    } else {
      setSidebar(!sidebar);
      document.body.style.overflow = 'auto';
    }
  };

  const handleChangeCategory = (event) => {
    setValueCommodity([]);
    const {
      target: {value},
    } = event;
    if (value[value.length - 1] === 'select_all') {
      const str = ['select_all'];
      ActiveCategories?.map((row) => str.push(row?.category));
      setValueCategory(str);
    } else if (valueCategory.includes('select_all') && !value.includes('select_all')) {
      setValueCategory([]);
    } else {
      if (valueCategory.includes('select_all')) setValueCategory([]);
      const tepVal = Array.from(value);
      if (tepVal.includes('select_all')) tepVal.splice(tepVal.indexOf('select_all'), 1);
      setValueCategory(tepVal);
    }
    setIsCategorySelected(true);
  };

  const handlebuyplanowner = (event) =>{
    const {
      target: {value},
    } = event;
    if (value[value.length - 1] === 'bo_all') {
      const str = ['bo_all'];
      buyplanowner?.map((row) => str.push(row?.user_name));
      setbuyOwner(str);
    } else if (buyOwner.includes('bo_all') && !value.includes('bo_all')) {
      setbuyOwner([]);
    } else {
      if (buyOwner.includes('bo_all')) setbuyOwner([]);
      const tepVal = Array.from(value);
      if (tepVal.includes('bo_all')) tepVal.splice(tepVal.indexOf('bo_all'), 1);
      setbuyOwner(tepVal);
    }
  };

  const handleChangeCommodity = (event) => {
    setValueSubCommodity([]);
    const {
      target: {value},
    } = event;
    if (value[value.length - 1] === 'select_all') {
      const str = ['select_all'];
      if (!isCategorySelected) ActiveCommodities.map((ele) => ele?.commodities.map((row)=> str.push(row?.name)));
      else selectedCommodities.map((row) => str.push(row?.name));
      setValueCommodity(str);
    } else if (valueCommodity.includes('select_all') && !value.includes('select_all')) {
      setValueCommodity([]);
    } else {
      if (valueCommodity.includes('select_all')) setValueCommodity([]);
      const tepVal = Array.from(value);
      if (tepVal.includes('select_all')) tepVal.splice(tepVal.indexOf('select_all'), 1);
      setValueCommodity(tepVal);
    }
    setIsCommodiitySelected(true);
  };

  const handleChangeSubCommodity = (event) => {
    const {
      target: {value},
    } = event;
    if (value[value.length - 1] === 'sc_all') {
      const str = ['sc_all'];
      if (!isCommoditySelected) apiRespDropdownData?.commodityGroups?.map((ele) => ele?.commodities?.map((obj) => obj?.subCommodities.map((row)=> str.push(row?.name))));
      else selectedSubCommodities.map((row) => str.push(row));
      setValueSubCommodity(str);
    } else if (valueSubCommodity.includes('sc_all') && !value.includes('sc_all')) {
      setValueSubCommodity([]);
    } else {
      if (valueSubCommodity.includes('sc_all')) setValueSubCommodity([]);
      const tepVal = Array.from(value);
      if (tepVal.includes('sc_all')) tepVal.splice(tepVal.indexOf('sc_all'), 1);
      setValueSubCommodity(tepVal);
    }
  };

  const handlEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePersonName = (event) => {
    setPersonName(event.target.value);
  };


  const tempCommodities = [];
  const tempSubCommodities = [];
  const tempRegionIdList = [];
  useEffect(()=>{
    if (valueCategory.length === 0) {
      setIsCategorySelected(false);
    } else {
      (ActiveCommodities && ActiveCommodities.length !== 0) &&
                    ActiveCommodities?.map((category)=>
                      valueCategory.map((ele)=> {
                        if (category.name === ele) {
                          category.commodities.map((commodity)=>tempCommodities.push(commodity?.name));
                        }
                      } ),
                    );
    }
    setSelectedCommodities([...tempCommodities]);

    if (valueCommodity.length === 0) {
      setIsCommodiitySelected(false);
    } else {
      (apiRespDropdownData.length !== 0) &&
                    apiRespDropdownData?.commodityGroups?.map((ele) =>
                      ele?.commodities?.map((commodity)=>
                        valueCommodity.map((ele)=>{
                          if (commodity.name === ele) {
                            commodity.subCommodities.map((subCommodity)=>tempSubCommodities.push(subCommodity?.name));
                          }
                        }),

                      ));
    }
    setSelectedSubCommodities([...tempSubCommodities]);
    const tempSectors = [];
  }, [valueCategory, valueCommodity, email, isSectorSelected, isCategorySelected, isCommoditySelected]);

  const handleChangeSector = (event) => {
    setValueRegion([]);
    const {
      target: {value},
    } = event;
    if (value[value.length - 1] === 'sector_all') {
      const str = ['sector_all'];
      ActiveSectors.map((obj)=>(
        // obj?.sectors?.map((row) => (
        str.push(obj?.name)
      ),
      ),
      setValueSector(str);
    } else if (valueSector.includes('sector_all') && !value.includes('sector_all')) {
      setValueSector([]);
    } else {
      if (valueSector.includes('sector_all')) setValueSector([]);
      const tepVal = Array.from(value);
      if (tepVal.includes('sector_all')) tepVal.splice(tepVal.indexOf('sector_all'), 1);
      setValueSector(tepVal);
    }
    setIsSectorSelected(true);
  };

  if (!planMonths) {
    planMonths = generateMonthDropDownValues();
  }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{width: '100%', padding: '18px'}}>
        <Box
          component="span"
          sx={{
            font: 'normal normal 700 15px/21px \'Segoe UI\' ',
            color: '#0F5DAA',
          }}
          style={customealltheme.palette.filterheading}
        >
        Roles and Access
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-start', paddingTop: '35px', flexWrap: 'wrap'}}>
          <Box sx={{color: 'rgb(96, 96, 96)', marginBottom: '5px', marginRight: '10px'}}>
            <Box sx={dropdownSpan} component="span">
            Person Name
            </Box>
            <Box sx={customealltheme.palette.filterDropdown}>
              <FormControl fullWidth >
                <Select
                  labelId="demo-multiple-checkbox-label"
                  // sx={theme.selectBox}
                  value={personName}
                  sx = {{
                    '.MuiMenuRoot': {
                      background: 'black',
                    },
                    '.MuiOutlinedInput-input': {
                      padding: '11.5px 14px',
                    },
                    '.MuiPaperRoot': {
                      'width': '1000px',
                      '& .MuiList-root': {
                        maxHeight: '200px',
                        overflow: 'auto',
                      },
                    },
                    '.MuiSelect-select': {
                      font: 'normal normal normal 13px/15px \'Segoe UI\' ',
                      color: 'rgba(85, 87, 89, 1)',
                    },
                  }}
                  onChange={handlePersonName}
                  label="Select"
                  input={<CustomInput label="Tag" />}
                  displayEmpty
                  className="newclass"
                  style={{width: '144px'}}
                >

                  <MenuItem style={{font: 'normal normal normal 12px/16px Segoe UI'}} value="" sx={theme.selectMenuBox}>
                    <span>Select</span>
                  </MenuItem>

                  {uniqueUsers.length !== 0 &&
                    uniqueUsers.map((r) => (
                      <MenuItem
                        style={{font: 'normal normal normal 12px/16px Segoe UI'}}
                        sx={theme.selectMenuBox}
                        key={r}
                        value={r}
                        className="this-is-new-class"
                      >
                        <span>{r}</span>
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{color: 'rgb(96, 96, 96)', marginBottom: '5px', marginRight: '10px'}}>
            <Box sx={dropdownSpan} component="span">
            Person Email
            </Box>
            <Box sx={customealltheme.palette.filterDropdown}>
              <FormControl fullWidth >
                <Select
                  labelId="demo-multiple-checkbox-label"
                  // sx={theme.selectBox}
                  value={email}
                  sx = {{
                    '.MuiMenuRoot': {
                      background: 'black',
                    },
                    '.MuiOutlinedInput-input': {
                      padding: '11.5px 14px',
                    },
                    '.MuiPaperRoot': {
                      'width': '1000px',
                      '& .MuiList-root': {
                        maxHeight: '200px',
                        overflow: 'auto',
                      },
                    },
                    '.MuiSelect-select': {
                      font: 'normal normal normal 13px/15px \'Segoe UI\' ',
                      color: 'rgba(85, 87, 89, 1)',
                    },
                  }}
                  onChange={handlEmail}
                  label="Select"
                  input={<CustomInput label="Tag" />}
                  displayEmpty
                  className="newclass"
                  style={{width: '144px'}}
                >
                  <MenuItem style={{font: 'normal normal normal 12px/16px Segoe UI'}} value="" sx={theme.selectMenuBox}>
                    <span>Select</span>
                  </MenuItem>
                  {uniqueEmails.length !== 0 &&
                    uniqueEmails
                        .filter((name) => name !== '')
                        .sort((a, b) => a.localeCompare(b))
                        .map((r) => (
                          <MenuItem
                            style={{font: 'normal normal normal 12px/16px Segoe UI'}}
                            sx={theme.selectMenuBox}
                            key={r}
                            value={r}
                            className="this-is-new-class"
                          >
                            <span>{r}</span>
                          </MenuItem>
                        ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{color: 'rgb(96, 96, 96)', marginBottom: '5px', marginRight: '10px'}}>
            <Box sx={dropdownSpan} component="span">
            Role
            </Box>
            <Box sx={customealltheme.palette.filterDropdown}>
              <FormControl fullWidth>

                <Select
                  labelId="demo-multiple-checkbox-label"
                  sx = {{
                    '.MuiOutlinedInput-input': {
                      padding: '11.5px 14px',
                    },
                    '.MuiPaperRoot-MuiMenu-paper-MuiPaper-root-MuiPopover-paper': {
                      bgcolor: 'green',
                    },
                    '.MuiSelect-select': {
                      font: 'normal normal normal 13px/15px \'Segoe UI\' ',
                      color: 'rgba(85, 87, 89, 1)',
                    },
                  }}
                  id="demo-multiple-checkbox"
                  multiple
                  value={RolesAll}
                  label="value"
                  onChange={handleRoleChange}
                  input={<CustomInput label="Tag" />}
                  displayEmpty
                  renderValue={( selected, displayEmpty) => displayEmpty = RolesAll.length ? selected.join(', ') :'Select All'}
                >
                  <MenuItem sx={{'padding': '3px 12px'}} key='select_all' value='select_all' className='this-is-new-class'>
                    <Checkbox sx={{'.MuiSvgIcon-root': {fontSize: '12px'}}} checked={RolesAll?.indexOf('select_all') > -1}/>
                    <ListItemText sx={{
                      '.MuiTypography-root': {
                        fontSize: '12px',
                        whiteSpace: 'normal',
                        fontFamily: 'Segoe UI',
                      },
                    }} primary="Select All" className="myClass"/>
                  </MenuItem>
                  {Roles.length !== 0 &&
                    Roles
                        .sort((a, b) => a.description.localeCompare(b.description))
                        .map((row) => (
                          <MenuItem
                            sx={{
                              'padding': '3px 12px',
                            }}
                            key={row.role_id}
                            value={row.description}
                          >
                            <Checkbox
                              sx={{
                                '.MuiSvgIcon-root': {
                                  fontSize: '12px',
                                },
                              }}
                              checked={RolesAll.indexOf(row.description) > -1}
                            />
                            <ListItemText
                              sx={{
                                '.MuiTypography-root': {
                                  fontSize: '12px',
                                  whiteSpace: 'normal',
                                  fontFamily: 'Segoe UI',
                                },
                              }}
                              primary={row.description}
                            />
                          </MenuItem>
                        ))}

                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{color: 'rgb(96, 96, 96)', marginBottom: '5px', marginRight: '10px'}}>
            <Box sx={dropdownSpan} component="span">
            Sector
            </Box>
            <Box sx={customealltheme.palette.filterDropdown}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  sx = {{
                    '.MuiMenuRoot': {
                      background: 'black',
                    },
                    '.MuiOutlinedInput-input': {
                      padding: '11.5px 14px',
                    },
                    '.MuiPaperRoot': {
                      'width': '1000px',
                      '& .MuiList-root': {
                        maxHeight: '200px',
                        overflow: 'auto',
                      },
                    },
                    '.MuiSelect-select': {
                      font: 'normal normal normal 13px/15px \'Segoe UI\' ',
                      color: 'rgba(85, 87, 89, 1)',
                    },
                  }}
                  id="demo-multiple-checkbox"
                  multiple
                  value={valueSector}
                  onChange={handleChangeSector}
                  input={<CustomInput label="Tag" />}
                  displayEmpty
                  renderValue={( selected, displayEmpty) => displayEmpty = valueSector.length ? selected.join(', ') :'Select All'}
                  className="newclass"
                  style={{
                    '& .MuiMenuRoot': {
                      background: 'black',
                    },
                    '.MuiPaperRoot': {
                      'width': '1000px',
                      '& .MuiList-root': {
                        maxHeight: '200px',
                        overflow: 'auto',
                      },
                    },
                  }}
                >
                  <MenuItem sx={{'padding': '3px 12px'}} key='sector_all' value='sector_all' className='this-is-new-class'>
                    <Checkbox sx={{'.MuiSvgIcon-root': {fontSize: '14px'}}} checked={valueSector?.indexOf('sector_all') > -1}/>
                    <ListItemText sx={{
                      '.MuiTypography-root': {
                        fontSize: '12px',
                        whiteSpace: 'normal',
                        fontFamily: 'Segoe UI',
                      },
                    }} primary="Select All" className="myClass"/>
                  </MenuItem>
                  {(ActiveSectors.length !== 0) &&
                  // ActiveSectors
                  //     .flatMap((obj) => obj?.sectors)
                  //     .sort((a, b) => a.name.localeCompare(b.name))
                  //     .map((row) => (
                      _.orderBy(ActiveSectors, (msec) => msec?.name?.toLowerCase())?.map((row)=>(

                        <MenuItem
                          sx={{
                            'padding': '3px 12px',
                          }}
                          key={row?.id}
                          value={row?.name}
                          className="this-is-new-class"
                        >
                          <Checkbox
                            sx={{
                              '.MuiSvgIcon-root': {
                                fontSize: '14px',
                              },
                            }}
                            checked={valueSector?.indexOf(row?.name) > -1}
                          />
                          <ListItemText
                            sx={{
                              '.MuiTypography-root': {
                                fontSize: '12px',
                                whiteSpace: 'normal',
                                fontFamily: 'Segoe UI',
                              },
                            }}
                            primary={row?.name}
                            className="myClass"
                          />
                        </MenuItem>
                      ))}


                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{color: 'rgb(96, 96, 96)', marginBottom: '5px', marginRight: '10px'}}>
            <Box sx={dropdownSpan} component="span">
            Category
            </Box>
            <Box sx={customealltheme.palette.filterDropdown}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  sx = {{
                    '.MuiOutlinedInput-input': {
                      padding: '11.5px 14px',
                    },
                    '.MuiSelect-select': {
                      font: 'normal normal normal 13px/15px \'Segoe UI\' ',
                      color: 'rgba(85, 87, 89, 1)',
                    },
                  }}
                  id="demo-multiple-checkbox"
                  multiple
                  value={valueCategory}
                  label="value"
                  onChange={handleChangeCategory}
                  input={<CustomInput label="Tag" />}
                  displayEmpty
                  renderValue={( selected, displayEmpty) => displayEmpty = valueCategory.length ? selected.join(', ') :'Select All'}
                >
                  <MenuItem sx={{'padding': '3px 12px'}} key='select_all' value='select_all' className='this-is-new-class'>
                    <Checkbox sx={{'.MuiSvgIcon-root': {fontSize: '14px'}}} checked={valueCategory?.includes('select_all')}/>
                    <ListItemText sx={{
                      '.MuiTypography-root': {
                        fontSize: '12px',
                        whiteSpace: 'normal',
                        fontFamily: 'Segoe UI',
                      },
                    }}primary="Select All" className="myClass"/>
                  </MenuItem>
                  {ActiveCategories.length !== 0 &&
                    ActiveCategories
                        .sort((a, b) => a.category.localeCompare(b.category))
                        .map((row) => (
                          <MenuItem
                            sx={{
                              'padding': '3px 12px',
                            }}
                            key={row?.category_id}
                            value={row?.category}
                          >
                            <Checkbox
                              sx={{
                                '.MuiSvgIcon-root': {
                                  fontSize: '14px',
                                },
                              }}
                              checked={valueCategory.indexOf(row?.category) > -1}
                            />
                            <ListItemText
                              sx={{
                                '.MuiTypography-root': {
                                  fontSize: '12px',
                                  whiteSpace: 'normal',
                                  fontFamily: 'Segoe UI',
                                },
                              }}
                              primary={row?.category}
                            />
                          </MenuItem>
                        ))}


                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{color: 'rgb(96, 96, 96)', marginBottom: '5px'}}>
            <Box sx={dropdownSpan} component="span">

            </Box>
            <Box style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
              <Box sx={{minWidth: 130, marginTop: '28px'}}>
                <Button
                  onClick={handleSubmit}
                  sx={{'backgroundColor': '#4297d3',
                    'color': '#ffffff',
                    'textTransform': 'none',
                    'minWidth': '0',
                    'padding': '8px 35px',
                    '&:hover': {
                      backgroundColor: '#4297d3',
                    }}} style={customealltheme.palette.filterSubmit}>Submit</Button>
              </Box>
              {/* <Box sx={{minWidth: 130, font: 'font: normal normal 600 12px/16px Segoe UI', marginTop: '22px', display: 'flex', gap: '2px', alignItems: 'center', cursor: 'pointer'}} onClick={handleSideBar}>
                <Box sx={{color: '#0073E4'}}><FilterListIcon style={{fontSize: '28px', fontWeight: '600'}}/></Box>
                <Box sx={{color: '#004F9A', font: 'normal normal 600 12px/16px Segoe UI', fontSize: '15px', fontWeight: '600', transform: 'translateY(-2px)'}}>More Filters</Box>
              </Box> */}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            p: {
              display: 'inline-block',
              marginRight: '2px',
              font: 'normal normal 600 13px/15px \'Segoe UI\'',
              color: '#3174b6',
              cursor: 'pointer',
            },
            marginTop: '30px',
          }}
          style={customealltheme.palette.resetbutton}
        >
          <p onClick={()=>{
            const tempObj = {...selectedDropDownData};
            Object.keys(tempObj).map((el)=>tempObj[el]=[]);
            dispatch(setRoleAccessFilter([]));
            setValueCategory([]);
            setValueCommodity([]);
            setValueRegion([]);
            setEmail('');
            setValueSubCommodity([]);
            setPersonName('');
            dispatch(setSortType(''));

            setbuyOwner([]);
            setValueSector([]);
            setRolesAll([]);
            setFiltersResetClicked((preValue)=> !preValue);
          }}>Reset Filters</p>
        </Box>
      </Box>
      {sidebar=== true && <Box>
        {/* <SidebarPlaybook
          handleSideBar={handleSideBar}
          setValueCategory={ setValueCategory}
          setValueCommodity={setValueCommodity}
          setValueRegion={setValueRegion}
          setEmail={setEmail}
          setValueSubCommodity={setValueSubCommodity}
          setPersonName={setPersonName}
          setPlayBookId={setPlayBookId}
          row={row} handleSubmit={handleSubmit}
          setPlayBookName={setPlayBookName}
        /> */}
      </Box>}
    </ThemeProvider>

  );
}

export default RolesAccessList;
