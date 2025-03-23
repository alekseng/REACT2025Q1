import { useNavigate, useParams } from 'react-router-dom';
import { useCountryFilter } from '../../../shared/context/useCoutryFilter.ts';
import cls from './DetailedCard.module.scss';
import { memo } from 'react';

export const DetailedCard = memo(() => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { state } = useCountryFilter();
  const splitCountryName = id?.replace(/([a-z])([A-Z])/g, '$1 $2');
  const currentCountry = state.data.filter(
    (country) => country.name.common === splitCountryName
  );

  const handleClose = () => {
    navigate(`/`);
  };

  if (currentCountry.length === 0) {
    return (
      <>
        <button
          onClick={() => {
            handleClose();
          }}
        >
          Back
        </button>
        <p className={cls['no-data']}>We did not find anything.</p>
      </>
    );
  }

  return (
    <div className={cls['detailed-card']}>
      <div className={cls.btn}>
        <button
          onClick={() => {
            handleClose();
          }}
        >
          Back
        </button>
      </div>
      {currentCountry.map((country, ind) => (
        <div className={cls.info} key={ind}>
          <div className={cls.description}>
            <h3 className={cls.heading}>{country.name.common}</h3>
            <p className={cls.text}>Population: {country.population}</p>
            <p className={cls.text}>Region: {country.region}</p>
            <p className={cls.text}>Capital: {country.capital}</p>
            <p className={cls.text}>
              Currencies:{' '}
              {country.currencies
                ? Object.values(country.currencies)[0].name
                : 'no data'}
            </p>
            <p className={cls.text}>
              Languages:{' '}
              <span className={cls.text}>
                {country.languages
                  ? Object.values(country.languages) + ','
                  : 'no data'}
              </span>
            </p>
          </div>
          <div className={cls['image-container']}>
            <img
              className={cls.img}
              src={country.flags.png}
              alt={country.name.common}
            ></img>
          </div>
          <iframe
            className={cls['map']}
            frameBorder="0"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${country.latlng[1] - 3}%2C${country.latlng[0] - 3}%2C${country.latlng[1] + 3}%2C${country.latlng[0] + 3}&amp;layer=mapnik`}
          ></iframe>
        </div>
      ))}
    </div>
  );
});

DetailedCard.displayName = 'DetailedCard';
