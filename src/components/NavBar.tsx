import React from 'react';
import { MovieProps, NavBarProps } from './App';

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({movies, query, setQuery}) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search query={query} setQuery={setQuery} />
      <NumResult movies={movies} />
    </nav>
  );
}

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

const Search: React.FC<SearchProps> = ({query, setQuery}) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

const NumResult: React.FC<MovieProps> = ({movies}) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

export default NavBar;
