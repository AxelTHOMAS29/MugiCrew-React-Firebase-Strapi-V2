import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Loading from '../Loading';
import Error from '../Error';


const Characters = () => {
    const { loading, error, data } = useFetch('http://localhost:1337/api/characters?populate=*')
    const [ searchName, setSearchName] = useState("")

    if (loading) return <Loading />
    if (error) return <Error />

    return (
        <div className='page-container'>
            <input className='searchBar' type="text" placeholder="Recherche..."
                onChange={(event) => {
                    setSearchName(event.target.value)
                }} />
            <div className='item-container'>
            {data.data.filter((character)=> {
                if (searchName =="") {
                    return character
                } else if (character.attributes.Name.toLowerCase().includes(searchName.toLowerCase())) {
                    return character
                }
            })
            .map(character => (
                <Link to={`/details/${character.id}`}>
                <div key={character.attributes.id} className='item'>
                    <div className='item-name'>{character.attributes.Name}</div>
                    <img className='item-img' src={"http://localhost:1337" + character.attributes.picture.data.attributes.formats.thumbnail.url}></img>
                </div>
                </Link>
            ))}
            </div>
            
        </div>
    );
};

export default Characters;