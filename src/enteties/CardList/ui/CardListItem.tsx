import React from 'react';
import cls from './CardListItem.module.scss';
import { useNavigate } from 'react-router-dom';

interface CardListItemProps {
  profile_name: string;
  alt_description: string;
  urls: { small: string };
  id: string;
  profile_img: string;
}

export const CardListItem = (props: CardListItemProps) => {
  const { alt_description, profile_name, urls, id, profile_img } = props;
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`detail/${id}`);
  };

  return (
    <div
      data-testid="item-container"
      className={cls.item}
      onClick={handleClick}
    >
      <div className={cls['image-container']}>
        <img
          data-testid="img"
          className={cls.img}
          src={urls.small}
          alt={alt_description}
        ></img>
      </div>
      <div className={cls['title-wrapper']}>
        <div className={cls['title-container']}>
          <img
            className={cls['profile-img']}
            src={profile_img}
            alt={profile_name}
          />
          <h3 className={cls.heading}>{profile_name}</h3>
        </div>
      </div>
    </div>
  );
};
