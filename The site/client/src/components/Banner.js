import Axios from "axios";
import React, { useEffect, useState } from "react";
import "./Banner.css";
import cookies from '../CookieConfig';
import cookie from "../CookieConfig";

const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      // const bannerMovieRequest = await Axios.get(
      //   "https://api.themoviedb.org/3/discover/movie?api_key=02e1cbd849b17d1d2c35dcffede49fa3&language=en-US&sort_by=popularity.desc&with_genres=28"
      // );
      // console.log(movieArray);
      const third_party = await Axios.get(
        "http://localhost:8000/banner"
      );
      console.log(third_party);
      let a = cookie.getAll()
      console.log(a)
      cookie.set("From_port_8000" , third_party.data);

      // let movieArray = bannerMovieRequest.data.results;
      const bannerMov = {adult: false, backdrop_path: '/fEe5fe82qHzjO4yej0o79etqsWV.jpg', genre_ids: Array(5), id: 629542, original_language: 'en'};

      setBannerMovie(bannerMov);
      // console.log("BannerMovie : ", bannerMovie);
    }
    fetchdata();
  }, []);
  // console.log("BannerMovie 2 : ", bannerMovie);

  function shorten(str, len) {
    return str?.length > len ? str.substr(0, len) + "..." : str;
  }
  
  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("http://image.tmdb.org/t/p/original/fEe5fe82qHzjO4yej0o79etqsWV.jpg")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <div>
          <h1>{bannerMovie?.title || "NO Game NO LIfe"}</h1>
        </div>
        <div className="banner__buttons">
          <button>
            <a href={`/${bannerMovie.id}`}>Play</a>
          </button>
          <button>My List</button>
        </div>
        <div className="banner__description">
          {bannerMovie !== null ? shorten(bannerMovie.overview, 200) : "..."}
        </div>
      </div>
    </div>
  );
};

export default Banner;

//http://image.tmdb.org/t/p/original${bannerMovie?.backdrop_path}