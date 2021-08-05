import 'react-calendar/dist/Calendar.css';
import clsx from 'clsx';
import React, { useState, FunctionComponent } from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import { addDays, isWithinInterval, isSameDay, format } from 'date-fns';
import { color } from '../../styles/theme';
import RemoveIcon from '@material-ui/icons/Remove';
import DatePickerViewCard from '../../components/DatePicker/DatePickerViewCard';

const useStyles = makeStyles(() =>
  createStyles({
    viewCardContainer: {
      alignItems: 'center',
      display: 'flex'
    },
    viewCardDivider: {
      position: 'relative',
      top: 12
    },
    calendar: {
      border: '1px solid rgba(214, 213, 213, 0.44)',
      borderRadius: 32,
      position: 'absolute',
      right: 36,
      zIndex: 10
    },
    tileBaseClass: {
      height: 50
    },
    primaryActive: {
      background: '#316094',
      color: color.white
    },
    secondaryActive: { background: '#EFF0F7' },
    betweenSelection: {
      background: '#EFF0F7',
      color: color.grey
    },
    leftBorderCircle: { borderRadius: '24px 0 0 24px' },
    rightBorderCircle: { borderRadius: '0 24px 24px 0' },
    fullBorderCircle: { borderRadius: 24 },
    hide: { display: 'none' }
  })
);

interface Props {
  handleDateChange: (event: string[]) => void;
  selectedRange?: Date[];
}

function convertToDateString(dates: Date[]) {
  return dates.map((date) => {
    return format(date, 'YYYY-MM-DD');
  });
}

const DatePickerComponent = ({ handleDateChange, selectedRange }: Props) => {
  const today = new Date();
  const initRange = selectedRange || [today, today];
  const [range, changeRange] = useState<Date[]>(initRange);
  const [showCalendar, toggleCalendar] = useState(false);
  const startDate = range[0] || today;
  const endDate = range[1] || today;

  const theme = useTheme();
  const classes = useStyles(theme);

  const singleDateSelected = isSameDay(startDate, endDate);

  const handleDateSelected = (updatedRange: Date | Date[]) => {
    if (updatedRange instanceof Date) {
      return;
    } else {
      changeRange(updatedRange);
      handleDateChange(convertToDateString(updatedRange));
      toggleCalendar(false);
    }
  };

  const handleToggleCalendar = () => {
    toggleCalendar(!showCalendar);
  };

  const handleUpArrow = (event: React.MouseEvent<SVGSVGElement, Event>) => {
    event.stopPropagation();
    const newRange = [addDays(startDate, 1), addDays(endDate, 1)];
    handleDateSelected(newRange);
  };

  const handleDownArrow = (event: React.MouseEvent<SVGSVGElement, Event>) => {
    event.stopPropagation();
    const newRange = [addDays(startDate, -1), addDays(endDate, -1)];
    handleDateSelected(newRange);
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const tileClasses = [classes.tileBaseClass];
    if (isSameDay(date, startDate) && isSameDay(date, endDate)) {
      tileClasses.push(classes.primaryActive, classes.fullBorderCircle);
    } else if (isSameDay(startDate, date)) {
      tileClasses.push(classes.primaryActive, classes.leftBorderCircle);
    } else if (isSameDay(endDate, date)) {
      tileClasses.push(classes.primaryActive, classes.rightBorderCircle);
    } else if (isWithinInterval(date, { start: startDate, end: endDate })) {
      tileClasses.push(classes.betweenSelection);
    } else if (isSameDay(today, date)) {
      tileClasses.push(classes.secondaryActive, classes.fullBorderCircle);
    }

    return clsx(tileClasses);
  };

  return (
    <div>
      <div className={classes.viewCardContainer} onClick={handleToggleCalendar}>
        {!singleDateSelected && <DatePickerViewCard date={startDate} />}
        {!singleDateSelected && <RemoveIcon className={classes.viewCardDivider} />}
        <DatePickerViewCard
          date={endDate}
          viewNavArrows
          handleUpArrow={handleUpArrow}
          handleDownArrow={handleDownArrow}
        />
      </div>
      <Calendar
        className={clsx(classes.calendar, {
          [classes.hide]: !showCalendar
        })}
        onChange={(event: Date | Date[]) => handleDateSelected(event)}
        value={range}
        returnValue="range"
        selectRange
        minDetail="year"
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default DatePickerComponent;
