import { csrfFetch } from "./csrf"
const LOAD_SPOTS = 'spots/load_spots'
const LOAD_ONE_SPOT = 'spots/load_one_spot'
const CREATE_SPOTS = 'spots/create_spots'
const EDIT_SPOTS = 'spots/edit_spots'
const DELETE_SPOTS = 'spots/delete_spots'

const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

const loadOneSpot = (spots) => ({
    type: LOAD_ONE_SPOT,
    spots
});

const createSpots = (spots) => ({
    type: CREATE_SPOTS,
    spots
});

const editSpots = (spots) => ({
    type: EDIT_SPOTS,
    spots
});

const deleteSpots = (spots) => ({
    type: DELETE_SPOTS,
    spots
});

//THUNK ACTION CREATORS
export const getAllSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);

    if (response.ok) {
      const spots = await response.json();
      dispatch(loadSpots(spots));
      const all = {}
      spots.spot.forEach(spot => all[spot.id] = spot)
      return { ...all }
    }
};


export const getSpotsOwnedByCurrentUser = () => async dispatch => {
    const response = await fetch(`/api/spots/userSpots`);

    if (response.ok) {
      const spot = await response.json();
      dispatch(loadSpots(spot));
    }
};

export const getDetailsOfASpotFromAnId = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);

    if (response.ok) {
      const spot = await response.json();
      dispatch(loadOneSpot(spot));
    }
    return response;
};

export const createNewSpot = (spot) => async dispatch => {
    const response = await csrfFetch(`/api/spots/`, {
        method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(spot)
    });

    if (response.ok) {
      const spot = await response.json();
      dispatch(createSpots(spot));
      return spot
    }
    return response
};

export const editSpotById = (id) => async dispatch => {
  const response = await fetch(`/api/spots/${id}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(editSpots(spot));
  }
};

// export const deleteSpotById = (id) => async dispatch => {
//   const response = await fetch(`/api/spots/${id}`);

//   if (response.ok) {
//     const spot = await response.json();
//     dispatch(deleteSpots(spot));
//   }
// };

const initialState = {}

const spotsReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOAD_SPOTS:
        const allSpots = { ...state };
        action.spots.spot.forEach(spot => allSpots[spot.id] = spot);
        return { ...allSpots, ...state };
    case CREATE_SPOTS:
        const newState = {...state}
        newState[action.spot.id] = action.spot
        return newState
    case LOAD_ONE_SPOT:
        const spot = action.spots;
        return { ...spot, ...state };
    default:
        return state;

}
};

export default spotsReducer;
