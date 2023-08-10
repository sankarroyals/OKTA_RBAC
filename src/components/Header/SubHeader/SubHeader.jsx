import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Box} from '@mui/material';

import {useSelector} from 'react-redux';


function SubHeader() {
  const {pathname} = useLocation();


  const [showRolesAccessMenu, setShowRolesAccessMenu] = useState(false);
  const [menuPagesToShow, setMenuPagesToShow]=useState({
    Home: false,
    FX_Rates: false,
    Guidance_Price: false,
    Forecast: false,
    Target: false,
  });
  const availableFunctionality=useSelector((state)=>state?.roleBasedAccess?.functionalityAccess);
  useEffect(()=>{
    if (availableFunctionality) {

      if (availableFunctionality['Configuration:Roles_&Access']) {
        setShowRolesAccessMenu(true);
      }
      const menuPagesToShows = {};


      const functionalityAccessKeys = Object.keys(availableFunctionality);
      if (functionalityAccessKeys.some((functionalityName)=> ~functionalityName.indexOf('Home_Page'))) {
        menuPagesToShows['Home']= true;
      }
      if (functionalityAccessKeys.some((functionalityName)=> functionalityName==='Forecast')) {
        menuPagesToShows['Forecast']= true;
      }
      if (functionalityAccessKeys.some((functionalityName)=> ~functionalityName.indexOf('Targets'))) {
        menuPagesToShows['Target']= true;
      }

      setMenuPagesToShow(menuPagesToShows);
    }
  }, [availableFunctionality]);



  const commonStyle = {
    cursor: 'pointer',
    marginLeft: '10px',
    marginRight: '15px',
    flexGrow: 1,
    flexShrink: 0,
    a: {
      color: 'white',
      textDecoration: 'none',
      font: 'normal normal 600 14px/21px \'Segoe UI\'',
      opacity: '1',
      paddingBottom: '2px',
    },
  };


  return (
    <Box
      sx={{
        'bgcolor': '#215094',
        'display': 'flex',
        'padding': '22px 10px 10px 10px',
        'color': 'white',
        'height': '34px',
        'marginTop': '0px',
        '.MuiBox-root': {
          marginTop: '0px',
        },
      }}
    >
      <Box
        sx={{
          // width: '40%',
          display: 'flex',
          fontSize: '14px',
          position: 'relative',
        }}
      >
        {menuPagesToShow.Home &&
          <Box sx={commonStyle}>
            <Link
              to="/home"
              style={{
                borderBottom: pathname === '/home' ? '2px solid #efbc28' : 'none',
              }}
            >
              Home
            </Link>
          </Box>
        }
        { showRolesAccessMenu &&
              <Box sx={commonStyle}>
              <Link
                to="/roles"
                style={{
                  borderBottom: pathname === '/roles' ? '2px solid #efbc28' : 'none',
                }}
              >
                Roles & Access
              </Link>
            </Box>
              }
      </Box>
      <Box sx={{width: '60%'}}></Box>
    </Box>
  );
}

export default SubHeader;
