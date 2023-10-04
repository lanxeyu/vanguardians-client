import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const styles = ({ isActive }) => ({ textDecoration: isActive ? "underline" : "none" });
import "./index.css";
import { useAuth } from "../../context/AuthProvider";

export default function Header2() {
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser("");
    };

    const { user } = useAuth();

    return (
        <>
            <header id="header2">
                <nav>
                    <NavLink to="/" style={styles}>
                        Home
                    </NavLink>
                    <NavLink to="/leaderboard" style={styles}>
                        Leaderboard
                    </NavLink>
                    <NavLink to="/guardians" style={styles}>
                        Guardians
                    </NavLink>
                    <NavLink to="/game" style={styles}>
                        Game
                    </NavLink>

                    {user ? (
                        <NavLink to="/login" onClick={handleLogout} style={styles}>
                            Logout
                        </NavLink>
                    ) : (
                        <NavLink to="/login" style={styles}>
                            Login
                        </NavLink>
                    )}
                    {/* <NavLink to="/signup" style={styles}>Sign Up</NavLink> */}
                </nav>
            </header>
            <Outlet />
        </>
    );
}
