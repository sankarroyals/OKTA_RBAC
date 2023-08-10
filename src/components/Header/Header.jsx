import React, {useEffect, useState} from 'react';
// import {Redirect} from 'react-router';
import {useOktaAuth} from '@okta/okta-react';
import {useDispatch, useSelector} from 'react-redux';
// import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SubHeader from './SubHeader/SubHeader';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Box, Typography} from '@mui/material';
import {AppDialog} from '../../components/App-Dialog/AppDialog';
import logo from '../../assets/logo.svg';
import compassLogo from '../../assets/compassLogo.png';
import './Header.css';

import {updateAuthState, updateAccessToken} from '../../redux/Auth';

import RoleSelectionModalPopup from '../RoleSelectionModal';
import {getUserRoles, getFunctionalityAccess} from '../../redux/RoleBasedAccess';
import './Header.css';

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showChangeRole, setShowChangeRole] = useState(false);
  const [name, setName] = useState('');
  // const [currentRoleID, setCurrentRoleID] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);
  const [tokenManagerSubscriber, setTokenManagerSubscriber] = useState(false);

  // const authState=null;
  // const {oktaAuth, authState} = useOktaAuth();

  // const [isAuthenticated, setIsAuthenticated]=React.useState(false);
  const {oktaAuth, authState} = useOktaAuth();
  const [isAuthenticated, setIsAuthenticated]=React.useState(false);
  const [sessionExpired, setSessionExpired]=React.useState(false);

  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const currentRoleId=useSelector((state)=>state?.roleBasedAccess?.currentRoleId);
  const availableRoles=useSelector((state)=>state?.roleBasedAccess?.availableRoles);


  useEffect(()=>{
    if (availableRoles && availableRoles.length>1) {
      // need to show popup
      setShowModal(true);
      setShowChangeRole(true);
    }
  }, [availableRoles]);


  useEffect(()=>{
    if (currentRoleId) {
      // setCurrentRoleID(currentRoleId);
      setShowModal(false);
      dispatch(getFunctionalityAccess(currentRoleId));
      availableRoles.map((role)=>{
        if (currentRoleId===role.role_id) {
          setCurrentRole(role.description);
        }
      });
    }
  }, [currentRoleId]);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenChangeRole=()=>{
    window.location.href='/home';
  };

  const handleLogout = async () => {
    handleClose();
    oktaAuth.revokeAccessToken();
    oktaAuth.closeSession();
    // await oktaAuth.signOut();
  };

  const handleCloseModal = ()=>{
    setShowModal(false);
  };


  useEffect(()=>{
    if (authState && authState.accessToken && authState.accessToken.accessToken) {
      // async
      dispatch(updateAuthState(authState));

      setIsAuthenticated(authState.isAuthenticated);
      // just to make sure above action is done
      if (availableRoles.length===0) {
        setTimeout(()=>{
          dispatch(getUserRoles());
        }, 100);
      }

      const uName=authState?.idToken?.claims?.name || '';
      setName(uName);

      handleTokenManager(oktaAuth, authState);
    }
  }, [authState, authState?.accessToken?.accessToken]);


  const handleTokenManager = (oktaAuth, authState)=>{
    oktaAuth.tokenManager.add('accessToken', authState.accessToken);
    if (tokenManagerSubscriber===false) {
      oktaAuth.tokenManager.on('expired', function(key, expiredToken) {
        // console.log('@okta Token with key', key, ' has expired:', expiredToken);
        setSessionExpired(true);
        oktaAuth.tokenManager.renew('accessToken')
            .then(function(newToken) {
              dispatch(updateAccessToken(newToken));
              // console.log('@okta Renewed New Token : ', newToken);
            });
      });
      oktaAuth.tokenManager.on('renewed', function(key, newToken, oldToken) {
        // console.log('@okta Token with key', key, 'has been renewed');
        // console.log('@okta Old token:', oldToken);
        // console.log('@okta New token:', newToken);
      });
      setTokenManagerSubscriber(true);
    }
  };

  const handleCloseSessionExpire = () =>{
    window.location.href='/home';
  };
  return (
    <>
      {oktaAuth && isAuthenticated ===true ?
      <>
        {currentRoleId &&
        <>
          <Box
            sx={{
              'bgcolor': '#24589E',
              'display': 'flex',
              'padding': '15px',
              'color': 'white',
              'marginTop': '0px',
              '.MuiBox-root': {
                marginTop: '0px',
              },
            }}
          >
            <Box sx={{display: 'flex', width: '60%', alignItems: 'center', justifyContent: 'space-between'}}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>

                <Box
                  sx={{
                    marginRight: '10px',
                    fontWeight: '700',
                    font: 'normal normal 600 15px/21px \'Segoe UI\'',
                  }}
                >
                  <img src={logo} />
                </Box>
          |
                <Box
                  sx={{
                    // marginRight: '15px',
                    fontWeight: '700',
                    font: 'normal normal 600 15px/21px \'Segoe UI\'',
                    display: 'flex',
                  }}
                >
                  <img style={{'height': '32px', 'marginLeft': '10px'}} src={compassLogo} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  // marginLeft: '15px',
                  font: 'normal normal 600 16px/21px \'Segoe UI\'',
                }}
              >
             Custom Name
              </Box>
            </Box>
            <Box sx={{display: 'flex', width: '40%', alignItems: 'center'}}>
              <Box sx={{width: '50%'}}></Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  width: '50%',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <AccountCircleIcon />
                  <Button
                    sx={{
                      color: 'white',
                      minWidth: '30px',
                      padding: '6px 3px',
                      font: 'normal normal normal 14px/19px \'Segoe UI\'',
                      flexDirection: 'column',
                      textTransform: 'none',
                    }}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    {name}
                    <Typography
                      sx={{
                        fontSize: '11px',
                        fontFamily: 'Segoe UI',

                      }}
                    >{currentRole}</Typography>
                  </Button>
                  <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                    {showChangeRole && <MenuItem onClick={handleOpenChangeRole}>Change Role</MenuItem> }
                    {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                  <ArrowDropDownIcon onClick={handleClick} />
                </Box>
              </Box>
            </Box>
          </Box>
          <SubHeader handleOpenChangeRole={handleOpenChangeRole} />
        </>
        }
        {sessionExpired && <AppDialog open={sessionExpired} handleClose={handleCloseSessionExpire} text={
          'Your session has expired. Please click Ok to refresh your session.'
        }/>}
        {showModal && <RoleSelectionModalPopup currentRoleId={currentRoleId} availableRoles={availableRoles} handleCloseModal={handleCloseModal}/>}
      </>:
      null}
    </>
  );
}

export default Header;
