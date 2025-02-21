import React from 'react';
import cls from './CardListItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '../../../shared/ui/Checkbox/Checkbox.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
} from '../../../app/providers/StoreProvider/config/store.ts';
import { checkedCardsActions } from '../../../shared/model/checkedCardsSlice.ts';

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
  const isChecked = useSelector((state: RootState) =>
    state.checkedCards.checkedCards.some((e) => e.id === id)
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`detail/${id}`);
  };

  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleCheckboxChange = () => {
    dispatch(
      checkedCardsActions.addCard({
        id: id,
        card: {
          profile_name: profile_name,
          alt_description: alt_description,
          urls: { small: urls.small },
          id: id,
          profile_img: profile_img,
        },
      })
    );
  };

  return (
    <div
      data-testid="item-container"
      className={cls.item}
      onClick={handleClick}
    >
      <div className={cls['image-container']}>
        <Checkbox
          data-testid="checkbox"
          checked={isChecked}
          onClick={handleCheckboxClick}
          onChange={handleCheckboxChange}
        />
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
