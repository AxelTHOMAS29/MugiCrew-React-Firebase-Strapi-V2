import React from 'react';
import { Link } from 'react-router-dom';
import useFetchHistoire from '../../hooks/useFetchHistoire';
import Loading from '../Loading';

const Stories = () => {
    const { loadingHistoire, errorHistoire, dataHistoire } = useFetchHistoire('http://localhost:1337/api/histoires?populate=*')

    if (loadingHistoire) return <Loading />
    if (errorHistoire) return <p>error</p>

    return (
        <div className='histoire-container'>
        {dataHistoire.data.map(Histoire => (
            <Link to={`/histoireDetail/${Histoire.id}`}>
                <div key={Histoire.attributes.id} className='item'>
                    <div className='histoire-name'><h2>{Histoire.attributes.Nom}</h2></div>
                    <img className='histoire-img' src={"http://localhost:1337" + Histoire.attributes.Image.data.attributes.url}></img>
                </div>
             </Link>
        ))}
    </div>
    );
};

export default Stories;