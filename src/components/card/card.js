import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown';

import useAuth from '../../hooks/useAuth';
import CardLike from '../card-like/card-like';
import CardAuthBtn from '../card-auth-btn/card-auth-btn';

import defaultAva from './ava_logo.svg';
import classes from './card.module.scss';

export default function Card({ article, isFull }) {
  const { isAuth, username } = useAuth();
  const navigate = useNavigate();
  const [favoritesCount, setFavoritesCount] = useState(article.favoritesCount);

  if (!article) {
    return <div>Article data is not available</div>;
  }

  const title = article.title && article.title.trim() !== '' ? article.title : <span>No title</span>;

  const description =
    article.description && article.description.trim() !== '' ? article.description : <span>No description</span>;

  const tags = article.tagList && article.tagList.length > 0 ? article.tagList.slice(0, 8) : ['нет тега'];

  function limitText(text, limit) {
    let str = text.toString().slice(0, limit);

    if (str.length < text.length) {
      str = str
        .split('')
        .splice(str.length - 1, 1)
        .join('');
      return `${str} ...`;
    }

    return text;
  }

  function handleImageError(event) {
    event.target.src = defaultAva;
  }

  const handleLikeChange = (change) => {
    setFavoritesCount(favoritesCount + change);
  };

  return (
    <div className={classes.card}>
      <div className={classes['card-flex']}>
        <div className={classes.card__artc}>
          <div className={classes['card__artc--flex']}>
            <button
              className={`${classes.card__article} ${classes['card--text']}`}
              onClick={() => navigate(`/articles/${article.slug}`)}
              type="button"
            >
              {isFull ? title : limitText(title, 55)}
            </button>
            <div className={classes['like--flex']}>
              <CardLike article={article} onLikeChange={handleLikeChange} />
              <div className={classes.like__counter}>{favoritesCount}</div>
            </div>
          </div>
          <div className={classes.card__tags}>
            {tags.map((tag) => (
              <Tag key={uuidv4()}>{tag}</Tag>
            ))}
          </div>
        </div>
        <div className={classes['card__user-info']}>
          <div className={classes['card__user-text']}>
            <div className={classes.card__name}>{limitText(article.author.username, 20) || 'User'}</div>
            <div className={classes.card__date}>{new Date(article.createdAt).toLocaleDateString()}</div>
          </div>
          <img
            className={classes.card__img}
            src={article.author.image || defaultAva}
            onError={handleImageError}
            alt="ava"
          />
        </div>
      </div>
      <div className={classes['description-flex']}>
        <div className={`${classes.description} ${classes['description--text']}`}>
          {isFull ? description : limitText(description, 200)}
        </div>
        {isFull && isAuth && article.author.username === username ? <CardAuthBtn article={article} /> : null}
      </div>
      {isFull ? (
        <div className={classes.body}>
          <ReactMarkdown className={classes.body__more}>{article.body}</ReactMarkdown>
        </div>
      ) : null}
    </div>
  );
}
