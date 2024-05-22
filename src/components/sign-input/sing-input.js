import React from 'react';
import { useFormContext } from 'react-hook-form';

import classes from './sign-input.module.scss';

export default function SignInput({ label, id, type, placeholder, className, autoComplete, maxLength }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const options = {
    username: {
      required: 'This field must be filled in',
      minLength: {
        value: 3,
        message: 'Your name needs to be at least 3 characters',
      },
      maxLength: {
        value: 20,
        message: 'Your name needs to be at most of 20 characters',
      },
    },

    email: {
      required: 'This field must be filled in',
      pattern: {
        value: /\S+@\S+\.\S+/,
        message: 'Your email address must be valid',
      },
    },

    password: {
      required: 'This field must be filled in',
      minLength: {
        value: 6,
        message: 'Your name needs to be at least 6 characters',
      },
      maxLength: {
        value: 40,
        message: 'Your name needs to be at most of 40 characters',
      },
    },

    cpassword: {
      required: 'This field must be filled in',
      validate: (value) => (watch('password') === value ? true : 'Passwords must match'),
    },

    image: {},

    title: {
      required: 'This field must be filled in',
    },

    description: {
      required: 'This field must be filled in',
    },
  };
  return (
    <label htmlFor="id">
      <p className={classes.form__article}>{label}</p>
      <input
        className={`${classes.form__input} ${className}`}
        style={errors?.[id] ? { borderColor: '#F5222D' } : null}
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        {...register(id, options[id])}
      />
      <p className={classes.error}>{errors?.[id] && errors[id].message}</p>
    </label>
  );
}
