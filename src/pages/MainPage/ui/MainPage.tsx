import cls from './MainPage.module.scss';
import { Link } from 'react-router-dom';
import { Cards } from '../../../features/Cards';

export const MainPage = () => {
  return (
    <div className={cls.container}>
      <div className={cls.links}>
        <Link className={cls.link} to="uncontrolled-form">
          Uncontrolled form
        </Link>
        <Link className={cls.link} to="controlled-form">
          Controlled form
        </Link>
      </div>
      <Cards />
    </div>
  );
};
