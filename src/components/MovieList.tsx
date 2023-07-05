import React from 'react';
import { MovieProps } from './App';
import { MovieType } from './movies';

const MovieList: React.FC<MovieProps> = ({movies}) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          imdbID={movie.imdbID}
          Title={movie.Title}
          Year={movie.Year}
          Poster={movie.Poster}
        />
      ))}
    </ul>
  )
}

const Movie: React.FC<MovieType> = ({Title, Year, Poster}) => {
  return (
    <li>
      <img src={Poster} alt={`${Title} poster`} />
      <h3>{Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{Year}</span>
        </p>
      </div>
    </li>
  )
}

export default MovieList;
