import { useEffect, useState } from 'react';

export function useLocalStorage(
  key: string
): [string, (newQuery: string) => void] {
  const [query, setQuery] = useState<string>(() => {
    const storedQuery = localStorage.getItem(key);
    return storedQuery ? storedQuery : 'cheetah';
  });

  useEffect(() => {
    const res = localStorage.getItem(key);
    if (res) {
      setQuery(res);
    }
  }, [key]);

  const saveQuery = (newQuery: string) => {
    localStorage.setItem(key, newQuery);
    setQuery(newQuery);
  };

  return [query, saveQuery];
}
