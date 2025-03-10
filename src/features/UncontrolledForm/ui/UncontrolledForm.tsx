import cls from './UncontrolledForm.module.scss';
import { Link } from 'react-router-dom';

export const UncontrolledForm = () => {
  return (
    <>
      <div className={cls.UncontrolledForm}>UncontrolledForm</div>
      <Link className={cls.link} to="/">
        Back to main
      </Link>
    </>
  );
};
