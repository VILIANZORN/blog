import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './header-unauth.module.scss';

export default function HeaderUnAuth() {
  const navigate = useNavigate();
  return (
    <div className={classes.header__btn}>
      <button className={`${classes['header--text']} ${classes['header__sign-in']}`} onClick={() => navigate('/sign-in')} type="button">
        Sign In
      </button>
      <button className={`${classes['header--text']} ${classes['header__sign-up']}`} onClick={() => navigate('/sign-up')} type="button">
        Sign Up
      </button>
    </div>
  );
}
