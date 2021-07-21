import React, { FunctionComponent } from 'react';
import clsx from 'clsx';
import get from 'lodash/get';
import * as API from 'api';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { color } from 'CommunityApp/styles/theme';
import { setIsAuthenticated } from 'store/session';
import { useAppDispatch, useAppSelector } from 'CommunityApp/hooks/storeHooks';
import Avatar from '@material-ui/core/Avatar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Grow from '@material-ui/core/Grow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {
      backgroundColor: color.grey50
    },
    hide: {
      display: 'none'
    }
  })
);

interface Props {
  containerClass?: string;
}

const AvatarMenu: FunctionComponent<Props> = ({ containerClass }) => {
  const authState = useAppSelector(({ auth }) => auth);
  const dispatch = useAppDispatch();

  const [isAvatarMenuOpen, setAvatarMenuOpen] = React.useState(false);
  const currentUserInitials = get(authState, ['admin', 'initials'], '');
  const theme = useTheme();
  const classes = useStyles(theme);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleLogout = () => {
    API.logout().then(() => {
      dispatch(setIsAuthenticated(false));
      window.location.assign('/community');
    });
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

  return (
    <div
      className={clsx(containerClass, {
        [classes.hide]: !authState.isAuthenticated
      })}
    >
      <IconButton ref={anchorRef} onClick={handleAvatarToggle}>
        <Avatar className={classes.avatar}>{currentUserInitials}</Avatar>
        <KeyboardArrowDownIcon />
      </IconButton>
      <Popper open={isAvatarMenuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleAvatarClose}>
                <MenuList autoFocusItem={isAvatarMenuOpen} id="menu-list-grow">
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default AvatarMenu;
