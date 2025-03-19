import cls from './NotFoundPage.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <>
      <h3 className={cls.heading}>404</h3>
      <p className={cls.text}>page not found</p>
      <Link className={cls.link} to="/">
        Back to main
      </Link>
    </>
  );
};
