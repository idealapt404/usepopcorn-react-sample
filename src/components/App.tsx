import React, { useState } from 'react';
import NavBar from './NavBar';
import Main from './Main';
import { MovieType } from './movies';
import { useMovies } from '../hooks/use-movies';

export interface MovieProps {
  movies: MovieType[];
}

export const KEY = "6a3cec2e";

function App() {
  const [query, setQuery] = useState("interstellar");
  const { movies, isLoading, error } = useMovies(query);

/*
  // watch how useEffect's dependency works
  useEffect(() => {
    console.log("Empty dependency -- after initial render only");
  }, []) // sync without any state

  useEffect(() => {
    console.log("No dependency -- after every render");
  }) // sync with every state

  useEffect(() => {
    console.log("With dependency -- only when the query state is updated");
  }, [query]) // sync with query state

  console.log("During rendering");
*/

  return (
    <>
      <NavBar
        movies={movies}
        query={query}
        setQuery={setQuery}
      />
      <Main
        movies={movies}
        loading={isLoading}
        error={error}
      />
{/*      <StarRating maxRating={6} onSetRating={setUserRating} />
      <StarRating onSetRating={setUserRating} />*/}
    </>
  );
}

export default App;
