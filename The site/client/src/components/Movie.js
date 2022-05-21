import React, { useEffect } from "react";
import "./Movie.css";



const Movie = ({ id, title, imageUrl }) => {
  return (
    // <div className="movie__link">
    <a href={`/${id}`}>
      <img
        className="movie__posters"
        src={imageUrl}
        alt={title}
        // onClick={`location.href = '/${id}';`}
      />
    </a>
    // </div>
  );
};

export default Movie;
