import cls from './CardListItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface CardListItemProps {
  name: string;
  population: number;
  region: string;
  img: string;
}

export const CardListItem = (props: CardListItemProps) => {
  const { name, population, region, img } = props;
  const navigate = useNavigate();
  const id = name.replace(/\s/g, '');
  const [visitedCountries, setVisitedCountries] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('visitedCountries') || '[]');
  });
  const visited = visitedCountries.includes(name);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!visited) {
      const updatedVisited = [...visitedCountries, name];
      setVisitedCountries(updatedVisited);
      localStorage.setItem('visitedCountries', JSON.stringify(updatedVisited));
    }

    navigate(`detail/${id}`);
  };

  return (
    <div className={cls.item} onClick={handleClick}>
      <h3 className={`${cls.heading} ${visited ? cls.visited : ''}`}>{name}</h3>
      <div className={`${cls.description} ${visited ? cls.visited : ''}`}>
        <p>Population: {population}</p>
        <p>Region: {region}</p>
      </div>
      <div
        className={`${cls['image-container']} ${visited ? cls.visited : ''}`}
      >
        <img className={cls.img} src={img} alt={name}></img>
      </div>
      {visited && <div className={cls['visited-mark']}>Viewed</div>}
    </div>
  );
};
