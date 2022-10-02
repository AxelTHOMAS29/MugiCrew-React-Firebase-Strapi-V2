import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import LogoDetails from '../components/LogoDetails';
import Navigation from '../components/Navigation';
import CharactersDetails from '../components/strapi/CharactersDetails';

const PersonnageDetails = () => {
    return (
        <div className='charactersDetails'>
            <Navigation />
            <main>
                <div className='background'>
                    <img className='background-Img' src='../img/LuffyBack.jpg' />
                </div>
                <section className='home-container'>
                    <LogoDetails />
                    <Navigation />
                    <NavLink to="/personnages">
                        <button>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                    </NavLink>
                    <CharactersDetails />
                </section>
                <div className='background background2'>
                    <img className='background-Img' src='../img/ZoroBack.jpg' />
                </div>
            </main>
        </div>
    );
};

export default PersonnageDetails;