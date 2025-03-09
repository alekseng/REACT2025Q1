import cls from './NotFoundPage/ui/NotFoundPage.module.scss';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div data-testid="not-found-page" className={cls['not-found-page']}>
      <h3>404</h3>
      <p>page not found</p>
      <Link className={cls.link} href="/">
        Back to main
      </Link>
    </div>
  );
};

export default NotFoundPage;
