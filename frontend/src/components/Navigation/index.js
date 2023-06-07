// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import hotSpot from './Images/hot-spot-pic.jpeg'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  let session;

  if (!sessionUser) {
    session = (
      <div>
        <ProfileButton user={sessionUser} />
      </div>
    )
  } else {
    session = (
      <div>
        <div>
          <Link to="/spots/new"><button className="new-spot-button">Create a New Spot</button></Link>
        </div>
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    )
  }
  return (
    <ul className="header">
      <li className="home">
        <NavLink style={{textDecoration: 'none'}} exact to="/">
          <span className="site-title">HotSpotBnb</span>
          <img className="hot-spot" src={hotSpot} alt=""></img>
          </NavLink>
          
      </li>
      {isLoaded && session}
    </ul>
  );
}

export default Navigation;