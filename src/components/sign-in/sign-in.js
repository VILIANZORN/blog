import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import SpinLoading from '../spin-loading/spin-loading';
import { useSignInMutation } from '../../store/API/userApi';
import { setUser } from '../../store/userSlice';
import SignInput from '../sign-input/sing-input';

import classes from './sign-in.module.scss';


export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');

  const setUserDispatch = (data) => dispatch(setUser(data));
  const [loginAccount, { isLoading }] = useSignInMutation();

  const methods = useForm({ mode: 'onSubmit' });
  const { handleSubmit, reset } = methods;

  const onSubmit = ({ email, password }) => {
    const requestData = {
      user: {
        email,
        password,
      },
    };

    loginAccount(requestData)
      .unwrap()
      .then((userData) => {
        navigate('/');
        setUserDispatch(userData.user);
        localStorage.setItem('token', userData.user.token);
        reset();
        window.location.reload();
      })
      .catch(() => {
        reset();
        setFormError('Email or password is invalid');
      });
  };

  if (isLoading) return <SpinLoading />;

  return (
    <div className={classes['sign-in']}>
      <div className={classes['sign-in__container']}>
        <FormProvider {...methods}>
          <form className={classes['sign-in__form']} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={classes['sign-in__header']}>Sign-in</h2>
            <div>
              <SignInput
                className={formError  ? classes['error-input'] : ''}
                label="Email address"
                id="email"
                type="email"
                placeholder="Email address"
              />
            </div>
            <div>
              <SignInput
                className={formError ? classes['error-input'] : ''}
                label="Password"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            {formError && <p className={classes['sign-in__error']}>{formError}</p>}
            <div>
              <button className={classes['sign-in__btn']} type="submit">
                Login
              </button>
              <div className={classes['sign-in__footer']}>
                <span className={classes['sign-in__footer--text']}>Don’t have an account?</span>
                <Link to="/sign-up">
                  <button className={classes['sign-in__footer--btn']} type="button">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
