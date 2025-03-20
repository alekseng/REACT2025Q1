import cls from './CardListItem.module.scss';

interface CardListItemProps {
  name: string;
  population: number;
  region: string;
  img: string;
}

export const CardListItem = (props: CardListItemProps) => {
  const { name, population, region, img } = props;

  return (
    <div className={cls.item}>
      <h3 className={cls.heading}>{name}</h3>
      <div className={cls.description}>
        <p>Population: {population}</p>
        <p>Region: {region}</p>
      </div>
      <div className={cls['image-container']}>
        <img className={cls.img} src={img} alt={name}></img>
      </div>
    </div>
  );
};
