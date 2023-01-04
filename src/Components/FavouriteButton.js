import React, {useContext} from "react";
import {FavouritesMoviesContext} from "../Contexts/FavouritesMoviesContext";

const FavouriteButton =({movie}) => {
  const [favouritesMovies, toggleFavourites] = useContext(FavouritesMoviesContext);
  const isFavourite = favouritesMovies.find(fm => movie.id === fm.id);

  return (
    <button
      className="flex w-8	h-8 absolute justify-center text-3xl font-bold"
      onClick={() => toggleFavourites(movie)}
      style={{
        color: isFavourite ? 'red' : 'gray',
        backgroundColor: "rgb(0 0 0 / 60%)"
      }}
    >
      ♡
    </button>
  )
}
export default FavouriteButton