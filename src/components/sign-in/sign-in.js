import { useDispatch } from 'react-redux';
import React from 'react';
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
  const methods = useForm({ mode: 'onSubmit' });
  const { handleSubmit, setError, formState: { errors } } = methods;
  const [loginAccount, { isLoading }] = useSignInMutation();

  const onSubmit = async ({ email, password }) => {
    try {
      const { user } = await loginAccount({ user: { email, password } }).unwrap();
      dispatch(setUser(user));
      localStorage.setItem('token', user.token);
      navigate('/');
    } catch {
      setError('email', { type: 'manual', message: 'Email or password is invalid' });
      setError('password', { type: 'manual', message: 'Email or password is invalid' });
    }
  };

  if (isLoading) return <SpinLoading />;

  return (
    <div className={classes['sign-in']}>
      <div className={classes['sign-in__container']}>
        <FormProvider {...methods}>
          <form className={classes['sign-in__form']} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={classes['sign-in__header']}>Sign-in</h2>
            <SignInput
              label="Email address"
              id="email"
              type="email"
              placeholder="Email address"
              className={errors.email ? classes['error-input'] : ''}
            />
            <SignInput
              label="Password"
              id="password"
              type="password"
              placeholder="Password"
              className={errors.password ? classes['error-input'] : ''}
            />
            {errors.email && <p className={classes['sign-in__error']}>{errors.email.message}</p>}
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
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
