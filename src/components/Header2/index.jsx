import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const styles = ({ isActive }) => ({ textDecoration: isActive ? "underline" : "none" });
import "./index.css";
import { useAuth } from "../../context/AuthProvider";
import AccountHeader from "../AccountHeader";

export default function Header2() {

    const { user } = useAuth();

    return (
        <>
            <header id="header2">
                <nav>
                    <NavLink to="/" style={styles}>
                        Home
                    </NavLink>
                    <NavLink to="/about" style={styles}>
                        About
                    </NavLink>
                    <NavLink to="/guardians" style={styles}>
                        Guardians
                    </NavLink>
                    <NavLink to="/leaderboard" style={styles}>
                        Leaderboard
                    </NavLink>
                    <NavLink to="/game" style={styles}>
                        Game
                    </NavLink>
 
                    {user ? (
                        <AccountHeader />
                    ) : (
                        <>
                            <NavLink to="/login" style={styles}>
                                Login
                            </NavLink>
                            <NavLink to="/signup" style={styles}>
                                Sign Up
                            </NavLink>
                        </>
                    )}

                </nav>
            </header>
            <Outlet />
        </>
    );
}
