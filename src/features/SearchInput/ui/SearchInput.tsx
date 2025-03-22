import cls from './SearchInput.module.scss';
import { useCountryFilter } from '../../../shared/context/useCoutryFilter.ts';

export const SearchInput = () => {
  const { state, dispatch } = useCountryFilter();

  return (
    <div className={cls.item}>
      <label htmlFor="country">Search country</label>
      <input
        className={cls.input}
        type="text"
        id="country"
        name="country"
        list="country-list"
        autoComplete="country-name"
        onChange={(e) =>
          dispatch({ type: 'SET_COUNTRY', payload: e.target.value })
        }
      />
      <datalist className={cls['country-list']} id="country-list">
        {state.data.map((country) => (
          <option key={country.name.common} value={country.name.common} />
        ))}
      </datalist>
    </div>
  );
};
