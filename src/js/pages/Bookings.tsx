import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { rowStack, spaceBetween } from 'CommunityApp/styles/layout';
import { color2 } from 'CommunityApp/styles/theme';
import { useAppSelector, useAppDispatch } from 'CommunityApp/hooks/storeHooks';
import { getBookings, bookingParamsFromState } from 'CommunityApp/api/bookings';
import { setTab, setDates, convertDateStringToDate, setBookingError } from 'CommunityApp/store/bookingSlice';
import DatePicker from 'CommunityApp/components/DatePicker/DatePicker';
import Table from 'CommunityApp/components/BookingsTable';

type Styles = Record<string, string>;

type TabType = {
  text: string;
  onClick: () => void;
  isActive: boolean;
  rowCount: number;
  styles: Styles;
};

type TabsType = {
  selectedTab: string;
  rowCount: number;
  styles: Styles;
};

const useStyles = makeStyles(() => ({
  tab: {
    borderRadius: '1.25rem',
    '&.active': {
      backgroundColor: color2.activeButton
    },
    '& > *': {
      textTransform: 'capitalize',
      size: '1rem',
      padding: '.25rem 1rem'
    }
  },
  tabContainer: {
    ...rowStack('.5rem')
  },
  controls: {
    ...spaceBetween,
    alignItems: 'flex-end',
    marginBottom: '2rem'
  },
  error: {
    ...spaceBetween,
    backgroundColor: color2.warningBg,
    border: `3px solid ${color2.warning}`,
    borderRadius: '8px',
    padding: '1rem',
    width: '50%'
  }
}));

const Tab = ({ text, onClick, isActive, rowCount, styles }: TabType): JSX.Element => {
  const tabText = isActive ? `${text} (${rowCount})` : text;
  const tabClass = `${styles.tab} ${isActive ? 'active' : ''}`;
  return (
    <div className={tabClass}>
      <Button onClick={onClick}>{tabText}</Button>
    </div>
  );
};

const tabDisplayName = (name: string) => name.replace('_', ' ');

function Tabs({ selectedTab, rowCount, styles }: TabsType) {
  const tabs = ['checking_in', 'in_residence', 'checking_out'];
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className={styles.tabContainer}>
        {tabs.map((tab) => (
          <Tab
            key={tab}
            onClick={() => dispatch(setTab(tab))}
            text={tabDisplayName(tab)}
            isActive={selectedTab === tab}
            styles={styles}
            rowCount={rowCount}
          />
        ))}
      </div>
    </div>
  );
}

interface ErrorProps {
  error: string;
  classes: ReturnType<typeof useStyles>;
  dispatch: ReturnType<typeof useAppDispatch>;
}
const BookingError = ({ error, dispatch, classes }: ErrorProps) => {
  if (!error) return null;

  return (
    <Paper elevation={3} className={classes.error}>
      <div>{error}</div>
      <Button onClick={() => dispatch(setBookingError(''))}>X</Button>
    </Paper>
  );
};

export default function Bookings() {
  const bookingState = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const styles = useStyles(useTheme());

  const { startDate, endDate, selectedTab } = bookingState.params;

  const dateRange = [convertDateStringToDate(startDate), convertDateStringToDate(endDate)];

  useEffect(() => {
    dispatch(getBookings(bookingParamsFromState(bookingState)));
  }, [bookingState.params]);

  return (
    <div>
      <BookingError error={bookingState.error} dispatch={dispatch} classes={styles} />
      <div className={styles.controls}>
        <Tabs selectedTab={selectedTab} rowCount={bookingState.bookings.length} styles={styles} />
        <DatePicker selectedRange={dateRange} handleDateChange={(dates) => dispatch(setDates(dates))} />
      </div>
      <Table bookings={bookingState.bookings} selectedTab={selectedTab} />
    </div>
  );
}
