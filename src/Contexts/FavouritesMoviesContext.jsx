import React, {useEffect, useState} from "react";

export const FavouritesMoviesContext = React.createContext();

export function FavouritesMoviesProvider (props) {
  const [favouritesMovies, setFavouritesMovies] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/movies', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }})
      .then(response => response.json())
      .then(response => {
        if (Array.isArray(response)) {
          setFavouritesMovies(response)
        }
      })
      .catch(console.error);
  }, []);

  const toggleFavourites = (movie) => {
    if (favouritesMovies.find(fm => movie.id == fm.id)) {
      setFavouritesMovies(favouritesMovies.filter(fm => fm.id != movie.id))
      fetch(`http://localhost:8000/api/movies/${movie.id}`, {
        method: 'delete',
        body: JSON.stringify(movie),
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
    } else {
      setFavouritesMovies(favouritesMovies.concat([movie]))
      fetch('http://localhost:8000/api/movies', {
        method: 'post',
        body: JSON.stringify(movie),
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).catch(() => {})
    }
  }

  return <FavouritesMoviesContext.Provider value={[favouritesMovies, toggleFavourites]} {...props} />
}