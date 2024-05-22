import React from 'react';
import { Link } from 'react-router-dom';

import HeaderUnAuth from '../header-unauth/header-unauth';
import HeaderAuth from '../header-auth/header-auth'
import useAuth from '../../hooks/useAuth';

import classes from './header.module.scss';

export default function Header() {
  const { isAuth } = useAuth();

  return (
    <div className={classes.header}>
      <Link className={`${classes.header__logo} ${classes['header--text']}`} to="/">
        Realworld Blog
      </Link>
      {isAuth ? <HeaderAuth /> : <HeaderUnAuth />}
    </div>
  );
}
