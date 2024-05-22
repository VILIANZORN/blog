import React from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { useSetFavoriteArticleMutation, useDeleteFavoriteArticleMutation } from '../../store/API/articlesApi';

import { ReactComponent as LikeIcon } from './heart1.svg';
import classes from './card-like.module.scss';

export default function CardLike({ article }) {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { slug, favorited } = article;
  const [setLike] = useSetFavoriteArticleMutation();
  const [deleteLike] = useDeleteFavoriteArticleMutation();

  const handleClick = () => {
    if (favorited) {
      deleteLike(slug);
    } else {
      setLike(slug);
    }
  };

  return (
    <button
      className={classes['like-button']}
      type="button"
      onClick={
        !isAuth
          ? () => {
              navigate('/sign-in');
            }
          : handleClick
      }
      aria-label="Like"
    >
      <LikeIcon className={favorited ? classes['like-icon__delete'] : classes['like-icon']} />
    </button>
  );
}
