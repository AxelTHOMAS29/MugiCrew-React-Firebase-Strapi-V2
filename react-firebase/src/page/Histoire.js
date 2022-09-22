import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import Stories from '../components/strapi/Stories';

const Histoire = () => {


    return (
        <div className='histoire'>
            <Navigation />
            <main>
                <div className='background'>
                    <img className='background-Img background-img-2' src='./img/SanjiBack2.jpg' />
                </div>
                <section className='home-container'>
                    <Logo />
                    <div className='histoire-saga-title'>
                        <h2>Liste des Sagas</h2>
                    </div>
                    <Stories />
                </section>
                <div className='background background2'>
                    <img className='background-Img' src='./img/JimbeBack.jpg' />
                </div>
            </main>
        </div>
    );
};

export default Histoire;