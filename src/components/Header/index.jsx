import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
const styles = ({ isActive }) => ({ textDecoration: isActive ? 'underline' : 'none'});
import './index.css'

export default function Header () {
    return (
      <main>
        <header>
          <nav>
            <NavLink to="/" style={styles}>Home</NavLink>
            <NavLink to="/leaderboard" style={styles}>Leaderboard</NavLink>
            <NavLink to="/characters" style={styles}>Characters</NavLink>
            <NavLink to="/game" style={styles}>Game</NavLink>
          </nav>
        </header>
        <Outlet />
      </main>
    )
}
