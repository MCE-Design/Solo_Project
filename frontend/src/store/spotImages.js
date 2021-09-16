const LOAD_IMAGES = 'images/load_images';

const load = list => ({
  type: LOAD_IMAGES,
  list,
});

export const getImages = (id) => async dispatch => {
  const response = await fetch(`/api/spots/${id}/images`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list, id));
  }
};


const initialState = {};

const imagesReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case LOAD_IMAGES: {
      const allImages = {};
      action.list.forEach(image => {
        allImages[image.id] = image;
      });
      return {
        ...allImages,
        ...state
      };
    }
    default:
      return state;
  }
};

export default imagesReducer;
