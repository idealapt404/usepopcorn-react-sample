import React from 'react';
import { WatchedMovieProps } from './Main';
import { WatchedMovieType } from './movies';

const WatchMoviesList: React.FC<WatchedMovieProps> = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          imdbID={movie.imdbID}
          Title={movie.Title}
          Year={movie.Year}
          Poster={movie.Poster}
          imdbRating={movie.imdbRating}
          userRating={movie.userRating}
          runtime={movie.runtime}
        />
      ))}
    </ul>
  );
}

const WatchedMovie: React.FC<WatchedMovieType> = ({Title, Poster, imdbRating, userRating, runtime}) => {
  return (
    <li>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{runtime} min</span>
        </p>
      </div>
    </li>
  )
}

export default WatchMoviesList;
