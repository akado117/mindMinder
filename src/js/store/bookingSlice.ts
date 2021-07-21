import { format } from 'date-fns';
import { createSlice } from '@reduxjs/toolkit';

export type Booking = {
  bonus_night_income: number;
  checkout_date: string;
  confirmed_at: string;
  email: string;
  end_date: string;
  end_time: string;
  guest_name: string;
  guests_count: number;
  guesty_reservation_id: string;
  nights_count: number;
  payout_amount: number;
  payout_rate: number;
  payout_strategy: string;
  phone: string;
  requested_check_in: string;
  requested_check_in_time: string;
  start_date: string;
  start_time: string;
  status: string;
  guest_status: string;
  total_earnings: number;
  unit_name: string;
  unit_availability_id: string;
  uuid: string;
  // Merged custom fields for TS simplicity
  additionalguests: string;
  guesthomestate: string;
  reasonforstay: string;
  specialnotes: string;
  typeofstay: string;
};

export interface BookingDetails {
  booking_id: string;
  guests_count?: number;
  payout_amount?: number;
  fare_accommodation?: number;
  fare_accommodation_adjusted?: number;
  custom_fields: {
    additionalguests: string;
    guesthomestate: string;
    reasonforstay: string;
    specialnotes: string;
    typeofstay: string;
  };
}

export type BookingState = {
  bookings: Booking[];
  loading: boolean;
  params: {
    selectedTab: 'checking_in' | 'checking_out' | 'in_residence';
    startDate: string;
    endDate: string;
  };
  error: string;
};

const initialState: BookingState = {
  bookings: [],
  loading: false,
  params: {
    selectedTab: 'checking_in',
    startDate: format(new Date(), 'YYYY-MM-DD'),
    endDate: format(new Date(), 'YYYY-MM-DD')
  },
  error: ''
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTab: (state, action) => {
      state.params.selectedTab = action.payload;
    },
    setDates: (state, action) => {
      // Handles date or string
      let [startDate, endDate] = action.payload;
      startDate = typeof startDate === 'object' ? format(startDate, 'yyyy-MM-dd') : startDate;
      endDate = typeof endDate === 'object' ? format(endDate, 'yyyy-MM-dd') : endDate;

      state.params.endDate = endDate;
      state.params.startDate = startDate;
    },
    setBooking: (state, action) => {
      const booking = action.payload;
      let location = -1;
      state.bookings.forEach((element: Booking, index: number) => {
        if (element.uuid == booking.uuid) location = index;
      });

      if (location > -1) state.bookings[location] = booking;
    },
    setBookingDetail: (state, action) => {
      // Because details are flattened into the booking call.
      // This is just a quick an dirty way to insert data we currently care about
      const bookingDetails = action.payload;
      let location = -1;
      state.bookings.forEach((element: Booking, index: number) => {
        if (element.uuid == bookingDetails.booking_id) location = index;
      });

      if (location > -1)
        state.bookings[location] = Object.assign(state.bookings[location], bookingDetails.custom_fields);
    },
    setBookingError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export function convertDateStringToDate(date: string) {
  const dateArr = date.split('-').map((entry) => Number(entry));

  return new Date(dateArr[0] as number, (dateArr[1] as number) - 1, dateArr[2]);
}

// Action creators are generated for each case reducer function
export const {
  setBookings,
  setLoading,
  setTab,
  setDates,
  setBookingDetail,
  setBookingError,
  setBooking
} = bookingSlice.actions;

export default bookingSlice.reducer;
