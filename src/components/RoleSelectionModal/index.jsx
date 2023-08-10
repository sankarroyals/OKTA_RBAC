import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import {useDispatch} from 'react-redux'; // useSelector

import {changeRoleHandler} from '../../redux/RoleBasedAccess';
import Styles from './RoleSelectionModal';

const RoleSelectionModalPopup = ({currentRoleId, availableRoles, handleCloseModal}) => {
  // const [currentRole, setCurrentRole]= useState(null);
  const [selectedRole, setSelectedRole]= useState('');
  // const [isDialogOpen, setDialogOpen]= useState(true);
  const dispatch= useDispatch();

  useEffect(()=>{
    if (currentRoleId) {
      setSelectedRole(currentRoleId);
    }
  }, [currentRoleId]);


  const handleClose =()=>{
    // setDialogOpen(false);
    handleCloseModal();
  };
  const handleChange = (e)=>{
    const newRole= e.target.value;
    if (newRole) {
      setSelectedRole(newRole);
    }
  };

  // console.log('@pep isDialogOpen', isDialogOpen);

  const handleChangeRoleSubmit = ()=>{
    // update the current role to redux store
    // close the popup modal
    if (selectedRole) {
      dispatch(changeRoleHandler(selectedRole));
      handleClose();
    }
  };

  return (
    <Styles.StyledDialog onClose={()=>{}} open={true}>
      <Styles.StyledDialogTitle>Select The Role</Styles.StyledDialogTitle>
      <Box>
        <Styles.StyledFormControl fullWidth>
          <Styles.StyledSelect
            labelId="role-select-label"
            id="role-select"
            value={selectedRole}
            onChange={handleChange}
            displayEmpty
            renderValue={(selected, displayEmpty) => {
              let label='Select';
              if (selected) {
                availableRoles.forEach((role)=>{
                  if (selected===role.role_id) {
                    label=role.description;
                  }
                });
              }
              return label;
            }}
          >
            {availableRoles.map((role)=>{
              return <Styles.StyledMenuItem key={role.role_id} value={role.role_id}>{role.description}</Styles.StyledMenuItem>;
            })}
          </Styles.StyledSelect>
          <Styles.StyledButton onClick={handleChangeRoleSubmit}>Submit</Styles.StyledButton>
        </Styles.StyledFormControl>
      </Box>
    </Styles.StyledDialog>
  );
};

export default RoleSelectionModalPopup;
