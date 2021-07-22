import { AppDispatch } from './store/store';
import {
  setBookings,
  setLoading,
  BookingState,
  BookingDetails,
  Booking,
  setBookingDetail,
  setBookingError,
  setBooking
} from './store/bookingSlice';
import api, { Data } from './api/client';

interface BookingApiReponse {
  bookings: Data[];
}

export function bookingParamsFromState(state: BookingState) {
  const { startDate, endDate, selectedTab } = state.params;

  return { start_date: startDate, end_date: endDate, selected_tab: selectedTab };
}

export const getBookings = (params: Data = {}) => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    api
      .get<BookingApiReponse, Data>('/bookings', params)
      .then((response) => {
        dispatch(setLoading(false));
        dispatch(setBookings(response.bookings));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        // Report error to common error notification reducer?
        throw new Error(e);
      });
  };
};

export function updateBooking(params: Partial<Booking>) {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    api
      .put<Booking, Partial<Booking>>(`/bookings/${params.uuid}`, params)
      .then((response) => {
        dispatch(setLoading(false));
        dispatch(setBooking(response));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(setBookingError(e.message));
      });
  };
}

export const updateBookingDetails = (params: BookingDetails) => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    api
      .put<BookingDetails, BookingDetails>(`/bookings/${params.booking_id}/booking_details`, params)
      .then((response) => {
        dispatch(setLoading(false));
        dispatch(setBookingDetail({ ...response, booking_id: params.booking_id }));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(setBookingError(e.message));
      });
  };
};
