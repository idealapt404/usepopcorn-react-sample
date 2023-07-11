import React from 'react';
import { WatchedMovieType } from './movies';
import { WatchedMovieProps } from './Main';

interface WatchedMovieListProps extends WatchedMovieProps {
  setWatched: (watched: WatchedMovieType[]) => void;
}

interface WatchedMovieItemProps extends WatchedMovieListProps {
  movie: WatchedMovieType;
}

const WatchedMovieList: React.FC<WatchedMovieListProps> = ({ watched, setWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          watched={watched}
          setWatched={setWatched}
        />
      ))}
    </ul>
  );
}

const WatchedMovie: React.FC<WatchedMovieItemProps> = ({movie, watched, setWatched}) => {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => setWatched(watched.filter((w) => w.imdbID !== movie.imdbID))} >
          X
        </button>
      </div>
    </li>
  )
}

export default WatchedMovieList;
