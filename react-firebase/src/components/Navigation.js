import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul>
                <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Accueil</li>
                </NavLink>
                <NavLink
                    to="/histoire"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Histoire</li>
                </NavLink>
                <NavLink
                    to="/personnages"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Personnages</li>
                </NavLink>
                <NavLink
                    to="/discussion"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Discussion</li>
                </NavLink>
                <NavLink
                    to="/log"
                    className={(nav) => (nav.isActive ? "nav-active" : "")}>
                    <li>Connexion</li>
                </NavLink>  
            </ul>
        </nav>
    );
};

export default Navigation;