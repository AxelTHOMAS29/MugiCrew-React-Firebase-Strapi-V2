import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoDetails from '../components/LogoDetails';
import Navigation from '../components/Navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import StoryDetails from '../components/strapi/StoryDetails';

const HistoireDetails = () => {
    return (
        <div className='histoireDetails'>
            <Navigation />
            <main>
                <div className='background'>
                    <img className='background-Img background-img-2' src='../../img/SanjiBack2.jpg' />
                </div>
                <section className='home-container'>
                    <LogoDetails />
                    <Navigation />
                    <NavLink to="/histoire"><button><FontAwesomeIcon icon={faArrowLeft} /></button></NavLink>
                    <StoryDetails />
                </section>
                <div className='background background2'>
                    <img className='background-Img' src='../../img/NamiBack8.jpg' />
                </div>
            </main>
        </div>
    );
};

export default HistoireDetails;