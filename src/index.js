import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import axios from "axios";
import { Provider, useDispatch, useSelector } from "react-redux";

import store, { getThings, createThing, deleteThing } from "./store";
import Thing from "./Thing";

const App = () => {
  const [things, setThings] = useState([]);
  const [name, setName] = useState("");

  const thingsFromStore = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    // we dispatch our thunk
    dispatch(getThings());
  }, []);

  return (
    <>
      {thingsFromStore.map((thing) => (
        <Thing key={thing.id} thing={thing} />
      ))}
      <input
        value={name}
        onChange={({ target }) => setName(target.value)}
        placeholder="Name"
      />
      <button onClick={() => dispatch(createThing(name))}>Create</button>
    </>
  );
};

const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
