import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { useSetFavoriteArticleMutation, useDeleteFavoriteArticleMutation } from '../../store/API/articlesApi';

import { ReactComponent as LikeIcon } from './heart1.svg';
import classes from './card-like.module.scss';

export default function CardLike({ article, onLikeChange }) {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { slug, favorited: initialFavorited } = article;
  const [favorited, setFavorited] = useState(initialFavorited);
  const [setLike] = useSetFavoriteArticleMutation();
  const [deleteLike] = useDeleteFavoriteArticleMutation();

  const handleClick = async () => {
    if (favorited) {
      await deleteLike(slug);
      setFavorited(false);
      onLikeChange(-1);
    } else {
      await setLike(slug);
      setFavorited(true);
      onLikeChange(1);
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
