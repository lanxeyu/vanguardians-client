import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const styles = ({ isActive }) => ({ textDecoration: isActive ? "underline" : "none" });
import "./index.css";
import { useAuth } from "../../context/AuthProvider";
import AccountHeader from "../AccountHeader";

export default function Header() {
    const { user } = useAuth();
    const [ tokenExists, setTokenExists ] = useState('false');

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            setTokenExists(true);
        }
    }, []);

    return (
        <>
            <header>
                <NavLink id="nav-title" to="/">
                    VanGuardians
                </NavLink>
                <nav>
                    <NavLink to="/" style={styles}>
                        Home
                    </NavLink>
                    <NavLink to="/about" style={styles}>
                        Lore
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

                    { localStorage.getItem("token") ? 
                         <AccountHeader /> 
                        : (
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
