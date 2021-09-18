const LOAD = "reviews/load_reviews";

const load = (list) => ({
  type: LOAD,
  list,
});

export const getAllReviewsId = (id) => async dispatch => {
  const response = await fetch(`/api/spots/${id}/reviews`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list, id));
  }
}


const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case LOAD: {
      const allReviews = {};
      action.list.forEach(review => {
        allReviews[review.id] = review;
      });
      return {
        ...allReviews,
        ...state
      };
    }
    default:
      return state;
  }
};

export default reviewsReducer;
