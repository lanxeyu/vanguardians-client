import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { useAuth } from "../../context/AuthProvider";

const AccountHeader = () => {
    const [name, setName] = useState('Duncan');

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser("");
    };

    function toggleDropdown(e) {
        e.preventDefault();
        if (e.target.classList.contains('account-header-open')) {
            e.target.classList.remove('account-header-open');
        }
        else {
            e.target.classList.add('account-header-open');
        }
        let listElement = e.target.closest('#account-header-wrapper').querySelector('#account-header-dropdown-list');
        if (listElement.classList.contains('expand')) {
            listElement.classList.remove('expand');
        }
        else {
            listElement.classList.add('expand');
        }
    }
    
    useEffect(() => {
        
    }, []);

    return (
        <div id="account-header-wrapper">
            <button id="account-header-button" onClick={toggleDropdown}>{name}</button>
            <div id="account-header-dropdown-list">
                    <NavLink className="account-header-dropdown-item" to="/stats">
                        Stats
                    </NavLink>
                    <NavLink className="account-header-dropdown-item" to="/" onClick={handleLogout} >
                        Logout
                    </NavLink>

            </div>
        </div>
    );
};

export default AccountHeader;
