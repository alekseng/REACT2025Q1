import { Region } from '../../../shared/api/types/types.ts';
import cls from './RegionFilter.module.scss';
import { useCountryFilter } from '../../../shared/context/useCoutryFilter.ts';

export const RegionFilter = () => {
  const { dispatch } = useCountryFilter();

  return (
    <div>
      Region
      <select
        className={cls.select}
        onChange={(e) =>
          dispatch({ type: 'SET_REGION', payload: e.target.value })
        }
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
};
