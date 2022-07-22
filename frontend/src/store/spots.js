// import spots from '..';

// const LOAD_SPOTS = "spots/loadSpots";
// const DELETE_SPOTS = "spots/deleteSpots"
// const CREATE_SPOTS = "spots/createSpots"

// //action creator---LOADS STATE
// export const loadSpots = () => {
//   return {
//     type: LOAD_SPOTS,
//     //?
//   };
// };
// //action creator---DELETES A Spot
// export const deleteSpots = (id) => {
//   return {
//     type: DELETE_SPOTS,
//     payload: id
//   };
// };
// //action creator---CREATE A Spot
// export const createSpots = () => {
//   return {
//     type: CREATE_SPOTS,
//     payload: id
//   };
// };


// //normalization!!!!!!
// const initialState = {};
// initialReports.forEach((//??) => {
//   initialState[????] = ???
// });


// const reportReducer = (state = initialState, action) => {
//   switch (action.type) {
//     // case LOAD_REPORTS:
//     //   return { ...state, ...action.initialReports };
//       case DELETE_SPOTS: {
//         //COPY OLD STATE HERE, WE ARE CREATING A SHALLOW COPY TO NOT MUTATE THE OG STATE
//         const newState = {...state}
//         //DO THE ACTION
//         delete newState[action.payload]
//         //RETURN THE COPIED STATE FROM EARIER WHICH IS NOW THE NEW STATE THAT WE DON'T WANT TO MUTATE
//         return newState;
//       }

//       case CREATE_SPOTS: {
//         const newState = {...state}

//       }
//     default:
//       return state;
//   }
// };

// export default reportReducer;
