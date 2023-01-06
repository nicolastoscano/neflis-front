import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import FavouriteButton from "./FavouriteButton";

const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb('eabb83258512d6378ba85bb338210a45')


const Movie = () => {
  const {id} = useParams();

  const [movie, setMovie] = useState();

  useEffect(() => {

    requestMovie()

  },[id]);

  const requestMovie = async () => {
    try {
      const mov = await moviedb.movieInfo({ id });
      setMovie(mov);
    } catch (e) {
      console.error(e);
    }
  }

  if (!movie) {
    return <></>
  }

  return (
    <div className=" flex ">
      <div>
        <FavouriteButton movie={movie}/>
        <img className="h-96 " alt="movie" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
      </div>
      <div className=" flex flex-col justify-between p-6 ">
        <h1 className=" text-4xl text-white ">{movie.title}</h1>
        <div className="flex flex-col " >
          <h1 className="text-white" >{movie.genres.map(genre => genre.name).join(", ")}</h1>
          <h1 className="text-white my-4" >{movie.runtime} minutes.</h1>
          <h1 className="text-white" >{movie.overview}</h1>
        </div>
      </div>
    </div>
  )
}
export default Movie;