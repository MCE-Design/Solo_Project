import { csrfFetch } from './csrf'
const BOOK_SPOT = 'booking/book_spot'


// export const bookSpot = booking => ({
//   type: BOOK_SPOT,
//   booking,
// });

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
        // const pokemonList = newState.list.map(id => newState[id]);
        // pokemonList.push(action.pokemon);
        // newState.list = sortList(pokemonList);
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
    default:
      return state;
  }
};

export default bookingReducer;
