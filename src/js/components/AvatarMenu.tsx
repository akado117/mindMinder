import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { color, gradients } from '../styles/theme';
import { buttonPrimary } from '../styles/button';
import { goTo } from '../hooks/utils'
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { logout } from '../api/sessions'
import { Profile } from '../api/types'

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      backgroundColor: color.grey
    },
    hide: {
      display: 'none'
    },
    primaryButton: buttonPrimary,
    popover: {
      backgroundImage: gradients.blackBlue
    }
  })
);

interface ContentProps {
  balance: number;
  profile: Profile | undefined;
  authenticated: boolean;
  classes: ReturnType<typeof useStyles>;
}

function AvatarContent({ balance, profile, authenticated, classes }: ContentProps) {
  const handleGoToLogin = goTo('login')

  const avatar = profile?.avatarUrl ? <ListItemAvatar><Avatar src={profile.avatarUrl} /></ListItemAvatar> : null
  const content = authenticated ? <ListItemText primary={profile?.username}  /> :
    <Button variant="contained" className={classes.primaryButton} onClick={handleGoToLogin} >Login</Button>


  return (
    <React.Fragment>
      <ListItem>
        {avatar}
        {content}
      </ListItem>
      {authenticated ? <KeyboardArrowDownIcon /> : null}
    </React.Fragment>
  )
}

interface Props {
  containerClass?: string;
}

const AvatarMenu: FunctionComponent<Props> = ({ containerClass }) => {
  const authState = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch()

  const [isAvatarMenuOpen, setAvatarMenuOpen] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleLogout = () => {
    setAvatarMenuOpen(false);
    dispatch(logout())
  };

  const handleAvatarToggle = () => {
    setAvatarMenuOpen((prevValue) => !prevValue);
  };

  const handleAvatarClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setAvatarMenuOpen(false);
  };

  const prevOpen = React.useRef(isAvatarMenuOpen);
  React.useEffect(() => {
    if (prevOpen.current && !isAvatarMenuOpen) {
      anchorRef.current?.focus();
    }

    prevOpen.current = isAvatarMenuOpen;
  }, [isAvatarMenuOpen]);

  const inner = <AvatarContent
    balance={42069}
    profile={authState.profile}
    authenticated={authState.isAuthenticated}
    classes={classes}
  />
  const menu = authState.isAuthenticated ? <IconButton ref={anchorRef} onClick={handleAvatarToggle}>{inner}</IconButton> : inner

  return (
    <div className={containerClass}>
      {menu}
      <Popper open={isAvatarMenuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper className={classes.popover}>
              <ClickAwayListener onClickAway={handleAvatarClose}>
                <MenuList autoFocusItem={isAvatarMenuOpen} id="menu-list-grow">
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div >
  );
};

export default AvatarMenu;
