import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteThing, updateThing } from "./store";

const Thing = ({ thing }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');

  /**
   * what does an input need?
   * it needs 2 things
   * a value
   * an onChange to change the value 
   * 
   */

  const onChange = (event) => {
    const value = event.target.value;
    setValue(value);
  };

  const onSubmit = () => {
    // this is the point where we call a thunk to update the thing
    dispatch(updateThing(thing.id, value));
  };

  return (
    <div>
      <h4>{thing.name}</h4>
      <button onClick={() => dispatch(deleteThing(thing.id))}>X</button>
      <input value={value} onChange={onChange} />
      <button onClick={onSubmit}>Update me</button>
    </div>
  );
};

export default Thing;
