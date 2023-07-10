import React, { ReactNode, useState } from 'react';
import { initialWatchedData, WatchedMovieType } from './movies';
import { MainProps } from './App';
import MovieList from './MovieList';
import WatchedSummary from './WatchedSummary';
import WatchMoviesList from './WatchMoviesList';

type Props = {
  children: ReactNode;
}

export interface WatchedMovieProps {
  watched: WatchedMovieType[];
}

interface ErrorMessageProps {
  message: string;
}

const Main: React.FC<MainProps> = (
  {
    movies,
    loading,
    error,
  }
) => {
  const [watched, setWatched] = useState(initialWatchedData);

  return (
    <main className="main">
      <Box>
        {loading  && <Loader />}
        {!loading && !error && <MovieList movies={movies} />}
        {error && <ErrorMessage message={error} />}
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

const Loader: React.FC = () => {
  return (
    <p className="loader">Loading...</p>
  )
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

export default Main;
