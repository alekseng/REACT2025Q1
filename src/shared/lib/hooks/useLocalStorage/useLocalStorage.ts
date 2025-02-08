import { useEffect, useState } from 'react';

export function useLocalStorage(
  key: string
): [string, (newQuery: string) => void] {
  const [query, setQuery] = useState<string>('cheetah');

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
