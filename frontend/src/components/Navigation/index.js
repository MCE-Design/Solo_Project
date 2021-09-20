import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup" className="sign-up-button">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div id="nav-bar">
      <ul>
        <li>
          <NavLink exact to="/" className="home-button">AirD&D</NavLink>

        </li>
        <li className="spacer"></li>
        {/* <li>
        </li> */}{/* If there's time a Spot Search Box will go here */}
        <li className="session-links">
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
