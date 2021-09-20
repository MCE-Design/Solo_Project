import { csrfFetch } from './csrf'

const LOAD_BOOKING = 'booking/load_booking';
const LOAD_USER_BOOKINGS = "user/loadUserBookings";
const ADD_BOOKING = 'booking/add_booking';
const BOOK_DELETE = 'booking/book_delete';


// Action Creators

const load = list => ({
  type: LOAD_BOOKING,
  list,
});

const loadUserBookings = list => ({
  type: LOAD_USER_BOOKINGS,
  list,
})

const add = (booking) => ({
  type: ADD_BOOKING,
  booking,
})

const bookDelete = (bookingId) => ({
  type: BOOK_DELETE,
  bookingId: bookingId,
})


// Thunks

export const deleteBooking = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/booking/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(bookDelete(id));
  }
}

export const bookSpot = (payload, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${id}/booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newBooking = await response.json();
    dispatch(add(payload));
    return newBooking;
  }
}

export const getAllBookingsId = (id) => async dispatch => {
  const response = await fetch(`/api/spots/${id}/booking/`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list, id));
  }
};

export const getOneBooking = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}/booking/`);

  if (response.ok) {
    const booking = await response.json();
    dispatch(load(booking, id));
  }
};

export const getUserBookings = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}/booking/`);
  if (response.ok) {
    const list = await response.json();
    dispatch(loadUserBookings(list, id));
  }
};


// Action Reducer

const initialState = {};

const bookingReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case LOAD_BOOKING: {
      const allBookings = {};
      action.list.allBookings.forEach(booking => {
        allBookings[booking.id] = booking;
      });
      return {
        ...allBookings,
        ...state
      };
    }
    case LOAD_USER_BOOKINGS: {
      const allUserBookings = {};
      action.list.allUserBookings.forEach(booking => {
        allUserBookings[booking.id] = booking;
      });
      return {
        ...allUserBookings,
        ...state,
        list: action.list.allUserBookings
      }
    }
    case ADD_BOOKING: {
      if(!state[action.booking.id]){
        const newState = {
          ...state,
          [action.booking.id]: action.booking
        };
        return newState;
      }
      return {
        ...state,
        [action.booking.id]: {
          ...state[action.booking.id],
          ...action.booking,
        }
      };
    }
    case BOOK_DELETE: {
      const newState = { ...state };
      delete newState[action.bookingId];
      return newState;
    }
    default:
      return state;
  }
};

export default bookingReducer;
