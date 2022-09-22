import React from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Discussions = () => {
    return (
        <div className='discussion'>
            <Navigation />
            <main>
                <div className='background'> 
                    <img className='background-Img background-img-2' src='./img/NamiBack.jpg' />
                </div>
                <section className='home-container'>
                    <Logo />
                    <h1>Work in Progress</h1>
                </section>
                <div className='background background2'>
                    <img className='background-Img background-img-2' src='./img/UssopBack.jpg' />
                </div>
            </main>
        </div>
    );
};

export default Discussions;