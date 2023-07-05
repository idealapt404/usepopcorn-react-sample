import React, { ReactNode, useState } from 'react';
import { initialWatchedData, WatchedMovieType } from './movies';
import { MovieProps } from './App';
import MovieList from './MovieList';
import WatchedSummary from './WatchedSummary';
import WatchMoviesList from './WatchMoviesList';

type Props = {
  children: ReactNode;
}

export interface WatchedMovieProps {
  watched: WatchedMovieType[];
}

const Main: React.FC<MovieProps> = ({movies}) => {
  const [watched, setWatched] = useState(initialWatchedData);

  return (
    <main className="main">
      <Box>
        <MovieList movies={movies} />
      </Box>
      <Box>
        <WatchedSummary watched={watched} />
        <WatchMoviesList watched={watched} />
      </Box>
    </main>
  )
}

const Box: React.FC<Props> = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  )
}

export default Main;
