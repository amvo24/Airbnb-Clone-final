import { csrfFetch } from "./csrf"
const LOAD_SPOTS = 'spots/load_spots'
const LOAD_ONE_SPOT = 'spots/load_one_spot'
const CREATE_SPOTS = 'spots/create_spots'
const EDIT_SPOTS = 'spots/edit_spots'
const DELETE_SPOTS = 'spots/delete_spots'

//action creator
const loadSpots = (dog) => ({
    type: LOAD_SPOTS,
    dog
  });


const loadOneSpot = (payload) => ({
    type: LOAD_ONE_SPOT,
    payload
});


const createSpots = (createdPayload) => ({
    type: CREATE_SPOTS,
    createdPayload
});

const editSpots = (updatedPayload) => ({
    type: EDIT_SPOTS,
    updatedPayload
});

const deleteSpots = (deletePayload) => ({
    type: DELETE_SPOTS,
    deletePayload
});

//THUNK ACTION CREATORS
export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
      const dog = await response.json();

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
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
      const spot = await response.json();

      dispatch(loadOneSpot(spot));

      // const all = {};
      // all[spot.id] = spot
      // return {...all}

    }
    return response
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
      // const all = {}
      // all[spot.id] = spot
      // return {...all}
    }
    return response
};

export const editSpotById = (editedSpot, id) => async dispatch => {
  const { name, address, city, state, country, lat, lng, previewImage, description, price}
  = editedSpot
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    body: JSON.stringify({name, address, city, state, country, lat, lng, previewImage, description, price})
  });

  if (response.ok) {
    const updatedPayload = await response.json();
    dispatch(editSpots(updatedPayload));
  }
};

export const deleteSpotById = (id) => async dispatch => {
  const response = await csrfFetch(`/api/spots/${id}`, {
    method: "DELETE",
    body: JSON.stringify({id})
  });

  if (response.ok) {
    const deletePayload = await response.json();
    dispatch(deleteSpots(deletePayload));
  }
};

const initialState = {}

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
        {const newState = {};
        action.dog.appleSpot.forEach(el => newState[el.id] = el);
        return { ...newState};}

    case CREATE_SPOTS:
       const newerState = {...state}
       newerState[action.createdPayload.id] = action.createdPayload
       return {...newerState}
      // return {...state}

    case LOAD_ONE_SPOT:{
       const newestState = {...state}
       const spot = action.payload
       newestState[spot.id] = spot
       return { ...spot}}

    case EDIT_SPOTS:{
      const newState = {...state}
      newState[action.updatedPayload.id] = action.updatedPayload
      return newState}
    case DELETE_SPOTS: {
      const newState = {...state}
      delete newState[action.deletePayload]
      return {...newState}
    }
    default:
        return state;
}
};

export default spotsReducer;
