import React, { useEffect, useRef, useState } from 'react';
import { KEY } from './App';
import Loader from './Loader';
import { MovieActionProps } from './Main';
import { WatchedMovieType } from './movies';
import StarRating from './StarRating';

interface DetailsType {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}

interface MovieDetailsProps extends MovieActionProps {
  watched: WatchedMovieType[];
  setWatched: (watched: WatchedMovieType[]) => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = (
  {
    selectedId,
    setSelectedId,
    watched,
    setWatched,
  }
) => {
  const [movie, setMovie] = useState<DetailsType | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) {
      countRef.current++;
    }
  }, [userRating]);

  const isWatched = selectedId
    ? watched.map((movie) => movie.imdbID).includes(selectedId)
    : false;
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const handleAdd = (movie: DetailsType | null) => {
    if (!selectedId || !movie) return;
    const newWatchedMovie: WatchedMovieType = {
      imdbID: selectedId,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      runtime: Number(movie.Runtime.split(" ").at(0)),
      imdbRating: Number(movie.imdbRating),
      userRating: userRating ? userRating : 0,
      countRatingDecisions: countRef.current,
    };
    setWatched([...watched, newWatchedMovie])
    setSelectedId(null);
  }

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsDetailsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsDetailsLoading(false);
    }
    getMovieDetails()
  }, [selectedId]);

  useEffect(() => {
    if (!movie) return;
    document.title = `Movie: ${movie.Title}`;

    return () => {
      document.title = "usePopcorn";
    }
  }, [movie]);

  return (
    <div className="details">
      {isDetailsLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedId(null)}>
              &larr;
            </button>
            <img src={movie?.Poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{movie?.Title}</h2>
              <p>
                {movie?.Released} &bull; {movie?.Runtime}
              </p>
              <p>{movie?.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie?.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={20}
                    onSetRating={setUserRating}
                  />
                  {userRating && userRating > 0 && (
                    <button className="btn-add" onClick={() => handleAdd(movie)}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{movie?.Plot}</em>
            </p>
            <p>Starring {movie?.Actors}</p>
            <p>Directed by {movie?.Director}</p>
          </section>
        </>
      )}
    </div>
  )
}

export default MovieDetails;
