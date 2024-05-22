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

export default function EditProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editAccount, { isLoading }] = useUpdateUserMutation();
  const { username: defaultUserName, email: defaultEmail, image: defaultImage } = useAuth();

  const updateUserDispatch = (data) => dispatch(setUser(data));

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      username: defaultUserName,
      email: defaultEmail,
      image: defaultImage,
    },
  });
  const { handleSubmit, reset, setError } = methods;

  const onSubmit = ({ username, email, password, image }) => {
    const requestData = {
      user: {
        username,
        email,
        password,
        image,
      },
    };

    editAccount(requestData)
      .unwrap()
      .then((editedData) => {
        updateUserDispatch(editedData.user);

        reset();
        navigate('/');
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
    <div className={classes['edit-profile-page']}>
      <div className={classes.container}>
        <FormProvider {...methods}>
          <form className={classes['edit-profile-page__form']} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={classes.header}>Edit profile</h2>

            <SignInput label="Username" id="username" type="text" placeholder="Username" />

            <SignInput label="Email address" id="email" type="email" placeholder="Email address" />

            <SignInput label="New password" id="password" type="password" placeholder="Password" />

            <SignInput label="Avatar image (url)" id="image" type="url" placeholder="Avatar image" />

            <button className={classes['save-btn']} type="submit">
              Save
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
