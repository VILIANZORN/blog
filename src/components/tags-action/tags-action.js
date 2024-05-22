import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';

import classes from './tags-action.module.scss';

export default function TagsAction() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  });

  const [value, setValue] = useState('');

  const addTag = () => {
    if (value.trim() !== '' && fields.length < 8) {
      append({ value });
      setValue('');
    }
  };

  const deleteLastTag = () => {
    if (fields.length > 0) {
      remove(fields.length - 1);
    }
  };

  return (
    <label className={classes.container} htmlFor="tag">
      <span className={classes.title}>Tags</span>

      {fields.map((field, index) => (
        <div key={field.id} className={classes['added-tags']}>
          <input
            className={classes['add-input']}
            type="text"
            value={field.value}
            disabled
            {...register(`tagList.${index}.value`)}
          />
          <button className={classes.delete} type="button" onClick={() => remove(index)}>
            Delete
          </button>
        </div>
      ))}

      {fields.length < 8 && (
        <div className={classes['input-group']}>
          <input
            className={classes['add-input']}
            id="tag"
            placeholder="Tag"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
          />
          {fields.length > 0 && (
            <button className={classes.delete} type="button" onClick={deleteLastTag}>
              Delete
            </button>
          )}
          <button className={classes.add} type="button" onClick={addTag}>
            Add tag
          </button>
        </div>
      )}
    </label>
  );
}
