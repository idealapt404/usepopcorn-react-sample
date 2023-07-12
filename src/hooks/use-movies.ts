import { useEffect, useState } from 'react';
import { KEY } from '../components/App';
import { initialMovieData, MovieType } from '../components/movies';

export interface UseMoviesType {
  movies: MovieType[];
  isLoading: boolean;
  error: string;
}

export const useMovies = (query: string): UseMoviesType => {
  const [movies, setMovies] = useState(initialMovieData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    //let query = "interstellar";
    //let query = "ajsdkals";
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
          );

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

    return () => {
      controller.abort();
    }
  }, [query]);

  return { movies, isLoading, error };
}
