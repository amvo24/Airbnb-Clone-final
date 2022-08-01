import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './demoUser.css'

export default function DemoUser() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const credential = "demo@user.io";
    // const firstName = "andrew";
    // const lastName = "vo";
    const password = "password";
    return dispatch(sessionActions.login({ credential, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <button className="demoButton" type="submit">Demo User</button>
    </form>
  );
}
