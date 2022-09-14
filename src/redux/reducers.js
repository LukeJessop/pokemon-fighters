const initialState = {
  //creates an initial global state
  username: "",
  userId: 0,
  usersPokemon: [],
};

const LOGIN_USER = "LOGIN_USER"; //these are just creating the type of function for the rootReducer to identify what we want to do when the other functions are called
const UPDATE_USER_POKEMON = "UPDATE_USER_POKEMON";

export function updateUser(user) {
  //this is an exported function that takes in a user obj and stores it as its payload
  return {
    type: LOGIN_USER,
    payload: user
  };
}
// console.log(updateUser())

export function updateUserPokemon(pokemonArray) {
  //this is an exported function that takes an array and stores it as the payload
  return {
    type: UPDATE_USER_POKEMON,
    payload: pokemonArray,
  };
}

//this is where all of the functions come together and get called
//the functions above get handed through the action param and we destructure payload and type off of their return value
//this is a conditional "switch" that takes in the 'type' and if the "case" matches "type" then it returns the new object with updated pairs
// this is the update user case that will run when user has logged in or registered, it just sets username and userId
//this updates the pokemon array so all components can use this instead of calling a get request on every single component. The initial get request will happen on App.js and then will be sent here for global access
//this just sets global state to the initial state so no data persists after logging out
//this just defaults to the current inital state

export default function reducer (state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return { ...state, username: payload.username, userId: payload.userId };
    case UPDATE_USER_POKEMON:
      return { ...state, usersPokemon: payload.userpokemon };
    default:
      return state;
  }
}
