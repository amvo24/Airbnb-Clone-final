import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = 'bookings/load_bookings'
const LOAD_SPOT_BOOKINGS = 'bookings/load_spot_bookings'
const LOAD_USER_BOOKING = 'bookings/load_users_booking'
const CREATE_BOOKINGS = 'bookings/create_bookings'
const EDIT_BOOKINGS = 'bookings/edit_bookings'
const DELETE_BOOKINGS = 'bookings/delete_bookings'


//action creator
const loadBookings = (payload) => ({
    type: LOAD_BOOKINGS,
    payload
});

const loadSpotsBookings = (payload) => ({
    type: LOAD_SPOT_BOOKINGS,
    payload
});

const loadUsersBooking = (payload) => ({
    type: LOAD_USER_BOOKING,
    payload
});

const createBookings = (createdPayload) => ({
    type: CREATE_BOOKINGS,
    createdPayload
});

const editBookings = (updatedPayload) => ({
    type: EDIT_BOOKINGS,
    updatedPayload
});

const deleteBookings = (deletePayload) => ({
    type: DELETE_BOOKINGS,
    deletePayload
});

// THUNKS
export const getAllBookings = () => async dispatch => {
    const response = await csrfFetch('api/bookings/')

    if (response.ok) {
        const payload = await response.json()

        dispatch(loadBookings(payload))

        const all = {}
        // payload.allBookings
        payload.allBookings.forEach(booking => all[booking.id] = payload)
        return { ...all }
    }
}

export const getAllBookingsBySpotsId = (spotId) => async dispatch => {
    const response = await fetch(`/api/bookings/${spotId}`);

    if (response.ok) {
      const payload = await response.json();

      dispatch(loadSpotsBookings(payload));
    }
};

export const getBookingsByCurrentUser = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/user-bookings`);

    if (response.ok) {
      const booking = await response.json();

      dispatch(loadUsersBooking(booking));
    }
};



export const createNewBooking = (spotId, bookingData) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/spot/${spotId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData)
    });

    if (response.ok) {
      const booking = await response.json();

      dispatch(createBookings(booking));
      return booking

    }
    return response
};



export const editBookingsByPotId = (editedBooking, id) => async dispatch => {
    const {startDate, endDate}
    = editedBooking

    const response = await csrfFetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({startDate, endDate})
    });

    if (response.ok) {
      const updatedPayload = await response.json();

      dispatch(editBookings(updatedPayload));
    }
};


export const deleteBookingById = (id) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${id}`, {
      method: "DELETE",
      body: JSON.stringify({id})
    });

    if (response.ok) {
      const deletePayload = await response.json();
      dispatch(deleteBookings(deletePayload));
    }
};



const initialState = {}

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_BOOKINGS: //GET ALL BOOKINGS
      {
        const newState = {};

        action.payload.spots.forEach(el => (newState[el.id] = el));
        return newState
      }

    case LOAD_USER_BOOKING:{
        const newState = {}
        action.payload.forEach(el => newState[el.id] = el);
        return newState
      }

    case CREATE_BOOKINGS:
       const newerState = {...state}
       newerState[action.createdPayload.id] = action.createdPayload
       return newerState

    case LOAD_SPOT_BOOKINGS:{
       const newestState = {} // I ALTERED THIS
      //  const spot = action.payload
       newestState[action.payload.id] = action.payload
       return newestState
      }

    case EDIT_BOOKINGS:{
      const newState = {...state}
      newState[action.updatedPayload.id] = action.updatedPayload
      return newState
    }

    case DELETE_BOOKINGS: {
      const newState = {...state}
      delete newState[action.deletePayload]
      return newState
    }

    default:
        return state;
}
};

export default bookingReducer;
