import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import FavouriteButton from "./FavouriteButton";
import MovieList from "./MovieList";
import ReactPlayer from "react-player";

const { MovieDb } = require('moviedb-promise')
const moviedb = new MovieDb('eabb83258512d6378ba85bb338210a45')



const Movie = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState();

  const [recommendedMovies, setRecommendedMovies] = useState([])
  const [movieTrailers, setMovieTrailers] = useState([])


  useEffect(() => {
    requestMovie()

    fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=eabb83258512d6378ba85bb338210a45`)
      .then(response => response.json())
      .then(response => setRecommendedMovies(response.results))
      .catch((error) => console.error(error.message));


    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=eabb83258512d6378ba85bb338210a45`)
      .then(response => response.json())
      .then(response => setMovieTrailers(response.results))
      .catch((error) => console.error(error.message));
  },[id]);

  console.log(movieTrailers.[36])

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
    <div className=" flex flex-col">
      <div className="flex">
        <div>
            <FavouriteButton movie={movie}/>
            <img className=" object-cover h-96 w-64 " alt="movie" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
        </div>
        <div className=" flex flex-col justify-between p-6 ">
          <h1 className=" text-4xl text-white ">{movie.title}</h1>
          <div className="flex flex-col " >
            <h1 className="text-white" >Genres: {movie.genres.map(genre => genre.name).join(", ")}</h1>
            <h1 className="text-white my-4" >{movie.runtime} minutes.</h1>
            <h1 className="text-white" >{movie.overview}</h1>
          </div>
        </div>
      </div>
      <h1 className=" text-3xl tracking-wide pt-6 m-1 text-gray-200 ">
        Watch trailer
      </h1>
      <ReactPlayer url='https://www.youtube.com/watch?v=${}' />
      <h1 className=" text-3xl tracking-wide pt-6 m-1 text-gray-200 ">
        Similar movies
      </h1>
      <MovieList movies={recommendedMovies}/>
    </div>


  )
}
export default Movie;

// {"adult":false,"backdrop_path":"/lzLzKXq2C0kL5Pu7VW5sNl5KV6L.jpg","belongs_to_collection":null,"budget":0,"genres":[{"id":80,"name":"Crime"},{"id":9648,"name":"Mystery"},{"id":53,"name":"Thriller"}],"homepage":"https://www.netflix.com/title/80994937","id":597433,"imdb_id":"tt10230994","original_language":"en","original_title":"Beckett","overview":"An American tourist in Greece finds himself on the run after a tragic accident plunges him into a political conspiracy that makes him a target for assassination.","popularity":30.132,"poster_path":"/fBJducGBcmrcIOQdhm4BUBNDiMu.jpg","production_companies":[{"id":1583,"logo_path":"/gKP4egMJOi5rksdnplfPV1wa0sd.png","name":"RAI","origin_country":"IT"},{"id":30666,"logo_path":"/g8LmDZVFWDRJW72sj0nAj1gh8ac.png","name":"RT Features","origin_country":"BR"},{"id":46344,"logo_path":"/uWNb5rg5RuZwcjJ7XTItXj44Gzm.png","name":"Frenesy Film","origin_country":"IT"},{"id":64061,"logo_path":null,"name":"MeMo Films","origin_country":"IT"},{"id":159107,"logo_path":"/uKfWUrpQiu4Pz60vkFQZglEIAlp.png","name":"Wise Pictures","origin_country":"IT"}],"production_countries":[{"iso_3166_1":"BR","name":"Brazil"},{"iso_3166_1":"IT","name":"Italy"}],"release_date":"2021-08-04","revenue":0,"runtime":109,"spoken_languages":[{"english_name":"Greek","iso_639_1":"el","name":"ελληνικά"},{"english_name":"English","iso_639_1":"en","name":"English"}],"status":"Released","tagline":"Born to be murdered.","title":"Beckett","video":false,"vote_average":6.311,"vote_count":560}

// id: 597433

