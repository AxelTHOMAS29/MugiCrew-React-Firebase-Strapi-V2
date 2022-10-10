import React from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import useFetchHistoireSingle from '../../hooks/useFetchHistoireSingle';
import useFetchHistoire from '../../hooks/useFetchHistoire';
import Loading from '../Loading';
import Error from '../Error';

const StoryDetails = () => {
    const { id } = useParams()
    const { loadingHistoireSingle, errorHistoireSingle, dataHistoireSingle } = useFetchHistoireSingle(`http://localhost:1337/api/histoires/${id}?populate=*`)
    const { loadingHistoire, errorHistoire, dataHistoire } = useFetchHistoire('http://localhost:1337/api/histoires?populate=*')


    if (loadingHistoireSingle) return <Loading />
    if (errorHistoireSingle) return <Error />
    if (loadingHistoire) return <Loading />
    if (errorHistoire) return <Error />

    return (
        <div>
            <div className='details-container'>
                        <div className='details-title-container'>
                            <img className='details-img' src={"http://localhost:1337" + dataHistoireSingle.data.attributes.Image.data.attributes.url} alt={dataHistoireSingle.data.attributes.Nom} />
                            <div className='details-title'><h1>{dataHistoireSingle.data.attributes.Nom}</h1></div>
                        </div>
                        <div className='details-description'>
                            <h3>Description: </h3>
                            <ReactMarkdown className='description'>{dataHistoireSingle.data.attributes.Description}</ReactMarkdown>
                        </div>
                    </div>
                    <div className='button-page'>
                        {dataHistoire.data.map(Histoire => (
                            <div className='test-b'>
                                <NavLink className={(nav) => (nav.isActive ? "nav-active" : "test-c")} to={`/histoireDetail/${Histoire.id}`}><button className='button-page-suivante'>{Histoire.attributes.Nom}</button></NavLink>
                            </div>
                        ))}
                    </div>
        </div>
    );
};

export default StoryDetails;