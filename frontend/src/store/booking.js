import { csrfFetch } from './csrf'

const BOOK_SPOT = 'booking/bookSpot';
const BOOK_DELETE = 'booking/bookDelete';

// export const bookSpot = booking => ({
//   type: BOOK_SPOT,
//   booking,
// });

export const bookDelete = (bookingId) => ({
  type: BOOK_DELETE,
  id: bookingId,
})

export const bookSpot = (payload, id) => async (dispatch) => {
  console.log("reducerData", payload)
  const response = await csrfFetch(`/api/spots/${id}/booking`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newBooking = await response.json();
    // dispatch(addOnePokemon(newPokemon));
    return response;
  }
}


const initialState = {};

const bookingReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case BOOK_SPOT: {
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
      console.log("state", state)
      return state.filter(( id ) => id !== action.id)
    }
    default:
      return state;
  }
};

export default bookingReducer;
