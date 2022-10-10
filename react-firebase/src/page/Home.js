import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import { motion } from "framer-motion";
import { test1, transition } from "../animation/animation";

const Home = () => {
    return (
        <motion.div className='home' initial='out' animate='in' exit='out' variants={test1} transition={transition}>
            <Navigation />
            <main>
                <div className='background'>
                    <img className='background-Img' src='./img/LuffyBack.jpg' alt='luffy one piece' />
                </div>
                <section>
                    <Logo />
                    <Navigation />
                    <div className='home-container'>
                        <div className='home-title'>
                            <h2>Bienvenue sur Mugi Crew ! Le site qui regroupe toutes les informations sur One Piece et vous permet d'en discuter librement</h2>
                        </div>
                        <h4>Le site est encore en cours de construction, certaines pages peuvent ne pas être complètes !!</h4>
                        <div className='mangaPlus-container'>
                            <a href='https://mangaplus.shueisha.co.jp/titles/700005' target='_blank' rel="noreferrer" className='mangaPlus-link'>
                                <img src='./img/nextChap.png' alt='les chapitre de one piece sur manga plus' />
                                <p>Les derniers chapitres...</p>
                            </a>
                        </div>
                        <div className='mangaPlus-container'>
                            <a href='https://fr.bandainamcoent.eu/one-piece/one-piece-odyssey' target='_blank' rel="noreferrer" className='mangaPlus-link'>
                                <img src='./img/odyssey.jpg' alt='one piece odyssey jeu console et pc' />
                                <p>Les news One Piece Odyssey</p>
                            </a>
                        </div>
                    </div>
                </section>
                <div className='background background2'>
                    <img className='background-Img' src='./img/ZoroBack.jpg' alt='zoro one piece' />
                </div>
            </main>
        </motion.div>
    );
};

export default Home;