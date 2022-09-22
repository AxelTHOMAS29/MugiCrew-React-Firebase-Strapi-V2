import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
    return (
        <div className='loading'>
             <FontAwesomeIcon icon={faSpinner} className='loading-icon' />
        </div>
    );
};

export default Loading;