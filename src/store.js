import { applyMiddleware, createStore } from "redux";
import thunks from "redux-thunk";

import axios from "axios";

const thingsReducer = (state = [], action) => {
  if (action.type === "GET_THINGS") {
    return action.things;
  } else if (action.type === "CREATE_THING") {
    return [...state, action.thing];
  } else if (action.type === "DELETE_THING") {
    return state.filter((thing) => thing.id !== action.thingId);
  } else if (action.type === 'UPDATE_THING') {
    return state.map(thing => thing.id === action.thing.id ? action.thing : thing);
  }
  return state;
};

// this is our thunk
const getThings = () => {
  // our return value should be a `function that makes an axios call`
  // this function takes in 1 arg which is dispatch
  return async (dispatch) => {
    const { data } = await axios.get("/things");
    dispatch({
      type: "GET_THINGS",
      things: data,
    });
  };
};

const createThing = (name) => {
  return async (dispatch) => {
    const { data } = await axios.post("/thing", { name });
    dispatch({
      type: "CREATE_THING",
      thing: data,
    });
  };
};

const deleteThing = (id) => {
  return async (dispatch) => {
    await axios.delete(`/thing/${id}`);
    dispatch({
      type: "DELETE_THING",
      thingId: id,
    });
  };
};

const updateThing = (id, name) => {
  return async dispatch => {
    const {data} = await axios.put(`/thing/${id}`, { name });
    dispatch({
      type: 'UPDATE_THING',
      thing: data,
    });
  };
};

const store = createStore(thingsReducer, applyMiddleware(thunks));

export default store;
export { getThings, createThing, deleteThing, updateThing };

// this attaches your `store` variable to the `window` object
// this means you can access `store` in your chrome console
window.store = store;
