import { useEffect, useState } from 'react';
import { initialWatchedData, WatchedMovieType } from '../components/movies';

interface UseLocalStorageStateType {
  watched: WatchedMovieType[];
  setWatched: (watched: WatchedMovieType[]) => void;
}

export const useLocalStorageState = (key: string): UseLocalStorageStateType => {
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialWatchedData;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(watched));
  }, [watched, key]);

  return { watched, setWatched };
}
