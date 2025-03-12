import cls from './UncontrolledForm.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { countryList } from '../../../shared/constants/countries.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store.ts';
import { formActions } from '../../../shared/model/formSlice.ts';
import { formSchema } from '../../../shared/lib/validation/formSchema.ts';
import * as yup from 'yup';

export const UncontrolledForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formValues = {
      name: nameRef.current?.value,
      age: ageRef.current?.valueAsNumber,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      picture: pictureRef.current?.files,
      country: countryRef.current?.value,
      terms: termsRef.current?.checked,
    };

    try {
      await formSchema.validate(formValues, { abortEarly: false });
      dispatch(
        formActions.addForm({
          name: nameRef.current?.value,
          age: ageRef.current?.valueAsNumber,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          gender: genderRef.current?.value,
          picture: pictureRef.current?.files,
          country: countryRef.current?.value,
          terms: termsRef.current?.checked,
        })
      );

      navigate({
        pathname: '/',
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };
  return (
    <>
      <h3>Uncontrolled Component</h3>
      <form className={cls.form} onSubmit={handleSubmit}>
        <div className={cls.item}>
          <label htmlFor="name">Name</label>
          <input
            className={cls.input}
            type="text"
            id="name"
            name="name"
            ref={nameRef}
          />
          {errors.name && <p className={cls.error}>{errors.name}</p>}
        </div>

        <div className={cls.item}>
          <label htmlFor="age">Age</label>
          <input
            className={cls.input}
            type="number"
            name="age"
            id="age"
            ref={ageRef}
          />
          {errors.age && <p className={cls.error}>{errors.age}</p>}
        </div>

        <div className={cls.item}>
          <label htmlFor="email">Email</label>
          <input
            className={cls.input}
            type="email"
            id="email"
            name="email"
            ref={emailRef}
          />
          {errors.email && <p className={cls.error}>{errors.email}</p>}
        </div>

        <div className={cls.passwords}>
          <div className={cls.item}>
            <label htmlFor="password">Password</label>
            <input
              className={cls.input}
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
            />
            {errors.password && <p className={cls.error}>{errors.password}</p>}
          </div>

          <div className={cls.item}>
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              className={cls.input}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              ref={confirmPasswordRef}
            />
            {errors.confirmPassword && (
              <p className={cls.error}>{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className={cls.item}>
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" ref={genderRef}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className={cls.error}>{errors.gender}</p>}
        </div>

        <div className={cls.item}>
          <label htmlFor="picture">Upload Picture</label>
          <input
            className={cls.input}
            type="file"
            id="picture"
            name="picture"
            ref={pictureRef}
          />
          {errors.picture && <p className={cls.error}>{errors.picture}</p>}
        </div>

        <div className={cls.item}>
          <label htmlFor="country">Country</label>
          <input
            className={cls.input}
            type="text"
            ref={countryRef}
            id="country"
            name="country"
            list="country-list"
            autoComplete="country-name"
          />
          <datalist className={cls['country-list']} id="country-list">
            {countryList.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          {errors.country && <p className={cls.error}>{errors.country}</p>}
        </div>

        <div className={cls.item}>
          <label htmlFor="terms">Accept Terms and Conditions agreement</label>
          <input
            className={cls.input}
            type="checkbox"
            id="terms"
            name="terms"
            ref={termsRef}
          />
          {errors.terms && <p className={cls.error}>{errors.terms}</p>}
        </div>

        <button className={cls.btn} type="submit">
          Submit
        </button>
      </form>
      <Link className={cls.link} to="/">
        Back to main
      </Link>
    </>
  );
};
