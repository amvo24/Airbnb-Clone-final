const LOAD_SPOTS = 'spots/load_spots'
const CREATE_SPOTS = 'spots/create_spots'
const EDIT_SPOTS = 'spots/edit_spots'
const DELETE_SPOTS = 'spots/delete_spots'

const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
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
      const spot = await response.json();
      dispatch(loadSpots(spot));
    }
};

//????????????????????????????????????????????
export const getSpotsOwnedByCurrentUser = () => async dispatch => {
    const response = await fetch(`/api/spots/userSpots`);

    if (response.ok) {
      const spot = await response.json();
      dispatch(loadSpots(spot));
    }
};
//???????????????????????????????????????????
export const getDetailsOfASpotFromAnId = (id) => async dispatch => {
    const response = await fetch(`/api/spots/${id}`);

    if (response.ok) {
      const spot = await response.json();
      dispatch(loadSpots(spot));
    }
};

export const createNewSpot = () => async dispatch => {
    const response = await fetch(`/api/spots/`, {
        method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify()
    });

    if (response.ok) {
      const spot = await response.json();
      dispatch(createSpots(spot));
    }
};
