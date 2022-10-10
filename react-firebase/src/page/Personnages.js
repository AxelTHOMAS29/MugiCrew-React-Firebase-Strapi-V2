import React from 'react';
import Characters from '../components/strapi/Characters';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import { motion } from "framer-motion";
import { test1, transition } from "../animation/animation";

const Personnages = () => {
    return (
        <motion.div className='personnages' initial='out' animate='in' exit='out' variants={test1} transition={transition}>
            <Navigation />
            <main>
                <div className='background'>
                    <img className='background-Img' src='./img/RobinBack.jpg' alt='robin one piece' />
                </div>
                <section className='home-container'>
                    <Logo />
                    <Navigation />
                    <div className='title-container'>
                        <h2>Liste des Personnages</h2>
                    </div>
                    <Characters />
                </section>
                <div className='background background2'>
                    <img className='background-Img background-img-2' src='./img/YamatoBack.jpg' alt='yamato one piece' />
                </div>
            </main>
        </motion.div>
    );
};

export default Personnages;