import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movie from "./Movie";
import "./Row.css";

const Row = ({ title, id }) => {
  const [movies, setMovies] = useState([]);
  useEffect(async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=02e1cbd849b17d1d2c35dcffede49fa3&language=en-US&sort_by=popularity.desc&with_genres=${id}`;
    const promise = await Axios.get(url);
    // console.log("promise : ", promise.data.results);
    setMovies(promise.data.results);
  }, [id]);

  return (
    <div className="row">
      <div className="row__title">{title}</div>
      <div className="row__movies">
        {movies.map((movie) => (
          // <a href={`./${movie.id}`}>
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.title}
              description={movie.overview}
              imageUrl={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
          // </a>
        ))}
      </div>

      {/* <Router>
        {movies.map((movie) => (
          <Route path exact = {`/${movie.id}`}>
            <h1>Hello</h1>
          </Route>
        ))}
      </Router> */}
    </div>
  );
};

export default Row;

// 02e1cbd849b17d1d2c35dcffede49fa3
