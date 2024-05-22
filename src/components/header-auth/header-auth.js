import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { removeUser } from '../../store/userSlice';
import useAuth from '../../hooks/useAuth';

import Logotip from './ava_logo.svg';
import classes from './header-auth.module.scss';

export default function HeaderAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, image } = useAuth();
  const removeUserDispatch = () => dispatch(removeUser());

  const handleClicklogOut = () => {
    removeUserDispatch();
    navigate('/');
    window.location.reload();
  };
  
  return (
    <div className={classes.header__btn}>
      <button
        className={`${classes['header__create-article--text']} ${classes['header__create-article']}`}
        onClick={()=>{navigate('/new-article')}} type="button"
      >
        create article
      </button>
      <button className={classes["edit-btn"]}type="button"  onClick={() => navigate('profile')}>
        <div className={classes.header__profile}>
          <div className={classes.card__name}>{username}</div>
          <img className={classes.card__img} src={image || Logotip} alt="ava" />
        </div>
      </button>
      <button className={`${classes['header--text']} ${classes['header__log-out']}`} onClick={handleClicklogOut} type="button">
        Log Out
      </button>
    </div>
  );
}
