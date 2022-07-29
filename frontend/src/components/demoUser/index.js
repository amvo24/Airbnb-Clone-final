import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

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
      <button type="submit">Demo User</button>
    </form>
  );
}
