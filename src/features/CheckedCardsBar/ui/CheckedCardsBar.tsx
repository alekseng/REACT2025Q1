import cls from './CheckedCardsBar.module.scss';
import { Button } from '../../../shared/ui/Button/Button.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppDispatch,
  RootState,
} from '../../../app/providers/StoreProvider/config/store.ts';
import { useEffect, useState } from 'react';
import { checkedCardsActions } from '../../../shared/model/checkedCardsSlice.ts';

export const CheckedCardsBar = () => {
  const items = useSelector(
    (state: RootState) => state.checkedCards.checkedCards
  );
  const dispatch = useDispatch<AppDispatch>();

  const [isMounted, setIsMounted] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | undefined>();

  useEffect(() => {
    if (items.length) {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [items]);

  const handleUnselect = () => {
    dispatch(checkedCardsActions.resetCards());
  };

  const handleDownload = () => {
    const csvString: string[] = [];

    const headers = Object.keys(items[0].card).join(';');
    csvString.push(headers);

    for (let i = 0; i < items.length; i += 1) {
      const str = [];
      for (const key of Object.values(items[i].card)) {
        str.push(key);
      }
      csvString.push(str.join(';'));
    }

    const blob = new Blob([csvString.join('\n')], { type: 'text/csv' });

    if (blobUrl) {
      URL.revokeObjectURL(blobUrl);
    }

    const newBlobUrl = URL.createObjectURL(blob);
    setBlobUrl(newBlobUrl);
  };

  if (!isMounted) return null;

  return (
    <div
      data-testid="checked-cards-bar"
      className={`${cls.container} ${isMounted ? cls.visible : cls.hidden}`}
    >
      <div>{`${items.length} ${items.length === 1 ? 'item is' : 'items are'} selected`}</div>
      <div className={cls['buttons-container']}>
        <Button onClick={handleUnselect}>Unselect all</Button>
        <a
          className={cls.link}
          href={blobUrl}
          onClick={handleDownload}
          download={`${items.length}_photo${items.length > 1 ? 's' : ''}.csv`}
        >
          Download
        </a>
      </div>
    </div>
  );
};
