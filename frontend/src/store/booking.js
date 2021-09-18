import { csrfFetch } from './csrf'

const LOAD_BOOKING = 'booking/load_booking';
const ADD_BOOKING = 'booking/add_booking';
const BOOK_DELETE = 'booking/book_delete';

// Action Creators

const load = list => ({
  type: LOAD_BOOKING,
  list,
});

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
    // body: JSON.stringify(id),
  });
  if (response.ok) {
    dispatch(bookDelete(id));
  }
}

export const bookSpot = (payload, id) => async (dispatch) => {
  console.log("reducerData", payload)
  const response = await csrfFetch(`/api/spots/${id}/booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newBooking = await response.json();
    dispatch(add(payload))
    return newBooking;
  }
}

export const getOneBooking = (id) => async (dispatch) => {
  const response = await fetch(`/api/spots/${id}/booking/`);

  if (response.ok) {
    const booking = await response.json();
    dispatch(load(booking, id));
  }
};

const initialState = {};

const bookingReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
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
