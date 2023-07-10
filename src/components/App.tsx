import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import Main from './Main';
import { initialMovieData, MovieType } from './movies';
//import StarRating from './StarRating';

export interface MovieProps {
  movies: MovieType[];
}

export interface MainProps extends MovieProps {
  loading: boolean;
  error: string;
}

const KEY = "6a3cec2e";

function App() {
  const [movies, setMovies] = useState(initialMovieData);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let query = "interstellar";
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
    fetchMovies();
  }, [])

  return (
    <>
      <NavBar movies={movies} />
      <Main movies={movies} loading={isLoading} error={error} />
{/*      <StarRating maxRating={6} onSetRating={setUserRating} />
      <StarRating onSetRating={setUserRating} />*/}
    </>
  );
}

export default App;
