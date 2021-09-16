const LOAD_SPOTS = 'spots/load_spots';

const load = list => ({
  type: LOAD_SPOTS,
  list,
});

export const getSpots = () => async dispatch => {
  const response = await fetch(`/api/spots`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};


const initialState = {};

const spotsReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case LOAD_SPOTS: {
      const allSpots = {};
      action.list.forEach(spot => {
        allSpots[spot.id] = spot;
      });
      return {
        ...allSpots,
        ...state,
        list: action.list
      };
    }
    default:
      return state;
  }
};

export default spotsReducer;
