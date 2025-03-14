import cls from './ControlledForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { countryList } from '../../../shared/constants/countries.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store.ts';
import { Form, formActions } from '../../../shared/model/formSlice.ts';
import { formSchema } from '../../../shared/lib/validation/formSchema.ts';
import { convertImageToBase64 } from '../../../shared/lib/file/convertImageToBase64.ts';
import { yupResolver } from '@hookform/resolvers/yup';

type formData = Omit<Form, 'picture'> & {
  picture: FileList;
  confirmPassword: string;
};

export const ControlledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<formData>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmitForm = async (data: formData) => {
    const img = await convertImageToBase64(data.picture[0]);

    dispatch(
      formActions.addForm({
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        gender: data.gender,
        picture: img,
        country: data.country,
        terms: data.terms,
      })
    );

    navigate({
      pathname: '/',
    });
  };

  return (
    <>
      <h3>Controlled Form</h3>
      <form className={cls.form} onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={cls.item}>
          <label htmlFor="name">Name</label>
          <input
            className={cls.input}
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && <p className={cls.error}>{errors.name.message}</p>}
        </div>

        <div className={cls.item}>
          <label htmlFor="age">Age</label>
          <input
            className={cls.input}
            type="number"
            {...register('age')}
            id="age"
          />
          {errors.age && <p className={cls.error}>{errors.age.message}</p>}
        </div>

        <div className={cls.item}>
          <label htmlFor="email">Email</label>
          <input
            className={cls.input}
            type="email"
            id="email"
            {...register('email')}
          />
          {errors.email && <p className={cls.error}>{errors.email.message}</p>}
        </div>

        <div className={cls.passwords}>
          <div className={cls.item}>
            <label htmlFor="password">Password</label>
            <input
              className={cls.input}
              type="password"
              id="password"
              {...register('password')}
            />
            {errors.password && (
              <p className={cls.error}>{errors.password.message}</p>
            )}
          </div>

          <div className={cls.item}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              className={cls.input}
              type="password"
              id="confirmPassword"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className={cls.error}>{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className={cls.item}>
          <label htmlFor="gender">Gender</label>
          <select id="gender" {...register('gender')}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className={cls.error}>{errors.gender.message}</p>
          )}
        </div>

        <div className={cls.item}>
          <label htmlFor="picture">Upload Picture</label>
          <input
            className={cls.input}
            type="file"
            id="picture"
            {...register('picture')}
          />
          {errors.picture && (
            <p className={cls.error}>{errors.picture.message}</p>
          )}
        </div>

        <div className={cls.item}>
          <label htmlFor="country">Country</label>
          <input
            className={cls.input}
            type="text"
            id="country"
            {...register('country')}
            list="country-list"
            autoComplete="country-name"
          />
          <datalist className={cls['country-list']} id="country-list">
            {countryList.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && (
            <p className={cls.error}>{errors.country.message}</p>
          )}
        </div>

        <div className={cls.item}>
          <label htmlFor="terms">Accept Terms and Conditions agreement</label>
          <input
            className={cls.input}
            type="checkbox"
            id="terms"
            {...register('terms')}
          />
          {errors.terms && <p className={cls.error}>{errors.terms.message}</p>}
        </div>

        <button className={cls.btn} type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
      <Link className={cls.link} to="/">
        Back to main
      </Link>
    </>
  );
};
