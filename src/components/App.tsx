import React, { useState } from 'react';
import NavBar from './NavBar';
import Main from './Main';
import { initialMovieData, MovieType } from './movies';

export interface MovieProps {
  movies: MovieType[];
}

function App() {
  const [movies, setMovies] = useState(initialMovieData);

  return (
    <>
      <NavBar movies={movies}/>
      <Main movies={movies}/>
    </>
  );
}

export default App;
