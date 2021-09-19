import { csrfFetch } from './csrf'

const LOAD = "reviews/load_reviews";
const ADD = "reviews/add_review";
const EDIT = "reviews/edit_review";
const REMOVE = "reviews/delete_review"


// Action Creators

const load = (list) => ({
  type: LOAD,
  list,
});

const add = (review) => ({
  type: ADD,
  review,
});

const edit = (review) => ({
  type: EDIT,
  review,
})

const remove = (reviewId) => ({
  type: REMOVE,
  reviewId: reviewId,
})

// Thunks

export const getAllReviewsId = (id) => async dispatch => {
  const response = await fetch(`/api/spots/${id}/reviews`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list, id));
  }
}

// Action Reducer

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
