import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { color } from 'CommunityApp/styles/theme';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import EntrataIcon from 'icons/sidebar_icon_entrata.svg';
import BreezewayIcon from 'icons/sidebar_icon_breezeway.svg';
import RemoteLockIcon from 'icons/sidebar_icon_remote_lock.svg';
import GuestyIcon from 'icons/sidebar_icon_guesty.svg';

interface Props {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  open: boolean;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      color: color.grey50,
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      // necessary for content to be below app bar
      ...theme.mixins.toolbar
    },
    hide: {
      display: 'none'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    homeIcon: {
      border: `1px solid ${color.grey50}`,
      backgroundColor: color.white,
      borderRadius: '25%',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.08), 0px 4px 8px rgba(50, 50, 71, 0.006)',
      height: 42,
      width: 42
    },
    circleIcon: {
      border: `1px solid ${color.grey50}`,
      backgroundColor: color.white,
      borderRadius: '50%',
      height: 42,
      width: 42
    }
  })
);

const Sidebar: FunctionComponent<Props> = ({ handleDrawerOpen, handleDrawerClose, open }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })
      }}
    >
      <div className={classes.menuButton}>
        {!open ? (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx({ [classes.hide]: open })}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </div>
      <Divider variant="middle" />
      <List>
        <ListItem button key="Home">
          <ListItemIcon>
            <SvgIcon component={HomeOutlinedIcon} className={classes.homeIcon} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider variant="middle" />
      <List>
        <ListItem
          button
          component="a"
          href="https://app.breezeway.io/dashboard/property"
          target="_blank"
          key="Breezeway"
        >
          <ListItemIcon>
            <SvgIcon component={BreezewayIcon} className={classes.circleIcon} viewBox="-8 -2 36 36" />
          </ListItemIcon>
          <ListItemText primary="Breezeway" />
        </ListItem>
        <ListItem button component="a" href="https://daydreamapartments.entrata.com/" target="_blank" key="Entrata">
          <ListItemIcon>
            <SvgIcon component={EntrataIcon} className={classes.circleIcon} viewBox="3 2 36 36" />
          </ListItemIcon>
          <ListItemText primary="Entrata" />
        </ListItem>
        <ListItem button component="a" href="https://app.guesty.com/" target="_blank" key="Guesty">
          <ListItemIcon>
            <SvgIcon component={GuestyIcon} className={classes.circleIcon} viewBox="1 0 38 38" />
          </ListItemIcon>
          <ListItemText primary="Guesty" />
        </ListItem>
        <ListItem button component="a" href="https://connect.remotelock.com/" target="_blank" key="RemoteLock">
          <ListItemIcon>
            <SvgIcon component={RemoteLockIcon} className={classes.circleIcon} viewBox="0 0 40 40" />
          </ListItemIcon>
          <ListItemText primary="RemoteLock" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
