import { csrfFetch } from "./csrf"
const LOAD_SPOTS = 'spots/load_spots'
const LOAD_ONE_SPOT = 'spots/load_one_spot'
const CREATE_SPOTS = 'spots/create_spots'
const EDIT_SPOTS = 'spots/edit_spots'
const DELETE_SPOTS = 'spots/delete_spots'

const loadSpots = (payload) => ({
    type: LOAD_SPOTS,
    payload
  });


const loadOneSpot = (payload) => ({
    type: LOAD_ONE_SPOT,
    payload
});


const createSpots = (createdPayload) => ({
    type: CREATE_SPOTS,
    createdPayload
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
      const dog = await response.json();
      console.log("THIS IS THE SPOTS", dog)
      dispatch(loadSpots(dog));

      // const all = {}
      // dog.appleSpot.forEach(spot => all[spot.id] = dog)
      // return { ...all }

    }
};


// export const getSpotsOwnedByCurrentUser = () => async dispatch => {
//     const response = await fetch(`/api/spots/userSpots`);

//     if (response.ok) {
//       const spot = await response.json();
//       dispatch(loadSpots(spot));
//     }
// };

export const getDetailsOfASpotFromAnId = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);

    if (response.ok) {
      const spot = await response.json();

      dispatch(loadOneSpot(spot));

      const all = {};
      all[spot.id] = spot
      return {...all}

    }
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

      const all = {}
      all[spot.id] = spot
      return {...all}
    }

};

// export const editSpotById = (id) => async dispatch => {
//   const response = await fetch(`/api/spots/${id}`);

//   if (response.ok) {
//     const spot = await response.json();
//     dispatch(editSpots(spot));
//   }
// };

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
        const newState = {};

        action.payload.appleSpot.forEach(el => newState[el.id] = el);
        return { ...newState, ...state };

        case CREATE_SPOTS:
          const newerState = {...state}
          newerState[action.createdPayload.id] = action.createdPayload
          return {...newerState}


          case LOAD_ONE_SPOT:
              const newestState = {...state}
              const spot = action.payload
              newestState[spot.id] = spot
              return { ...newestState, ...state };
    default:
        return state;
}
};

export default spotsReducer;
