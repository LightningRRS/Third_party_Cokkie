import Axios from "axios";
import React, { useEffect, useState } from "react";
import MovieResult from "./MovieResult";
import "./SearchResult.css";

const SearchResult = ({ searchValue ,setSearchvalue }) => {
  const [movies, setMovies] = useState([]);

  useEffect(async () => {
    // const search = URL(searchValue);
    // https://api.themoviedb.org/3/search/movie?api_key=02e1cbd849b17d1d2c35dcffede49fa3&query=toy&page=1

    const base =
      "https://api.themoviedb.org/3/search/movie?api_key=02e1cbd849b17d1d2c35dcffede49fa3&query=";

    var query = encodeURIComponent(searchValue);

    const end = "&page=1";

    var tobeSearched = base + query + end;

    console.log("URL : ", tobeSearched);

    const promise = await Axios.get(tobeSearched);
    // console.log(promise.data.results);
    setMovies(promise.data.results);
  }, [searchValue]);

  console.log(movies);

  return (
    <div className="search__result">
      <h1 className="search__heading">
        {`Search Results for ${searchValue} : `}
      </h1>

      {movies.length !== 0 && (
        <div className="movie__results">
          {movies.map((movie) => (
            <MovieResult
              id = {movie.id}
              title={movie.title}
              ImageUrl={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
              setSearchvalue = {setSearchvalue}
            />
          ))}
        </div>
      )}

      {movies.length === 0 && <h1>No Result Found</h1>}
    </div>
  );
};

export default SearchResult;
