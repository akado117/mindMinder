import React, { ReactNode} from 'react'
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GavelIcon from '@material-ui/icons/Gavel';
import Tooltip from '@material-ui/core/Tooltip';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import {color } from '../styles/theme'
import { path } from '../routes/routeList';
import { Link } from 'react-router-dom';

type Path = keyof typeof path;

const useStyles = makeStyles({
  root: {
    '& > a': {
      margin: '.75rem',
    }
  },
  active: {
    color: color.white,
    pointerEvents: 'none'
  },
  drawer: {
    color: color.white
  },
  drawerActive: {
    color: color.grey
  }
})


function handleClasses(key: Path, classes: ReturnType<typeof useStyles>, currentPath: string) {
  return key === currentPath ? classes.active : ""
}

function handleDrawerClasses(key: Path, classes: ReturnType<typeof useStyles>, currentPath: string) {
  return key === currentPath ? `${classes.drawerActive}` : classes.drawer
}

type MapKeys =  'home' | 'live' | 'messages' |'explore' |'auction' |'goLive' |'buy'

const labels: { [key in MapKeys]: string } = {
  home: 'Home',
  // live: 'Live Now',
  // messages: 'Messages',
  explore: 'Common Distortions',
  // auction: 'Auctions',
  // goLive: 'Go Live!',
  buy: 'Troll lololoool'
}

const icons: { [key in MapKeys]: ReactNode } = {
  home: <HomeOutlinedIcon fontSize="large"/>,
  // live: <SettingsInputAntennaIcon fontSize="large" />,
  // messages: <PeopleIcon fontSize="large" />,
  explore: <FavoriteIcon fontSize="large" />,
  // auction: <GavelIcon fontSize="large" />,
  // goLive: <LiveTvIcon fontSize="large" />,
  buy: <MonetizationOnIcon fontSize="large" />
}

const pathMap: { [key in MapKeys]: string } = {
  home: path.home ,
  // live: path.rick ,
  // messages: path.rick,
  explore: path.distortions,
  // auction: path.rick,
  // goLive: path.rick,
  buy: path.rick
}

const keys = Object.keys(labels) as Array<MapKeys>

export const HorizontalNav = () => {
  const location = useLocation();
  const classes = useStyles()
  const currentPath = location.pathname

  return (
    <div className={classes.root}>
      {keys.map((key) => (
        <Tooltip title={labels[key]} key={key}>
          <Link to={pathMap[key]} className={handleClasses(pathMap[key] as Path, classes, currentPath)}>
            {icons[key]}
          </Link>
        </Tooltip>
      ))}
    </div>
  )
}

export const DrawerNav = () => {
  const location = useLocation();
  const classes = useStyles()
  const currentPath = location.pathname
  return (
  <List>
    {keys.map((key) => {
      const dclasses = handleDrawerClasses(pathMap[key] as Path, classes, currentPath)
      return (
        <Link to={pathMap[key]} key={key} >
          <ListItem button>
            <ListItemIcon className={dclasses}>{icons[key]}</ListItemIcon>
            <ListItemText className={dclasses} primary={labels[key]} />
          </ListItem>
        </Link>
    )
    }
    )}
  </List>)
}