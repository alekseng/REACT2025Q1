import cls from './CheckedCardsBar.module.scss';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
} from '../../../app/providers/StoreProvider/config/store.ts';
import { useEffect, useRef, useState } from 'react';
import { checkedCardsActions } from '../../../shared/model/checkedCardsSlice.ts';

export const CheckedCardsBar = () => {
  const items = useSelector(
    (state: RootState) => state.checkedCards.checkedCards.length
  );
  const dispatch = useDispatch<AppDispatch>();

  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationTimeout = useRef<number | null>(null);
  const unmountTimeout = useRef<number | null>(null);

  useEffect(() => {
    if (items) {
      setIsMounted(true);
      animationTimeout.current = setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      unmountTimeout.current = setTimeout(() => setIsMounted(false), 300);
    }

    return () => {
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
      if (unmountTimeout.current) clearTimeout(unmountTimeout.current);
    };
  }, [items]);

  const handleUnselect = () => {
    dispatch(checkedCardsActions.resetCards());
  };

  if (!isMounted) return null;

  return (
    <div
      data-testid="checked-cards-bar"
      className={`${cls.container} ${isAnimating ? cls.visible : cls.hidden}`}
    >
      <div>{`${items} ${items === 1 ? 'item is' : 'items are'} selected`}</div>
      <div className={cls['buttons-container']}>
        <Button onClick={handleUnselect}>Unselect all</Button>
        <Button>Download</Button>
      </div>
    </div>
  );
};
