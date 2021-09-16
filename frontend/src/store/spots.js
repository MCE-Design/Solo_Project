const LOAD_SPOTS = 'spots/load_spots';
const LOAD_ONE_SPOT = "spots/load_one_spot"

const load = list => ({
  type: LOAD_SPOTS,
  list,
});

const loadOne = list => ({
  type: LOAD_ONE_SPOT,
  list,
})

export const getSpots = () => async dispatch => {
  const response = await fetch(`/api/spots`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getOneSpot = (id) => async dispatch => {
  const response = await fetch(`/api/spots/${id}`);
  if (response.ok) {
    const list = await response.json();
    dispatch(loadOne(list));
  }
}


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
    case LOAD_ONE_SPOT: {
      const oneSpot = {};
      action.list.forEach(spot => {
        oneSpot[spot.id] = spot;
      });
      return {
        ...oneSpot,
        ...state,
        list: action.list
      }
    }
    default:
      return state;
  }
};

export default spotsReducer;
