import React from 'react'
import './MovieResult.css'
import {Link} from 'react-router-dom'

const MovieResult = ({title, ImageUrl, id ,setSearchvalue}) => {
    return (
        <div className="movie__result">
            <div>
               <Link to={`/${id}`} onClick={() => setSearchvalue("")}>  <img className="movieResult__posters" src={ImageUrl} alt={title}/> </Link>
            </div>
            <div className="movie__name">
                {title}
            </div>
        </div>
    )
}

export default MovieResult
