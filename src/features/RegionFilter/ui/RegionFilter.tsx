import { Region } from '../../../shared/api/types/types.ts';
import cls from './RegionFilter.module.scss';
import { useCountryFilter } from '../../../shared/context/useCoutryFilter.ts';
import { memo, useCallback, useEffect } from 'react';

export const RegionFilter = memo(() => {
  const { state, dispatch } = useCountryFilter();

  useEffect(() => {
    const savedRegion = localStorage.getItem('selectedRegion');
    if (savedRegion && savedRegion !== state.region) {
      dispatch({ type: 'SET_REGION', payload: savedRegion });
    }
  }, [state.region, dispatch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const region = e.target.value;

      localStorage.setItem('selectedRegion', region);

      dispatch({ type: 'SET_REGION', payload: region });
    },
    [dispatch]
  );

  return (
    <div>
      Region
      <select
        className={cls.select}
        onChange={handleChange}
        value={state.region || ''}
      >
        <option value="">All</option>
        <option value={Region.Africa}>{Region.Africa}</option>
        <option value={Region.Asia}>{Region.Asia}</option>
        <option value={Region.Americas}>{Region.Americas}</option>
        <option value={Region.Europe}>{Region.Europe}</option>
        <option value={Region.Antarctic}>{Region.Antarctic}</option>
        <option value={Region.Oceania}>{Region.Oceania}</option>
      </select>
    </div>
  );
});

RegionFilter.displayName = 'RegionFilter';
