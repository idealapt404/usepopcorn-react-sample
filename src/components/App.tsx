import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Main from './Main';
import { initialMovieData, MovieType } from './movies';
//import StarRating from './StarRating';

export interface MovieProps {
  movies: MovieType[];
}

export const KEY = "6a3cec2e";

function App() {
  const [movies, setMovies] = useState(initialMovieData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("interstellar");

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

  useEffect(() => {
    //let query = "interstellar";
    //let query = "ajsdkals";

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }
        setMovies(data.Search);
        setError("");
      } catch (err: any) {
        if (err instanceof Error) {
          setError(err.message);
          console.log(err.message);
        } else if (typeof err === "string") {
          setError(err);
          console.log(err);
        } else {
          console.log(err);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 2) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();
  }, [query])

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
