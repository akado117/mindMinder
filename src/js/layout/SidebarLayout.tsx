import React, { ReactElement } from 'react'
import clsx from 'clsx'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar'
import CssBaseline from '@material-ui/core/CssBaseline'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import MenuIcon from '@material-ui/icons/Menu';
import Slide from '@material-ui/core/Slide';
import { color, gradients } from '../styles/theme'
import { goTo } from '../hooks/utils'
import AvatarMenu from '../components/AvatarMenu'
import Avatar from '@material-ui/core/Avatar';
import WindowHeightContainer from './WindowHeightContainer'
import { DrawerNav, HorizontalNav } from './Nav'


const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: '100%',
    },
    appBar: {
      backgroundColor: color.white,
      boxShadow: 'none',
      borderBottom: `1px solid ${color.grey}`,
      color: color.grey,
      zIndex: theme.zIndex.drawer - 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      height: '90px',
    },
    appBarHeaderLogo: {
      marginLeft: '1rem',
      [theme.breakpoints.down('sm')]: {
        marginRight: '2rem',
      }

    },
    swapButton: {
      backgroundColor: 'white',
      padding: '.8rem 2rem',
      borderRadius: '1rem',
      fontSize: '1.1rem',
      cursor: 'pointer',
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      height: '90px',
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    toolbarHeader: {
      backgroundColor: color.primaryBlue,
      display: 'grid',
      gridTemplateColumns: '1fr 2fr 1fr',
      gridTemplateRows: 'auto',
      width: '100%',
      height: '90px',
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr .5fr 1fr',
      }
    },
    toolbarLeft: {
      gridColumn: 1
    },
    toolbarMiddle: {
      gridColumn: 2,
      justifySelf: 'center'
    },
    toolbarRight: {
      gridColumn: 3,
      justifySelf: 'right'
    },
    hideSmall: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    hideBeyondSmall: {
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      height: '100%',
    },
    noPadding: {
      padding: 0,
    },
    contentBackground: {
      backgroundImage: gradients.blackBlue,
      height: '100%',
    },
    navDrawer: {
      backgroundImage: gradients.blackBlue
    },
    avatar: {
      width: '54px',
      height: '54px',
      backgroundColor: color.primaryPurple
    }
  }),
)

interface SidebarProps {
  noPadding?: boolean
  children: ReactElement<any, any>
  includeWindowHeightContainer?: boolean
  allowOverflow?: boolean
}

interface HideOnScrollProps {
  children: ReactElement<any, any>
}

function HideOnScroll(props: HideOnScrollProps) {
  
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  );
}

const SidebarLayout = (props: SidebarProps) => {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)

  const content = <div className={classes.contentBackground}>{props.children}</div>  

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setSidebarOpen(open);
  };

  const goHome = goTo('home')

  const appBar = (<AppBar
    position="sticky"
    className={clsx(classes.appBar, {
      [classes.appBarShift]: false,
    })}
  >
    <Toolbar className={classes.toolbarHeader}>
      <div className={`${classes.hideBeyondSmall} ${classes.toolbarLeft}`}>
        <button onClick={toggleDrawer(true)}>
          <MenuIcon fontSize='large'/>
        </button>
      </div>
      <div onClick={goHome} className={`${classes.hideSmall} ${classes.toolbarLeft}`}>
        <Avatar className={classes.avatar}>MM</Avatar>
        {/* <img src="/imgs/logo_plain.png" alt="logo_header" className={classes.appBarHeaderLogo} /> */}
      </div>
      <div onClick={goHome} className={`${classes.hideBeyondSmall} ${classes.toolbarMiddle}`}>
        <Avatar className={classes.avatar}>MM</Avatar>
        {/* <img src="/imgs/logo_plain.png" alt="logo_header" className={classes.appBarHeaderLogo} /> */}
      </div>
      <div className={`${classes.hideSmall} ${classes.toolbarMiddle}`}>
        <HorizontalNav />
      </div>
      <div className={classes.toolbarRight}>
        <AvatarMenu />
      </div>
    </Toolbar>
  </AppBar>)

  const inside = (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll>
        {appBar}
      </HideOnScroll>
      <main className={`${classes.content} ${props.noPadding ? classes.noPadding : ''}`} >
        {content}
      </main>
    </React.Fragment>
  )

  const heightContainer = props.includeWindowHeightContainer ? (
    <WindowHeightContainer heightCompensation={0} useWhenDesktop allowOverflow={props.allowOverflow}>
      {inside}
      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleDrawer(false)}>
        <DrawerNav />
      </Drawer>
    </WindowHeightContainer>
  ) : (
    content
  )

  return (
    <div className={classes.root}>
      {heightContainer}
    </div>
  )
}

export default SidebarLayout
