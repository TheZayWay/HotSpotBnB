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
      <div className="right-side-nav">
        <div>
          {/* remember to fix link to go to /spots/new */}
          <Link to="/spots/new"><button className="new-spot-button">Create a New Spot</button></Link>
        </div>
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      </div>
    )
  }
  return (
    <div className="header">
      <div className="home">
        <NavLink style={{textDecoration: 'none'}} exact to="/">
          <span className="site-title">HotSpotBnb</span>
          <img className="hot-spot" src={hotSpot} alt=""></img>
          </NavLink>
      </div>
      {isLoaded && session}
    </div>
  );
}

export default Navigation;