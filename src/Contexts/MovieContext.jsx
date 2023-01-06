import React, {useState, useEffect, useMemo} from "react";

export const MovieContext = React.createContext();

export function MovieProvider(props) {

  const [onTheatresMovies, setOnTheatresMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-08-01&primary_release_date.lte=2021-08-06&api_key=eabb83258512d6378ba85bb338210a45')
      .then(response => response.json())
      .then(response => setOnTheatresMovies(response.results))
      .catch((error) => console.error(error.message));

    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=eabb83258512d6378ba85bb338210a45')
      .then(response => response.json())
      .then(response => setPopularMovies(response.results))
      .catch((error) => console.error(error.message));
  }, []);

  const value = useMemo(() => {
    return({
      onTheatresMovies,
      popularMovies
    })
  }, [onTheatresMovies, popularMovies])

  return <MovieContext.Provider value={value} {...props}/>

}