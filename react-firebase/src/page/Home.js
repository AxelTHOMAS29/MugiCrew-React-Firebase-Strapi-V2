import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Home = () => {
    return (
        <div className='home'>
            <Navigation />
            <main>
                <div className='background'>
                    <img className='background-Img' src='./img/LuffyBack.jpg' />
                </div>
                <section>
                    <Logo />
                    <Navigation />
                    <div className='home-container'>
                    <div className='home-title'>
                        <h2>Bienvenue sur Mugi Crew ! Le site qui regroupe toutes les informations sur One Piece et vous permet d'en discuter librement</h2>
                    </div>
                    <h4>Le site est encore en cours de construction, certaines pages peuvent ne pas être completes !!</h4>
                    <div className='mangaPlus-container'>
                        <a href='https://mangaplus.shueisha.co.jp/titles/700005' target='_blank' className='mangaPlus-link'>
                            <img src='./img/nextChap.png' />
                            <p>Lien vers les derniers chapitres...</p>
                        </a>
                    </div>
                    </div>
                </section>
                <div className='background background2'>
                    <img className='background-Img' src='./img/ZoroBack.jpg' />
                </div>
            </main>
        </div>
    );
};

export default Home;