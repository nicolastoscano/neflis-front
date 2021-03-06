import {Route, BrowserRouter as Router, Link} from "react-router-dom";
import '../App.css';
import MovieList from "../Components/MovieList";
import React, {useContext, useEffect, useState} from "react";
import Movie from "../Components/Movie";
import AuthForm from "../Components/AuthForm";
import {FavouritesMoviesContext, FavouritesMoviesProvider} from "../Contexts/FavouritesMoviesContext";
import {UserContext, UserProvider} from "../Contexts/UserContext";

export default () => (
  <UserProvider>
    <FavouritesMoviesProvider>
      <App/>
    </FavouritesMoviesProvider>
  </UserProvider>
)

function App() {
  const [onTheatresMovies, setOnTheatresMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [favouritesMovies] = useContext(FavouritesMoviesContext);
  const [authModal, setAuthModal] = useState(false);
  const [user, actions] = useContext(UserContext);

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-08-01&primary_release_date.lte=2021-08-06&api_key=eabb83258512d6378ba85bb338210a45')
      .then(response => response.json())
      .then(response => setOnTheatresMovies(response.results));
    fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=eabb83258512d6378ba85bb338210a45')
      .then(response => response.json())
      .then(response => setPopularMovies(response.results));
  }, []);

  return (
    <Router>
      <div className=" bg-cover bg-gray-900 overflow-hidden ">
        <nav className=" bg-gradient-to-b from-gray-700 flex shadow-lg justify-between align-bottom pl-8 pr-8 ">

          <Link to={'/'}>
            <h1 className=" text-red-600 text-7xl mt-3 ">NEFLIS</h1>
          </Link>
          {authModal !== false && (
            <AuthForm
              onClose={() => setAuthModal(false)}
              onSubmit={actions.onAuthSubmit}
            />
          )}
          {user !== undefined ? (
            <div className=" flex py-5 " >
              <Link to={'/movies'}>
                <h1 className=" text-gray-200 mr-4 mt-5 hover:text-black  ">FAVOURITES MOVIES ???</h1>
              </Link>
              <button
                className=" text-gray-200 border-solid border-2 rounded px-5 py-2.5 hover:bg-red-500 "
                onClick={actions.logoutSubmit}
              >
                LOG OUT
              </button>
            </div>
          ) : (
            <div className=" flex py-5 ">
              <button
                className=" text-gray-200 bg-gray-500 border-solid border-2 rounded border-transparent py-2.5 px-5 hover:bg-white hover:text-black mr-4 "
                onClick={() => setAuthModal('signin')}
              >
                SIGN IN
              </button>
              <button
                className=" text-gray-200 border-solid border-2 rounded border-transparent bg-blue-400 hover:bg-blue-700 py-2.5 px-5 "
                onClick={() => setAuthModal('register')}
              >
                REGISTER
              </button>
            </div>
          )}


        </nav>

        <div className=" p-4 ">
          <Route path='/' exact={true}>
            <p className=" text-3xl tracking-wide pt-6 m-1 text-gray-200 ">On theatres</p>
            <div className=" ml-2 ">
              <MovieList movies={onTheatresMovies}/>
            </div>
            <p className=" text-3xl tracking-wide pt-6 m-1 text-gray-200 ">Popular Movies</p>
            <div className=" m-2 ">
              <MovieList movies={popularMovies}/>
            </div>
          </Route>

          <Route path={'/movies'}>
            <MovieList movies={favouritesMovies}/>
          </Route>

          <Route path='/movie/:id' exact={true}>
            <Movie/>
          </Route>
        </div>
      </div>
    </Router>
  );
}

