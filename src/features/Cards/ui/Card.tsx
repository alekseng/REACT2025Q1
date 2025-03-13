import cls from './Card.module.scss';

interface CardProps {
  el: {
    name: string | undefined;
    age: number | undefined;
    email: string | undefined;
    password: string | undefined;
    gender: string | undefined;
    picture: string;
    country: string | undefined;
    terms: boolean | undefined;
  };
}

export const Card = (props: CardProps) => {
  const { el } = props;

  return (
    <div className={cls.card}>
      <div>
        <p>Name: {el.name || 'N/A'}</p>
        <p>Email: {el.email || 'N/A'}</p>
        <p>Age: {el.age || 'N/A'}</p>
        <p>Gender: {el.gender || 'N/A'}</p>
        <p>Country: {el.country || 'N/A'}</p>
        <p>Password: {el.password || 'N/A'}</p>
      </div>
      <img src={el.picture} alt="img" />
    </div>
  );
};
