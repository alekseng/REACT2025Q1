import cls from './CardList.module.scss';
import { PurpleArray } from '../../../shared/api/types/types.ts';
import { CardListItem } from './CardListItem.tsx';

import { useEffect, useState } from 'react';
import { fetchData } from '../../../shared/api/fetchData/fetchData.ts';
import { useCountryFilter } from '../../../shared/context/useCoutryFilter.ts';

export const CardList = () => {
  const [data, setData] = useState<PurpleArray[]>([]);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useCountryFilter();

  useEffect(() => {
    fetchData().then((data) => {
      setData(data);
      dispatch({ type: 'SET_DATA', payload: data });
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return <p className={cls.text}>Loading...</p>;
  }

  if (data.length === 0) {
    return <p className={cls.text}>We did not find anything.</p>;
  }

  const replaceSymbols = (string: string) =>
    string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

  const sortCountries = (a: PurpleArray, b: PurpleArray) => {
    if (!state.population) return 0;
    return state.population === 'ascending'
      ? a.population - b.population
      : b.population - a.population;
  };

  const countryArray = state.data
    .filter((country) => !state.region || country.region === state.region)
    .filter((country) => {
      const regex = new RegExp(replaceSymbols(state.country), 'i');
      return regex.test(country.name.common);
    })
    .sort(sortCountries);

  if (countryArray.length === 0) {
    return (
      <>
        <p className={cls.text}>We did not find anything.</p>
      </>
    );
  }

  return (
    <div className={cls.cards}>
      {countryArray.map((card) => (
        <CardListItem
          name={card.name.common}
          population={card.population}
          region={card.region}
          img={card.flags.png}
          key={card.name.common}
        />
      ))}
    </div>
  );
};
