import { RegionFilter } from '../../../features/RegionFilter';
import { SortControl } from '../../../features/SortControl';
import { SearchInput } from '../../../features/SearchInput';
import cls from './FilterControls.module.scss';

export const FilterControls = () => {
  return (
    <div className={cls['filter-controls']}>
      <RegionFilter />
      <SortControl />
      <SearchInput />
    </div>
  );
};
