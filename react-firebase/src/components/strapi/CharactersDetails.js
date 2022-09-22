import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading';


const CharactersDetails = () => {
    const { id } = useParams()
    const { loading, error, data } = useFetch(`http://localhost:1337/api/characters/${id}?populate=*`)

    if (loading) return <Loading />
    if (error) return <p>error</p>

    return (
        <div>
            <div className='details-container' key={data.data.attributes.id}>
                <img className='details-img' src={"http://localhost:1337" + data.data.attributes.picture.data.attributes.formats.thumbnail.url} />
                <div className='details-nom-age'>
                    <div><h2>Nom : {data.data.attributes.Name}</h2></div>
                    <div><h2>Age : {data.data.attributes.age}</h2></div>
                </div>
            </div>
            <div className='details-description-container'>
                <h3>Description</h3>
                <ReactMarkdown className='details-description'>{data.data.attributes.Description}</ReactMarkdown>
            </div>
        </div>
    );

};

export default CharactersDetails;