const LOAD_REVIEWS = 'reviews/load_reviews'
const CREATE_REVIEWS = 'reviews/create_reviews'
const EDIT_REVIEWS = 'reviews/edit_reviews'
const DELETE_REVIEWS = 'reviews/delete_reviews'

//ACTION CREATOR
const loadREVIEWS = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const createREVIEWS = (reviews) => ({
    type: CREATE_REVIEWS,
    reviews
});

const editREVIEWS = (reviews) => ({
    type: EDIT_REVIEWS,
    reviews
});

const deleteREVIEWS = (reviews) => ({
    type: DELETE_REVIEWS,
    reviews
});


//THUNK ACTION CREATORS
//Get all Reviews of the Current User
export const getAllReviewsByCurrentUser = () => async dispatch => {
    const response = await fetch(`/api/reviews/user-reviews`);

    if (response.ok) {
      const review = await response.json();
      dispatch(loadREVIEWS(review));
    }
};
//Get all Reviews by a Spot's id
export const getAllReviewsByreviewId = (spotId) => async dispatch => {
    const response = await fetch(`/api/reviews/${spotId}/reviews`);

    if (response.ok) {
      const review = await response.json();
      dispatch(loadREVIEWS(review));
    }
};
//Create a Review for a Spot based on the Spot's id
export const createReviewBasedOnSpotsId = (spotId) => async dispatch => {
    const response = await fetch(`/api/reviews/${spotId}`);

    if (response.ok) {
      const review = await response.json();
      dispatch(createREVIEWS(review));
    }
};
//Edit a Review
export const editReview = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`);

    if (response.ok) {
      const review = await response.json();
      dispatch(editREVIEWS(review));
    }
};
//Delete a Review
export const deleteReview = (reviewId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`);

    if (response.ok) {
      const review = await response.json();
      dispatch(deleteREVIEWS(review));
    }
};

//NORMALIZE DATA

const initialState = {}

// const ReviewReducer = (state = initialState, action) => {
//     swtich (action.type) {
//         case LOAD_REVIEWS:
//         case CREATE_REVIEWS:
//         case EDIT_REVIEWS:
//         case deleteREVIEWS:
//         default:
//             return state;
//     }
// }
