import React, {useEffect, useState} from 'react';
import {Badge, Divider, IconButton, List, ListItem, ListItemText, ListSubheader, Popover} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import axiosInstance from '../../apis/axiosInstance';

function Notification(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // axiosInstance.get('/notification/allInAppNotifications?lastNDays=30')
    const current = new Date();
    const endDate = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const startDate = `${current.getFullYear()}-${current.getMonth()}-01`;

    axiosInstance.get(`/notification/allInAppNotifications?startDate=${startDate}&endDate=${endDate}`)
        .then((response) => {
          setNotifications(response?.data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsRead = (item) => {
    setNotifications(notifications.map((n) => {
      return n.id == item.id ? {...item, app_notif_status: 'CLOSED'} : n;
    }));
    axiosInstance.put(`/notification/setInAppNotificationStatus?notificationId=${item.id}&status=CLOSED`);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return <>
    <IconButton
      size="large"
      aria-label="show 17 new notifications"
      color="inherit"
      aria-describedby={id}
      variant="contained"
      onClick={handleClick}
    >
      <Badge badgeContent={notifications?.filter((n) => n.app_notif_status == 'NEW').length || 0} color='error'>
        <NotificationsNoneIcon />
      </Badge>
    </IconButton>

    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      sx={{
        'maxHeight': '400px',
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <List
        sx={{
          'maxWidth': '400px',
          'minWidth': '300px',
        }}
        subheader={
          <ListSubheader component="div" sx={{fontWeight: 'bold', fontSize: '15px', fontFamily: 'Segoe UI', color: '#0F5DAA'}} id="nested-list-subheader">
            Notifications
          </ListSubheader>
        }>
        {
          notifications
              ?.map((n, i) => <><ListItem key={i} onClick={() => {
                markAsRead(n);
              }}>
                <span className='textNotify' style={{cursor: n.app_notif_status == 'NEW' ? 'pointer' : 'arrow',
                  opacity: n.app_notif_status == 'NEW' ? 1 : 0.6}}
                >
                  {n.notify_msg}
                </span>
              </ListItem>
              <Divider />
              </>,
              )
        }
        {
          (notifications == null || notifications?.length == 0 || notifications?.filter((n) => n.app_notif_status == 'NEW').length == 0) && <ListItem>
            <ListItemText primary={'No new notification found.'} />
          </ListItem>
        }
      </List>
    </Popover>
  </>;
}

export default Notification;
