import React from 'react';
import { MovieProps } from './App';
import { MovieType } from './movies';
import { MovieActionProps } from './Main';

interface MovieListProps extends MovieProps, MovieActionProps {
}

interface MovieItemProps extends MovieType, MovieActionProps {
}

const MovieList: React.FC<MovieListProps> = ({movies, selectedId, setSelectedId}) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          imdbID={movie.imdbID}
          Title={movie.Title}
          Year={movie.Year}
          Poster={movie.Poster}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ))}
    </ul>
  )
}

const Movie: React.FC<MovieItemProps> = (
  {
    imdbID,
    Title,
    Year,
    Poster,
    selectedId,
    setSelectedId
  }
) => {
  return (
    <li onClick={() => setSelectedId(imdbID === selectedId ? null : imdbID)}>
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
