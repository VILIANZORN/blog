import React from 'react';
import { useFormContext } from 'react-hook-form';

import TagsAction from '../tags-action/tags-action';
import SignInput from '../sign-input/sing-input';

import classes from './card-action.module.scss';

export default function CardAction({ submit, edit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit(submit)}>
        <h2 className={classes.title}>{edit ? 'Edit article' : 'Create new article'}</h2>
        <SignInput
          className={classes['card-action__input']}
          label="Title"
          id="title"
          type="text"
          placeholder="Title"
          autoComplete="off"
          maxLength={50}
        />
        <SignInput
          className={classes['card-action__input']}
          label="Short description"
          id="description"
          type="text"
          placeholder="Description"
          autoComplete="off"
          maxLength={200}
        />
        <label className={classes.label} htmlFor="body">
          <p className={classes['label-info']}>Text</p>
          <textarea
            className={classes.field}
            style={errors?.text ? { borderColor: '#F5222D' } : null}
            id="body"
            placeholder="Text"
            rows={6}
            {...register('body', { required: 'This is required' })}
          />
          <p className={classes.error}>{errors?.body && errors.body.message}</p>
        </label>
        <TagsAction />
        <button className={classes['send-btn']} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
