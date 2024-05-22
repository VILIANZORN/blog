import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import SpinLoading from '../spin-loading/spin-loading';
import { useSignUpMutation } from '../../store/API/userApi';
import { setUser } from '../../store/userSlice';
import SignInput from '../sign-input/sing-input';

import classes from './sign-up.module.scss';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setUserDispatch = (data) => dispatch(setUser(data));
  const [createAccount, { isLoading }] = useSignUpMutation();

  const methods = useForm({ mode: 'onSubmit' });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = methods;

  const onSubmit = ({ username, email, password }) => {
    const requestData = {
      user: {
        username,
        email,
        password,
      },
    };

    createAccount(requestData)
      .unwrap()
      .then((userData) => {
        setUserDispatch(userData.user);
        localStorage.setItem('token', userData.user.token);

        reset();
        navigate('/');
        window.location.reload();
      })
      .catch((e) => {
        if (e.data.errors.username) {
          setError('username', {
            type: 'busy',
            message: 'Username is already taken',
          });
        }

        if (e.data.errors.email) {
          setError('email', {
            type: 'busy',
            message: 'Email is already taken',
          });
        }
      });
  };

  if (isLoading) return <SpinLoading />;

  return (
    <div className={classes['sign-up']}>
      <div className={classes['sign-up__container']}>
        <FormProvider {...methods}>
          <form className={classes['sign-up__form']} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={classes['sign-up__header']}>Create new account</h2>
            <div>
              <SignInput label="Username" id="username" type="text" placeholder="Username" />
            </div>
            <div>
              <SignInput label="Email address" id="email" type="email" placeholder="Email address" />
            </div>
            <div>
              <SignInput label="Password" id="password" type="password" placeholder="Password" />
            </div>
            <div>
              <SignInput label="Repeat password" id="cpassword" type="password" placeholder="Password" />
            </div>
            <label className={classes['checkbox-container']}>
              <input
                type="checkbox"
                className={classes['real-checkbox']}
                style={errors?.agreement ? { color: '#F5222D' } : null}
                id="agree"
                {...register('agreement', { required: true })}
              />
              <span
                className={classes['custom-checkbox']}
                style={errors?.agreement ? { border: '1px solid rgb(255, 133, 133)' } : null}
              />
              <span className={classes['checkbox--text']}>I agree to the processing of my personal information</span>
              {errors?.agreement ? <div className={classes.necessarily}>*</div> : null}
            </label>
            <div>
              <button className={classes['sign-up__btn']} type="submit">
                Create
              </button>
              <div className={classes['sign-up__footer']}>
                <span className={classes['sign-up__footer--text']}>Already have an account?</span>
                <Link to="/sign-in">
                  <button className={classes['sign-up__footer--btn']} type="button">
                    Sign in
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
