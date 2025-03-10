import cls from './MainPage.module.scss';
import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <div className={cls.container}>
      <Link className={cls.link} to="uncontrolled-form">
        Uncontrolled form
      </Link>
      <Link className={cls.link} to="controlled-form">
        Controlled form
      </Link>
    </div>
  );
};
