import cls from './CheckedCardsBar.module.scss';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/providers/StoreProvider/config/store.ts';
import { useEffect, useRef, useState } from 'react';

export const CheckedCardsBar = () => {
  const items = useSelector(
    (state: RootState) => state.checkedCards.checkedCards.length
  );

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

  if (!isMounted) return null;

  return (
    <div
      data-testid="checked-cards-bar"
      className={`${cls.container} ${isAnimating ? cls.visible : cls.hidden}`}
    >
      <div>{`${items} ${items === 1 ? 'item is' : 'items are'} selected`}</div>
      <div className={cls['buttons-container']}>
        <Button>Unselect all</Button>
        <Button>Download</Button>
      </div>
    </div>
  );
};
