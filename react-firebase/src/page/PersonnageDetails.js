import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import LogoDetails from '../components/LogoDetails';
import Navigation from '../components/Navigation';
import CharactersDetails from '../components/strapi/CharactersDetails';
import { motion } from "framer-motion";
import { test1, transition } from "../animation/animation";

const PersonnageDetails = () => {
    return (
        <motion.div className='charactersDetails' initial='out' animate='in' exit='out' variants={test1} transition={transition}>
            <Navigation />
            <main>
                <div className='background'>
                    <img className='background-Img' src='../img/LuffyBack.jpg' alt='luffy one piece' />
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
                    <img className='background-Img' src='../img/ZoroBack.jpg' alt='zoro one piece' />
                </div>
            </main>
        </motion.div>
    );
};

export default PersonnageDetails;