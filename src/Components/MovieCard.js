import React from "react";
import {Link} from "react-router-dom";
import FavouriteButton from "./FavouriteButton"

const MovieCard = ({movie}) => {


  return (
    <div className=" max-w-xs back shadow-lg flex relative ml-14 mr-14 transition duration-500 ease-in-out transform hover:-translate-y-0.5 hover:scale-105">
      <FavouriteButton movie={movie}/>
      <Link to={`/movie/${movie.id}`}>
        <img alt="movie" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
      </Link>
    </div>
  );
}

export default MovieCard;

// 266 × 399 px