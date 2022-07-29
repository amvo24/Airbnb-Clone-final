// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  console.log("THIS IS YOUR USER", user)


  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
    <div className="button">
      <button className="navBar" onClick={openMenu}>
        <i className="fas fa-bars nav_bars_icon"></i>
        <i className="fas fa-user-circle user_icon"></i>
      </button>
      {showMenu && (
        <div id="menu">
          <h3>{`Welcome ${user.firstName} ${user.lastName}! `}</h3>
          <div>{user.email}</div>
          <Link to="/spots/create" id="dropdown1">
            Host your home
          </Link>
          <Link to={`/user-reviews`} id="dropdown3">
            Your Reviews
          </Link>
          <div onClick={logout} id="dropdown2">
            Log out
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default ProfileButton;
