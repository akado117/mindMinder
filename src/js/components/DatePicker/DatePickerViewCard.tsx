import clsx from 'clsx';
import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { color } from 'CommunityApp/styles/theme';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      cursor: 'pointer',
      flexDirection: 'column',
      fontFamily: 'Poppins',
      color: color.greyscaleTitleActive,
      margin: '0 8px'
    },
    monthLabel: {
      fontWeight: 600,
      fontSize: 13,
      lineHeight: '22px',
      display: 'flex',
      alignItems: 'center',
      letterSpacing: 0.25,
      color: color.communityBlue
    },
    dayLabels: {
      display: 'flex',
      lineHeight: '40px',
      fontSize: 33
    },
    dayName: { fontWeight: 'bold' },
    dayNumber: {
      marginLeft: 16
    },
    navArrows: {
      display: 'flex',
      flexDirection: 'column',
      marginLeft: 16,
      width: 24,
      height: 24
    },
    navArrow: {
      height: 16,
      width: 16
    },
    hide: { display: 'none' }
  })
);

interface Props {
  date: Date;
  viewNavArrows?: boolean;
  handleUpArrow?: (event: React.MouseEvent<SVGSVGElement, Event>) => void;
  handleDownArrow?: (event: React.MouseEvent<SVGSVGElement, Event>) => void;
}

const DatePickerViewCard: FunctionComponent<Props> = ({ date, viewNavArrows, handleUpArrow, handleDownArrow }) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const upArrowClick = (event: React.MouseEvent<SVGSVGElement, Event>) => {
    if (handleUpArrow) handleUpArrow(event);
  };

  const downArrowClick = (event: React.MouseEvent<SVGSVGElement, Event>) => {
    if (handleDownArrow) handleDownArrow(event);
  };

  return (
    <div className={classes.container}>
      <div className={classes.monthLabel}>{format(date, 'MMMM')}</div>
      <div className={classes.dayLabels}>
        <div className={classes.dayName}>{format(date, 'dddd')}</div>
        <div className={classes.dayNumber}>{format(date, 'D')}</div>
        <div
          className={clsx(classes.navArrows, {
            [classes.hide]: !viewNavArrows
          })}
        >
          <KeyboardArrowUpIcon className={classes.navArrow} onClick={(event) => upArrowClick(event)} />
          <KeyboardArrowDownIcon className={classes.navArrow} onClick={(event) => downArrowClick(event)} />
        </div>
      </div>
    </div>
  );
};

export default DatePickerViewCard;
