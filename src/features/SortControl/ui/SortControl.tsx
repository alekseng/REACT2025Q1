import cls from './SortControl.module.scss';
import { useCountryFilter } from '../../../shared/context/useCoutryFilter.ts';
import { Population } from '../../../shared/context/countryFilterContext.ts';
import { memo, useCallback, useEffect } from 'react';

export const SortControl = memo(() => {
  const { state, dispatch } = useCountryFilter();

  useEffect(() => {
    const savedSort = localStorage.getItem('selectedSort');
    if (savedSort && savedSort !== state.population) {
      dispatch({
        type: 'SET_POPULATION',
        payload: savedSort as Population,
      });
    }
  }, [state.population, dispatch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const region = e.target.value;

      localStorage.setItem('selectedSort', region);

      dispatch({
        type: 'SET_POPULATION',
        payload: e.target.value as Population,
      });
    },
    [dispatch]
  );

  return (
    <div>
      Sort by population
      <select
        className={cls.select}
        onChange={handleChange}
        value={state.population || ''}
      >
        <option value={''}>Non sort</option>
        <option value="ascending">ascending</option>
        <option value="descending">descending</option>
      </select>
    </div>
  );
});

SortControl.displayName = 'SortControl';
