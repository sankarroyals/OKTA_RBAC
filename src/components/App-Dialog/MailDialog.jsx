/* eslint-disable no-unused-vars */
import {Dialog, DialogContent} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {AppButton} from '../AppButton/AppButton';
import ConfigurationServices from '../../../services/ConfigurationServices';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {monthArr} from '../../../services/utils';

export const MailDialog = ({open, selectedRow, covPendErrRow, handleClose, text, accessControl}) => {
  const [ccMail, setccMail] = useState([]);
  const [currentRole, setCurrentRole] = useState(null);
  const [emailIdLoaded, setEmailIdLoaded] = useState(false);
  const currentRoleId=useSelector((state)=>state?.roleBasedAccess?.currentRoleId);
  const availableRoles=useSelector((state)=>state?.roleBasedAccess?.availableRoles);
  const [toMail, setToMail] = useState([]);
  const [buyPlanName, setBuyplanName] = useState('');

  useEffect(()=>{
    if (currentRoleId) {
      availableRoles.map((role)=>{
        if (currentRoleId===role.role_id) {
          setCurrentRole(role.description);
        }
      });
    }
  }, [currentRoleId]);

  useEffect(() => {
    // setEmailId([]);
    if (!_.isEmpty(covPendErrRow) && (accessControl=='Edit')) {
      setEmailIdLoaded(false);
      ConfigurationServices.getUserEmailList(covPendErrRow.buyPlanId)
          .then((res)=>{
            console.log(res);
            setTimeout(()=>{
              if (res !=undefined && typeof res !== 'string') {
                const keys = [];
                res.length>0 && Object.keys(res[0]).map((obj) => {
                  if (obj.split('_').includes('id')) {
                    keys.push(obj);
                  }
                });
                if (res.length > 0) {
                  setBuyplanName(res[0]['buy_plan_name']);
                }
                if (res['userMessage']) {
                  setccMail([]);
                // setErrMsg(res['userMessage']);
                } else {
                  const ccMail = [];
                  const toMail = [];
                  // const rolesRequired = ['PlayBook Owner', 'BuyPlan Approver', 'BuyPlan Owner', 'Central Admin', 'BuyPlan Admin', 'Sector Admin', 'BuyPlan Creator'];
                  res.forEach((buyplanRoles) => {
                    if (!ccMail.includes(buyplanRoles.email) && (buyplanRoles.role_name=='BuyPlan Creator' || buyplanRoles.role_name =='Central Admin' || buyplanRoles.role_name =='Sector Admin')) {
                      ccMail.push(buyplanRoles.email);
                    }
                    if (!toMail.includes(buyplanRoles.email) && (buyplanRoles.role_name=='BuyPlan Approver' || buyplanRoles.role_name=='BuyPlan Owner' || buyplanRoles.role_name=='PlayBook Owner')) {
                      toMail.push(buyplanRoles.email);
                    }
                  });
                  // console.log(resEmail);
                  // console.log(toMail);
                  setToMail([...toMail]);
                  setccMail([...ccMail]);
                  setEmailIdLoaded(true);
                }
              } else {
                // setErrMsg('Error Occured due to backend connection.');
              };
            }, 1000);
          });
    }
  }, [covPendErrRow]);

  function sendEmail() {
    const PresentMonth = new Date().getMonth()-1;
    const PrevMonth = monthArr[PresentMonth];
    // const email = message.emailId;
    // const subject = `Approval request to re-open and edit ${PrevMonth} ${buyPlanName} `;
    const subject = `Compass Service Request - Prior Month Coverage Update`;
    // const emailBody = `Please provide approval access to edit ${PrevMonth} ${buyPlanName}. The Buy Plan could not be closed because -
    const emailBody = `Please approve the upload of below coverage information in ${buyPlanName} for ${PrevMonth}.`;
    const emailBody2='\nClick on this link to Redirect to Application: '+ window.location.href;
    // consosole.log({emailId});
    if (emailIdLoaded) {
      document.location = 'mailto:'+[...toMail, 'DL-CompassSupport@pepsico.com']+'?cc='+ccMail +'&subject='+subject+'&body='+encodeURIComponent(emailBody+emailBody2);
      handleClose();
    }
  }

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
        </div>
        <center>
          <div style={{padding: '1rem'}}>
            {
                accessControl=='Edit' ?
                <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                  <AppButton variant="outlined" label="Close" onClick={() => handleClose()} />
                  <AppButton disabled={ccMail.length<=0 || !emailIdLoaded} label="Send Email" onClick={sendEmail} />
                </div> :
                <AppButton label="Ok" onClick={() => handleClose()} />
            }
          </div>
        </center>
      </DialogContent>
    </Dialog>
  );
};
