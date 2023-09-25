import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
const styles = ({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none'});
import './index.css'

export default function Header () {
    return (
      <>
        <header>
            <NavLink id='nav-title' to="/">Vanguardians</NavLink>
          <nav>
            <NavLink to="/" style={styles}>Home</NavLink>
            <NavLink to="/leaderboard" style={styles}>Leaderboard</NavLink>
            <NavLink to="/characters" style={styles}>Characters</NavLink>
            <NavLink to="/game" style={styles}>Game</NavLink>
            <NavLink to="/login" style={styles}>Login</NavLink>
            <NavLink to="/signup" style={styles}>Sign Up</NavLink>
          </nav>
        </header>
        <Outlet />
      </>
    )
}
