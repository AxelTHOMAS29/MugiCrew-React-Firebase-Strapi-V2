import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import Stories from '../components/strapi/Stories';
import { motion } from "framer-motion";
import { test1, transition } from "../animation/animation";

const Histoire = () => {


    return (
        <motion.div className='histoire' initial='out' animate='in' exit='out' variants={test1} transition={transition}>
            <Navigation />
            <main>
                <div className='background'>
                    <img className='background-Img background-img-2' src='./img/SanjiBack2.jpg' alt='sanji one piece' />
                </div>
                <section className='home-container'>
                    <Logo />
                    <Navigation />
                    <div className='histoire-saga-title'>
                        <h2>Liste des Sagas</h2>
                    </div>
                    <Stories />
                </section>
                <div className='background background2'>
                    <img className='background-Img' src='./img/NamiBack8.jpg' alt='nami one piece' />
                </div>
            </main>
        </motion.div>
    );
};

export default Histoire;