import React from 'react';
import { NavLink } from 'react-router-dom';
import { auth } from "../utils/firebase.config"
import { signOut } from "firebase/auth"
import { useAuthState } from 'react-firebase-hooks/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
    const [user] = useAuthState(auth);

    //déconexion
    const handleLogout = async () => {
        await signOut(auth);
    }

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
                {user && (
                    <button onClick={() => handleLogout()}>
                        <FontAwesomeIcon className='icon-nav-unlog' icon={faArrowRightToBracket} />
                    </button>)}

            </ul>
        </nav>
    );
};

export default Navigation;