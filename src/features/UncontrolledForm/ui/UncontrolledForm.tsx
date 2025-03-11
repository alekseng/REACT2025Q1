import cls from './UncontrolledForm.module.scss';
import { Link } from 'react-router-dom';
import React, { useRef } from 'react';
import { countryList } from '../../../shared/constants/countries.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/providers/StoreProvider/config/store.ts';
import { formActions } from '../../../shared/model/formSlice.ts';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
  };
  return (
    <>
      <h3>Uncontrolled Component</h3>
      <form className={cls.form} onSubmit={handleSubmit}>
        <div className={cls.item}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" ref={nameRef} />
        </div>

        <div className={cls.item}>
          <label htmlFor="age">Age</label>
          <input type="number" name="name" id="age" ref={ageRef} min={0} />
        </div>

        <div className={cls.item}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="name" ref={emailRef} />
        </div>

        <div className={cls.item}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="name" ref={passwordRef} />
        </div>

        <div className={cls.item}>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            type="password"
            id="confirm-password"
            name="name"
            ref={confirmPasswordRef}
          />
        </div>

        <div className={cls.item}>
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" ref={genderRef}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className={cls.item}>
          <label htmlFor="picture">Upload Picture</label>
          <input type="file" id="picture" name="picture" ref={pictureRef} />
        </div>

        <div className={cls.item}>
          <label htmlFor="country">Country</label>
          <input
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
        </div>

        <div className={cls.item}>
          <label htmlFor="terms">Accept Terms and Conditions agreement</label>
          <input type="checkbox" id="terms" name="terms" ref={termsRef} />
        </div>

        <button type="submit">Submit</button>
      </form>
      <Link className={cls.link} to="/">
        Back to main
      </Link>
    </>
  );
};
