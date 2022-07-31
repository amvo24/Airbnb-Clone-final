import { csrfFetch } from "./csrf"
const LOAD_REVIEWS = 'reviews/load_reviews'
const LOAD_REVIEWS_SPOT_ID = 'reviews/load_reviews_by_spot_id'
const CREATE_REVIEWS = 'reviews/create_reviews'

const DELETE_REVIEWS = 'reviews/delete_reviews'

//ACTION CREATOR
const loadREVIEWS = (payload) => ({
    type: LOAD_REVIEWS,
    payload
});

const loadREVIEWSBYSPOTID = (payload) => ({
    type: LOAD_REVIEWS_SPOT_ID,
    payload
});

const createREVIEWS = (payload) => ({
    type: CREATE_REVIEWS,
    payload
});


const deleteREVIEWS = (payload) => ({
    type: DELETE_REVIEWS,
    payload
});


//THUNK ACTION CREATORS
//Get all Reviews of the Current User
export const getAllReviewsByCurrentUser = () => async dispatch => {
    const response = await fetch(`/api/reviews/user-reviews`);

    if (response.ok) {
      const payload = await response.json();

      dispatch(loadREVIEWS(payload));
    }
};

//Get all Reviews by a Spot's id
export const getAllReviewsByreviewId = (spotId) => async dispatch => {
    const response = await fetch(`/api/reviews/${spotId}/reviews`);

    if (response.ok) {
      const payload = await response.json();

      dispatch(loadREVIEWSBYSPOTID(payload));
    }
};

//Create a Review for a Spot based on the Spot's id
export const createReviewBasedOnSpotsId = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${spotId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(review)
    });

    if (response.ok) {
      const review = await response.json();
      // console.log("LOOK HERE FOR .JSON RESPONSE REVIEW", review)
      dispatch(createREVIEWS(review));
      // return review
    }
};



//Delete a Review
export const removeReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    body: JSON.stringify({reviewId})
  });

    if (response.ok) {
      const review = await response.json();
      dispatch(deleteREVIEWS(review));
    }
};



const initialState = {}

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOAD_REVIEWS:{
          const newState = {}
          action.payload.forEach(el => newState[el.id] = el);
          return newState
        }

        case LOAD_REVIEWS_SPOT_ID:{
          const newState = {}
          action.payload.reviews.forEach(el => newState[el.id] = el)
          // const review = action.payload
          // newState[review.id] = review
          return newState
          }
        case CREATE_REVIEWS:{
          const newState = {...state}
          newState[action.payload.id] = action.payload
          return newState
          // return {...state}
        }
        case DELETE_REVIEWS:{
          const newState = {...state}
          delete newState[action.payload]
          return newState
        }
        default:
            return state;
    }
}

export default reviewReducer
