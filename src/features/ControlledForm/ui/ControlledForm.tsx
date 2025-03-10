import cls from './ControlledForm.module.scss';
import { Link } from 'react-router-dom';

export const ControlledForm = () => {
  return (
    <>
      <div className={cls.ControlledForm}>ControlledForm</div>
      <Link className={cls.link} to="/">
        Back to main
      </Link>
    </>
  );
};
