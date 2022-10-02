import React from 'react';
import Characters from '../components/strapi/Characters';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';


const Personnages = () => {
    return (
        <div className='personnages'>
            <Navigation />
            <main>
                <div className='background'>
                    <img className='background-Img' src='./img/RobinBack.jpg' />
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
                    <img className='background-Img background-img-2' src='./img/YamatoBack.jpg' />
                </div>
            </main>
        </div>
    );
};

export default Personnages;