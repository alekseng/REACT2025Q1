import cls from './Loader.module.scss';

export const Loader = () => {
  return (
    <div data-testid="loader" className={cls.container}>
      <div className={cls.loader}></div>
    </div>
  );
};
