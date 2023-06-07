// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import hotSpot from './Images/hot-spot-pic.jpeg'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  
  return (
    <ul className="header">
      <li className="home">
        <NavLink style={{textDecoration: 'none'}} exact to="/">
          <span className="site-title">HotSpotBnb</span>
          <img className="hot-spot" src={hotSpot} alt=""></img>
          </NavLink>
          
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;