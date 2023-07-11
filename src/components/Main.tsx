import React, { ReactNode, useState } from 'react';
import { initialWatchedData, WatchedMovieType } from './movies';
import { MovieProps } from './App';
import Loader from './Loader';
import MovieList from './MovieList';
import WatchedSummary from './WatchedSummary';
import WatchedMovieList from './WatchedMovieList';
import MovieDetails from './MovieDetails';

type Props = {
  children: ReactNode;
}

export interface MainProps extends MovieProps {
  loading: boolean;
  error: string;
}

export interface MovieActionProps {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
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
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <main className="main">
      <Box>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        {loading  && <Loader />}
        {!loading && !error &&
          <MovieList movies={movies} selectedId={selectedId} setSelectedId={setSelectedId} />}
        {error && <ErrorMessage message={error} />}
      </Box>
      <Box>
        {selectedId ? (
          <MovieDetails
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            watched={watched}
            setWatched={setWatched}
          />
        ) : (
          <>
            <WatchedSummary watched={watched} />
            <WatchedMovieList watched={watched} setWatched={setWatched} />
          </>
        )}
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

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

export default Main;
