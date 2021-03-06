import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Main from './Main';
import { browserHistory } from 'react-router';
import axios from 'axios';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    axios.get('/checkSession', {withCredentials: true})
    .then(response => {
      console.log(response.data)
      if (response.data == true) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }).catch(error => {
      console.log(error);
    });
    // setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getUser = () => {
    axios.get('/getUser', {withCredentials: true})
    .then(response => {
      console.log(response.data[0].level)
      if (response.data[0].leve === 0) {
        browserHistory.push("/userhome");
      } else {
        browserHistory.push("/home");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  const getLogout = () => {
    axios.get('/logout', {withCredentials: true})
    .then(response => {
      if (response.data) {
      } else {
        browserHistory.push("/");
      }
    }).catch(error => {
      console.log(error);
    });
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            OSD - Produces
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <i class="fas fa-angle-double-left"></i> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['หน้าแรก'].map((text, index) => (
            <ListItem button key={text} component="a" onClick={getUser}>
              <ListItemIcon>{<i class="fas fa-home"></i>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {['เพิ่มข้อมูลผลิตภัณฑ์'].map((text, index) => (
            <ListItem button key={text} component="a" href="/addproduce" hidden={false}>
              <ListItemIcon>{<i class="fas fa-plus-circle"></i>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['ออกจากระบบ'].map((text, index) => (
            <ListItem button key={text} onClick={getLogout}>
              <ListItemIcon>{<i class="fas fa-sign-out-alt"></i>}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          {/* {['Test'].map((text, index) => (
            <ListItem button key={text} onClick={handleClick}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem button component="a" href="https://www.google.com">
            <ListItemText primary="Google" />
          </ListItem> */}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Main></Main>
      </main>
    </div>
  );
}
