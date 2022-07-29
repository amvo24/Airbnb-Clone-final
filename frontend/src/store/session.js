import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
//here
//const SET_SHOW_LOGIN_MODAL = "/session/setShowLoginModal"

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

//here
// export const setShowLoginModal = (payload) => {
//   return {
//     type: SET_SHOW_LOGIN_MODAL,
//     payload,
//   };
// }

//thunk action creator
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session/login', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  //console.log('THIS IS FUCKING DATA', data)
  dispatch(setUser(data));
  //console.log('THIS IS YOUR DATA BUDDY', data)
  return response;
};

//thunk action creator
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//thunk action creator
export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, username, email, password } = user;
    const response = await csrfFetch("/api/users/sign-up", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

//thunk action creator
export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null, };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;

    // case SET_SHOW_LOGIN_MODAL:
    //   newState = Object.assign({}, state);
    //   newState.showLoginModal = action.payload;
    //   return newState;
    default:
      return state;
  }
};

export default sessionReducer;
