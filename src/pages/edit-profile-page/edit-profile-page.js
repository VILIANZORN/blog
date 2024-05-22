import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import SpinLoading from '../../components/spin-loading/spin-loading';
import { useUpdateUserMutation } from '../../store/API/userApi';
import { setUser } from '../../store/userSlice';
import useAuth from '../../hooks/useAuth';
import SignInput from '../../components/sign-input/sing-input';

import classes from './edit-profile-page.module.scss';

const USERNAME_ERROR = 'Username is already taken';
const EMAIL_ERROR = 'Email is already taken';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editAccount, { isLoading }] = useUpdateUserMutation();
  const { username: defaultUserName, email: defaultEmail, image: defaultImage } = useAuth();

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      username: defaultUserName,
      email: defaultEmail,
      image: defaultImage,
    },
  });
  const { handleSubmit, reset, setError } = methods;

  const onSubmit = async ({ username, email, password, image }) => {
    try {
      const requestData = { user: { username, email, password, image } };
      const { user } = await editAccount(requestData).unwrap();

      dispatch(setUser(user));
      reset();
      navigate('/');
    } catch (e) {
      if (e.data?.errors) {
        const { username: usernameError, email: emailError } = e.data.errors;

        if (usernameError) {
          setError('username', { type: 'busy', message: USERNAME_ERROR });
        }
        if (emailError) {
          setError('email', { type: 'busy', message: EMAIL_ERROR });
        }
      }
    }
  };

  if (isLoading) return <SpinLoading />;
  return (
    <div className={classes['edit-profile-page']}>
      <div className={classes.container}>
        <FormProvider {...methods}>
          <form className={classes['edit-profile-page__form']} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={classes.header}>Edit profile</h2>

            <SignInput label="Username" id="username" type="text" placeholder="Username" />
            <SignInput label="Email address" id="email" type="email" placeholder="Email address" />
            <SignInput label="New password" id="password" type="password" placeholder="Password" />
            <SignInput label="Avatar image (url)" id="image" type="url" placeholder="Avatar image" />

            <button className={classes['save-btn']} type="submit">Save</button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
