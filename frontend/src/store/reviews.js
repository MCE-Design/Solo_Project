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
  };
}

export const addReview = (payload, id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const newReview = await response.json();
    dispatch(add(payload));
    return newReview;
  }
}

export const editReview = (payload, id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/reviews/${id}`, {
    method: `PUT`,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (response.ok){
    const editedReview = await response.json();
    dispatch(edit(payload));
    return editedReview;
  }
}

export const deleteReview = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/reviews/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(remove(id));
  }
}


// Action Reducer

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  // let newState;
  switch (action.type) {
    case LOAD: {
      const allReviews = {};
      action.list.allReviews.forEach(review => {
        allReviews[review.id] = review;
      });
      return {
        ...allReviews,
        ...state,
        list: action.list.allReviews
      };
    }
    case ADD:
    case EDIT: {
      if(!state[action.review.id]){
        const newState = {
          ...state,
          [action.review.id]: action.review
        };
        return newState;
      }
      return {
        ...state,
        [action.review.id]: {
          ...state[action.review.id],
          ...action.review,
        }
      };
    }
    case REMOVE: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
};

export default reviewsReducer;
