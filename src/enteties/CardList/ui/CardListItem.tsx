import cls from './CardListItem.module.scss';

interface CardListItemProps {
  alt_description: string;
  urls: { small: string };
  id: string;
  onClick: (id: string) => void;
}

export const CardListItem = (props: CardListItemProps) => {
  const { alt_description, urls, id, onClick } = props;

  return (
    <div className={cls.item} onClick={() => onClick(id)}>
      <div className={cls['image-container']}>
        <img className={cls.img} src={urls.small} alt={alt_description}></img>
      </div>
      <h3 className={cls.heading}>{alt_description}</h3>
    </div>
  );
};
