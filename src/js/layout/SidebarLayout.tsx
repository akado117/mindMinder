import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { color } from '../styles/theme';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from '../components/sidebar';
import AvatarMenu from '../components/AvatarMenu';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBar: {
      backgroundColor: color.white,
      boxShadow: 'none',
      borderBottom: `1px solid ${color.grey50}`,
      color: color.grey50,
      zIndex: theme.zIndex.drawer - 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    appBarHeaderLogo: {
      marginLeft: 72
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    avatarMenu: {
      position: 'absolute',
      right: 0
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar
    },
    toolbarHeader: {
      justifyContent: 'center'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    noPadding: {
      padding: 0
    }
  })
);

interface SidebarProps {
  noPadding?: boolean;
  children?: ReactNode;
}

const SidebarLayout = (props: SidebarProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isSidebarOpen, _setSidebarOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isSidebarOpen
        })}
      >
        <Toolbar className={classes.toolbarHeader}>
          <img src="/imgs/logo_word.png" alt="logo_header" className={classes.appBarHeaderLogo} />
          <AvatarMenu containerClass={classes.avatarMenu} />
        </Toolbar>
      </AppBar>
      <main className={`${classes.content} ${props.noPadding ? classes.noPadding : ''}`}>
        <div className={classes.toolbar} />
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default SidebarLayout;
