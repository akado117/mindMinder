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
  live: 'Live Now',
  messages: 'Messages',
  explore: 'Explore',
  auction: 'Auctions',
  goLive: 'Go Live!',
  buy: 'Buy, Swap, Bridge'
}

const icons: { [key in MapKeys]: ReactNode } = {
  home: <HomeOutlinedIcon fontSize="large"/>,
  live: <SettingsInputAntennaIcon fontSize="large" />,
  messages: <PeopleIcon fontSize="large" />,
  explore: <FavoriteIcon fontSize="large" />,
  auction: <GavelIcon fontSize="large" />,
  goLive: <LiveTvIcon fontSize="large" />,
  buy: <MonetizationOnIcon fontSize="large" />
}

const pathMap: { [key in MapKeys]: string } = {
  home: path.home ,
  live: path.rick ,
  messages: path.rick,
  explore: path.rick,
  auction: path.rick,
  goLive: path.rick,
  buy: path.swap
}

const keys = Object.keys(labels) as Array<MapKeys>

export const HorizontalNav = () => {
  const location = useLocation();
  const classes = useStyles()
  const currentPath = location.pathname

  return (
    <div className={classes.root}>
      {/* {keys.map((key) => (
        <Tooltip title={labels[key]} key={key}>
          <Link to={pathMap[key]} className={handleClasses(pathMap[key] as Path, classes, currentPath)}>
            {icons[key]}
          </Link>
        </Tooltip>
      ))} */}
      <div id="menulist">
        <ul>
          <li><a href="#statistics">Statistics</a></li>
          <li><a href="#tokenomics">Tokenomics</a></li>
          <li><a href="#roadmaparea">Roadmap</a></li>
          <li><a className="goToPlatform" href="#" target="_blank">Platform</a></li>
          <li><a href="https://cuminu.medium.com/" target="_blank">Blog</a></li>
          <li><a href="#socialmedia">Media</a></li>
          <li><a href="#">Links</a>
            <ul>
              <li><a href="https://twitter.com/CumInuToken" target="_blank">Twitter</a></li>
              <li><a href="https://t.me/CumInuToken" target="_blank">Telegram</a></li>
              <li><a
                  href="https://www.dextools.io/app/uniswap/pair-explorer/0x7b412f141996411401f57e2ba1bc2235af807d4d"
                  target="_blank">DEXT</a></li>
              <li><a href="https://solidity.finance/audits/CumInu/" target="_blank">Solidity Audit</a></li>
              <li><a href="https://etherscan.io/address/0xd6327ce1fb9D6020E8C2c0E124A1eC23DCAb7536"
                  target="_blank">Etherscan</a></li>
              <li><a
                  href="https://team.finance/view-coin/0xd6327ce1fb9D6020E8C2c0E124A1eC23DCAb7536?name=Cum%20Inu&amp;symbol=CUMINU"
                  target="_blank">Token Locks</a></li>
              <li><a href="cuminu-whitepaper.pdf" target="_blank">White Paper</a></li>
              <li><a href="cuminu-researchReport.pdf" target="_blank">Research Report</a></li>
            </ul>
          </li>
        </ul>
      </div> 
    </div>
  )
}

export const DrawerNav = () => {
  const location = useLocation();
  const classes = useStyles()
  const currentPath = location.pathname
  return (
  <List>
    {/* {keys.map((key) => {
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
    )} */}
    {/* <ListItem>
      <a href="#"></a>
    </ListItem> */}
    <ul>
      <li><a href="#statistics">Statistics</a></li>
      <li><a href="#tokenomics">Tokenomics</a></li>
      <li><a href="#roadmaparea">Roadmap</a></li>
      <li><a className="goToPlatform" target="_blank">Platform</a></li>
      <li><a href="https://cuminu.medium.com/" target="_blank">Blog</a></li>
      <li><a href="#socialmedia">Media</a></li>
      <li><a href="/cuminu-whitepaper.pdf" target="_blank">White Paper</a></li>
      <li><a href="/cuminu-researchReport.pdf" target="_blank">Research Report</a></li>
      <li><a className="swap-btn" target="_blank" href="/swap/index.html">Swap</a></li>
      <li><a className="creatorprereg" href="#hero" style={{padding:'0!important', margin: 0, border: 'none'}}>Creator
          Pre-register</a></li>
    </ul>
  </List>)
}