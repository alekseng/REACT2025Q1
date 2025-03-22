import cls from './SortControl.module.scss';
import { useCountryFilter } from '../../../shared/context/useCoutryFilter.ts';
import { Population } from '../../../shared/context/countryFilterContext.ts';

export const SortControl = () => {
  const { dispatch } = useCountryFilter();

  return (
    <div>
      Sort by population
      <select
        className={cls.select}
        onChange={(e) =>
          dispatch({
            type: 'SET_POPULATION',
            payload: e.target.value as Population,
          })
        }
      >
        <option value={''}>Non sort</option>
        <option value="ascending">ascending</option>
        <option value="descending">descending</option>
      </select>
    </div>
  );
};
