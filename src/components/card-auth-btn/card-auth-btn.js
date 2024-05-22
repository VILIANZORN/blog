import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import SpinLoading from '../spin-loading/spin-loading';
import { useDeleteArticleMutation } from '../../store/API/articlesApi';
import DeleteConfirm from '../delete-confirm/delete-confirm'

import classes from './card-auth-btn.module.scss';

export default function CardAuthBtn({ article }) {
  const { slug } = article;

  const navigate = useNavigate();
  const [deleteArticle, { isLoading }] = useDeleteArticleMutation();
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef(null);

  const onDelete = () => {
    deleteArticle(slug);
    navigate('/', { replace: true });
  };

  const onEdit = () => {
    navigate(`/article/${slug}/edit`, { state: article });
  };

  const handleClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  if (isLoading)
    return <SpinLoading />;

  return (
    <div className={classes.container}>
      <div className={classes['confirm-container']}>
        <button
          className={classes.delete}
          type="button"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>

        <DeleteConfirm
          ref={modalRef}
          showModal={showModal}
          setShowModal={setShowModal}
          onDelete={onDelete}
        />
      </div>

      <button className={classes.edit} type="button" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
}
