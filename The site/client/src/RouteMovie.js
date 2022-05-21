import Axios from "axios";
import "./RouteMovie.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import MovieTrailer from "movie-trailer";
import Youtube from "react-youtube";

const RouteMovie = () => {
  console.log("rotemovie me");
  const { id } = useParams();
  const [movieRouted, setMovieRouted] = useState({});
  const [trailer, setTrailer] = useState("");
  const [buttonIcon, setButtonIcon] = useState(<PlayArrowIcon />);
  let s = "";
  useEffect(() => {
    async function fetchdata() {
      const promise = await Axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=02e1cbd849b17d1d2c35dcffede49fa3&language=en-US`
      );
      setMovieRouted(promise.data);
    }
    fetchdata();
    console.log("------->>>>>>>>>>>>", movieRouted);
  }, [id]);

  movieRouted.genres?.forEach((element) => {
    s += element.name + ",";
  });

  const handleTrailer = (movie) => {
    console.log("bbbbbbbbbbbbbbbbbbbbbbbbbb");
    if (trailer) {
      setTrailer("");
      setButtonIcon(<PlayArrowIcon />);
    } else {
      MovieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailer(urlParams.get("v"));
          setButtonIcon(<StopIcon />);
        })
        .catch((e) => console.log(e));
      console.log("trailleeerrr ->>>", trailer);
    }
  };

  console.log(trailer);

  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div className="movieRouted__fullPage">
      <div className="movieRouted_page">
        <div>
          <img
            className="movieRouted__poster"
            src={`http://image.tmdb.org/t/p/original/${movieRouted.poster_path}`}
            alt=""
          />
        </div>

        <div className="movieRouted__description">
          <div className="movieRouted__descriptionTitle">
            <div className="movieRouted__descriptionName">
              <h1>{movieRouted.title}</h1>
              <div className="movieRouted__descriptionInfo">
                {`${movieRouted.release_date} | ${movieRouted.runtime} mins | ${
                  movieRouted.adult ? "16+" : "13+"
                }`}
              </div>
            </div>

            <div>
              <button
                className="movieRouted__trailerButton"
                onClick={() => handleTrailer(movieRouted)}
              >
                {buttonIcon}
              </button>
            </div>

            <div className="movieRouted__descriptionRating">
              {`${Math.ceil(movieRouted.vote_average)}🌟`}
            </div>
          </div>

          <div className="movieRouted__overview">{movieRouted.overview}</div>

          <div className="movieRouted__interests">
            <div className="movieRouted__genre">
              {s.substring(0, s.length - 1)}
            </div>
            <div className="movieRouted__ImdbRating">
              <div className="movieRouted__GOTOIMDB">GO TO IMDB</div>
              <div>
                <a
                  href={`https://www.imdb.com/title/${movieRouted.imdb_id}`}
                  target="_blank"
                >
                  <ExitToAppIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {trailer && (
        <div className="movieRouted__trailer">
          <Youtube videoId={trailer} opts={opts} />
        </div>
      )}
    </div>
  );
};

export default RouteMovie;

// https://api.themoviedb.org/3/movie/671039?api_key=02e1cbd849b17d1d2c35dcffede49fa3&language=en-US
