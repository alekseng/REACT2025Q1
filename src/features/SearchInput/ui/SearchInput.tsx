import cls from './SearchInput.module.scss';
import { useCountryFilter } from '../../../shared/context/useCoutryFilter.ts';
import { memo, useCallback, useEffect } from 'react';

export const SearchInput = memo(() => {
  const { state, dispatch } = useCountryFilter();

  useEffect(() => {
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry && savedCountry !== state.country) {
      dispatch({
        type: 'SET_COUNTRY',
        payload: savedCountry,
      });
    }
  }, [state.country, dispatch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const region = e.target.value;

      localStorage.setItem('selectedCountry', region);

      dispatch({
        type: 'SET_COUNTRY',
        payload: e.target.value,
      });
    },
    [dispatch]
  );

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
        defaultValue={state.country || ''}
        onChange={handleChange}
      />
      <datalist className={cls['country-list']} id="country-list">
        {state.data.map((country) => (
          <option key={country.name.common} value={country.name.common} />
        ))}
      </datalist>
    </div>
  );
});

SearchInput.displayName = 'SearchInput';
