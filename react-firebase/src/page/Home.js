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
                <section className='home-container'>
                    <Logo />
                    <Navigation />
                    <h1>Le site est encore en cours de construction, certaines pages peuvent ne pas être completes</h1>
                </section>
                <div className='background background2'>
                    <img className='background-Img' src='./img/ZoroBack.jpg' />
                </div>
            </main>
        </div>
    );
};

export default Home;