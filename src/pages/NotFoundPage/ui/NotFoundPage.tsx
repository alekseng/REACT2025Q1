import { Link } from 'react-router-dom';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={cls['not-found-page']}>
      <h3>404</h3>
      <p>page not found</p>
      <Link className={cls.link} to="/">
        Back to main
      </Link>
    </div>
  );
};
