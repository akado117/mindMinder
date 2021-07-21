import React from 'react';
import { format } from 'date-fns';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Popover from '@material-ui/core/Popover';
import Link from '@material-ui/core/Link';
import { Booking, BookingState } from 'CommunityApp/store/bookingSlice';
import { color2, colorForTag } from 'CommunityApp/styles/theme';
import { spaceBetween, columnStack } from 'CommunityApp/styles/layout';
import { useAppDispatch } from 'CommunityApp/hooks/storeHooks';
import { BookingDetails } from 'CommunityApp/store/bookingSlice';
import { updateBookingDetails, updateBooking } from 'CommunityApp/api/bookings';
import { guestyHostName } from 'CommunityApp/api/externalURLS';
import Select from '@material-ui/core/Select';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof Record<string, unknown>>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: keyof Booking;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'guest_name', numeric: false, label: 'Guest Name' },
  { id: 'guests_count', numeric: true, label: '# Of Guests' },
  { id: 'start_time', numeric: false, label: 'Check In' },
  { id: 'end_time', numeric: false, label: 'Check Out' },
  { id: 'nights_count', numeric: true, label: '# Of Nights' },
  { id: 'requested_check_in', numeric: false, label: 'Requested Check In' },
  { id: 'unit_name', numeric: false, label: 'Unit' },
  { id: 'status', numeric: true, label: 'Breezeway Status' }
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Booking) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Booking) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding="none"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <div className={`${classes.tableHeader} ${classes.headerSortCompensation} ${classes.bold}`}>
                {headCell.label}
              </div>
              {orderBy === headCell.id && (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center" padding="none">
          <div className={`${classes.tableHeader} ${classes.bold}`}>Actions</div>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%'
    },
    table: {
      minWidth: 750,
      '& td': {
        borderBottom: 'none'
      }
    },
    tableHeader: {
      textTransform: 'uppercase'
    },
    headerSortCompensation: {
      paddingLeft: '26px'
    },
    bold: {
      fontWeight: 'bold'
    },
    guestNameContainer: {
      display: 'flex',
      '& > *:first-child': {
        color: 'black',
        backgroundColor: color2.everydayBlue
      },
      '& > *:last-child': {
        flexGrow: '1',
        marginLeft: '1rem',
        '& > *:first-child': {
          textAlign: 'left'
        },
        '& > *:last-child': {
          fontSize: '.8rem'
        }
      }
    },
    guestStatus: {
      border: `2px solid ${color2.guestStatus}`,
      borderRadius: '20px',
      padding: '2px 10px'
    },
    collapsibleRow: {
      ...spaceBetween,
      '& > *': {
        flexGrow: 1,
        margin: '1rem 0',
        marginRight: '3rem'
      },
      '& > *:last-child': {
        flexGrow: 0,
        marginRight: 0
      }
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1
    },
    tag: {
      borderRadius: '8px',
      border: '3px solid',
      display: 'inline-block',
      '& > *': {
        padding: '5px 8px 5px 8px',
        textTransform: 'capitalize'
      }
    },
    ready: colorForTag('success'),
    blocked: colorForTag('warning'),
    dirty: colorForTag('warning'),
    inspecting: colorForTag('secondary'),
    occupied: colorForTag('grey'),
    buttonContainer: columnStack('1rem'),
    actionButtons: {
      border: `2px solid ${color2.purple}`,
      borderRadius: '4px',
      color: color2.white,
      backgroundColor: color2.purple,
      '&.inverse': {
        backgroundColor: color2.white,
        color: color2.purple
      }
    },
    popover: {
      backgroundColor: color2.greyBg,
      color: color2.greyDark,
      borderRadius: '16px',
      padding: '16px 24px 16px 24px',
      '& ul': {
        listStyleType: 'none',
        padding: '0',
        '& li': {
          marginBottom: '.75rem'
        }
      }
    }
  })
);
interface GenericCellProps {
  booking: Booking;
  classes: ReturnType<typeof useStyles>;
}

interface EditableFieldsInProps extends GenericCellProps {
  isEdit: boolean;
  handleOnChange: (
    time: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | { name?: string | undefined; value: unknown }>
  ) => void;
}

// TS... why u do dis. Here because it doesn't know that objects have an implicit key type of string.
interface GenericObject {
  [key: string]: string;
}

const statusMap: GenericObject = {
  ['']: 'Not Arrived',
  dropped_luggage: 'Dropped Luggage',
  checked_in: 'Checked In',
  checked_out: 'Checked Out'
};

function GuestStatusField({ booking, isEdit, handleOnChange, classes }: EditableFieldsInProps) {
  const renderNormal = <div className={classes.guestStatus}>{statusMap[booking.guest_status] || 'Not Arrived'}</div>;

  const render = !isEdit ? (
    renderNormal
  ) : (
    <Select native value={booking.guest_status || ''} onChange={handleOnChange} onClick={(e) => e.stopPropagation()}>
      {Object.entries(statusMap).map(([key, label]) => {
        return (
          <option value={key} key={key}>
            {label}
          </option>
        );
      })}
    </Select>
  );

  return render;
}

function RequestedCheckIn({ booking, isEdit, handleOnChange }: EditableFieldsInProps) {
  const time = booking.requested_check_in_time
    ? format(new Date(`1-1-2020 ${booking.requested_check_in_time}`), 'h:mm a')
    : 'N/A';

  const render = !isEdit ? (
    <span>{time}</span>
  ) : (
    <input
      type="time"
      onBlur={handleOnChange}
      onClick={(e) => e.stopPropagation()}
      defaultValue={booking.requested_check_in_time}
    />
  );

  return render;
}

interface ActionCellProps extends GenericCellProps {
  handleEdit: () => void;
}

const ActionsCell = ({ booking, classes, handleEdit }: ActionCellProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    setAnchorEl(null);
  };

  function handledEditClick() {
    setAnchorEl(null);

    handleEdit();
  }

  const id = open ? 'simple-popover' : undefined;

  const guestyUrl =
    booking.guesty_reservation_id && `${guestyHostName}/reservations/${booking.guesty_reservation_id}/summary`;

  return (
    <div>
      <Button aria-describedby={id} onClick={handleClick} style={{ width: '100%' }}>
        ...
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        classes={{
          paper: classes.popover
        }}
      >
        <ul>
          <li onClick={handledEditClick} style={{ cursor: 'pointer' }}>
            Edit
          </li>
          <li>
            {guestyUrl && (
              <Link href={guestyUrl} rel="noreferrer" target="_blank" color="inherit">
                Guesty
              </Link>
            )}
          </li>
        </ul>
      </Popover>
    </div>
  );
};

const StatusCell = ({ booking, classes }: GenericCellProps) => {
  const colorClass = classes[booking.status as keyof ReturnType<typeof useStyles>] || classes.occupied;

  return (
    <div className={`${classes.tag} ${colorClass}`}>
      <div>{booking.status || 'N/A'}</div>
    </div>
  );
};

const GuestName = ({ booking, classes, isEdit, handleOnChange }: EditableFieldsInProps) => {
  const guestName = booking.guest_name || 'N/A';
  let splitName = guestName.split(' ');
  const nameLength = splitName.length;
  splitName = splitName.filter((val, idx) => idx === 0 || idx === nameLength - 1);
  const initials = splitName.reduce((acc, name) => (acc += name[0]), '');
  return (
    <div className={classes.guestNameContainer}>
      <Avatar>{initials}</Avatar>
      <div>
        <div className={classes.bold}>{guestName}</div>
        <GuestStatusField classes={classes} booking={booking} isEdit={isEdit} handleOnChange={handleOnChange} />
      </div>
    </div>
  );
};

interface DateTimeCell {
  dateTime: string;
}

const DateTimeCell = ({ dateTime }: DateTimeCell) => {
  const pattern = 'MM/DD/YYYY';
  const pattern2 = 'h:mm a';
  const date = new Date(dateTime);

  const topRow = format(date, pattern);
  const bottomRow = `@ ${format(date, pattern2)}`;

  return (
    <div>
      <div>{topRow}</div>
      <div>{bottomRow}</div>
    </div>
  );
};

interface RowProps {
  row: Booking;
  index: number;
  classes: ReturnType<typeof useStyles>;
  handleBookingDetailsSubmit: (bookingDetails: BookingDetails) => void;
  handleBookingUpdate: (booking: Partial<Booking>) => void;
}

const Row = ({ row, index, classes, handleBookingDetailsSubmit, handleBookingUpdate }: RowProps) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const labelId = `enhanced-table-checkbox-${index}`;
  const [initialState] = React.useState(row);
  const [state, setState] = React.useState(row);
  const [bookingSubState, setbookingSubState] = React.useState({ uuid: state.uuid });
  const [isFormDirty, setIsFormDirty] = React.useState(false);

  function onCancel() {
    setState({ ...initialState });
  }

  function onSubmit() {
    const bookingDetails = {
      booking_id: state.uuid,
      custom_fields: {
        additionalguests: state.additionalguests,
        guesthomestate: state.guesthomestate,
        reasonforstay: state.reasonforstay,
        specialnotes: state.specialnotes,
        typeofstay: state.typeofstay
      }
    };

    handleBookingDetailsSubmit(bookingDetails);
    if (isFormDirty) {
      setIsFormDirty(false);
      // worried about racing conditions between the two services.
      // Completely not noticable by users, but saves us the risk of racing.
      setTimeout(() => handleBookingUpdate(bookingSubState), 200);
    }
    setIsEdit(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | { name?: string | undefined; value: unknown }>,
    field: keyof Booking
  ) {
    const val = e.currentTarget.value;
    const newState = Object.assign({}, state, { [field]: val });
    // Handle Partial state stuff
    if (['requested_check_in_time', 'guest_status'].includes(field)) {
      setbookingSubState(Object.assign({}, bookingSubState, { [field]: val }));
      setIsFormDirty(true);
    }

    setState(newState);
  }

  return (
    <React.Fragment>
      <TableRow hover role="checkbox" tabIndex={-1} onClick={() => setIsEdit(!isEdit)}>
        <TableCell align="center" id={labelId} scope="row">
          <GuestName
            booking={state}
            classes={classes}
            isEdit={isEdit}
            handleOnChange={(e) => handleChange(e, 'guest_status')}
          />
        </TableCell>
        <TableCell align="center">{row.guests_count}</TableCell>
        <TableCell align="center">
          <DateTimeCell dateTime={row.start_time} />
        </TableCell>
        <TableCell align="center">
          <DateTimeCell dateTime={row.end_time} />
        </TableCell>
        <TableCell align="center">{row.nights_count}</TableCell>
        <TableCell align="center">
          <RequestedCheckIn
            booking={state}
            classes={classes}
            isEdit={isEdit}
            handleOnChange={(e) => handleChange(e, 'requested_check_in_time')}
          />
        </TableCell>
        <TableCell align="center">{row.unit_name}</TableCell>
        <TableCell align="center">
          <StatusCell booking={row} classes={classes} />
        </TableCell>
        <TableCell>
          <ActionsCell booking={row} classes={classes} handleEdit={() => setIsEdit(true)} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={isEdit} timeout="auto" unmountOnExit>
            <div className={classes.collapsibleRow}>
              <TextField
                id="reasonforstay"
                label="Reason for stay"
                multiline
                rows={5}
                variant="outlined"
                value={state.reasonforstay || ''}
                onChange={(e) => handleChange(e, 'reasonforstay')}
              />
              <TextField
                id="reasonforstay"
                label="Reservation Notes"
                multiline
                rows={5}
                variant="outlined"
                value={state.specialnotes || ''}
                onChange={(e) => handleChange(e, 'specialnotes')}
              />
              <TextField
                id="additionalguests"
                label="Extra Guests"
                multiline
                rows={5}
                variant="outlined"
                value={state.additionalguests || ''}
                onChange={(e) => handleChange(e, 'additionalguests')}
              />
              <div className={classes.buttonContainer}>
                <Button fullWidth variant="contained" className={`${classes.actionButtons} inverse`} onClick={onCancel}>
                  Cancel
                </Button>
                <Button fullWidth variant="contained" className={classes.actionButtons} onClick={onSubmit}>
                  Save
                </Button>
              </div>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

interface NoResultsProps {
  selectedTab: BookingState['params']['selectedTab'];
}
type tplotOptions = { [key: string]: string };
const noResultsMessages: tplotOptions = {
  checking_in: 'No guests are checking in on the selected date.',
  checking_out: 'No guests are checking out on the selected date.',
  in_residence: 'No guests are in residence on the selected date.'
};

const NoResults = ({ selectedTab }: NoResultsProps) => (
  <TableRow>
    <TableCell colSpan={headCells.length + 1} style={{ textAlign: 'center' }}>
      {noResultsMessages[selectedTab]}
    </TableCell>
  </TableRow>
);

interface TableProps {
  bookings: Booking[];
  selectedTab: BookingState['params']['selectedTab'];
}

export default function EnhancedTable(props: TableProps) {
  const { bookings } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Booking>('start_time');
  const dispatch = useAppDispatch();

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Booking) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function handleBookingDetailsSubmit(bookingDetails: BookingDetails) {
    dispatch(updateBookingDetails(bookingDetails));
  }

  function handleBookingUpdate(booking: Partial<Booking>) {
    dispatch(updateBooking(booking));
  }

  const rows = bookings;

  return (
    <div className={classes.root}>
      <TableContainer>
        <Table className={classes.table} aria-labelledby="tableTitle" aria-label="enhanced table">
          <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
          <TableBody>
            {!rows.length ? (
              <NoResults selectedTab={props.selectedTab} />
            ) : (
              stableSort<Booking>(rows, getComparator(order, orderBy)).map((row, index) => {
                return (
                  <Row
                    row={row}
                    index={index}
                    key={row.uuid}
                    classes={classes}
                    handleBookingDetailsSubmit={handleBookingDetailsSubmit}
                    handleBookingUpdate={handleBookingUpdate}
                  />
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
