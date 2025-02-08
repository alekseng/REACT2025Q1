import { Input } from '../../../shared/ui/Input/Input';
import { Button } from '../../../shared/ui/Button/Button';
import cls from './HeaderForm.module.scss';

export const HeaderForm = () => {
  return (
    <form className={cls.form} action="">
      <Input />
      <Button>Search</Button>
    </form>
  );
};
