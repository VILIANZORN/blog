import React, { useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from 'antd';

import SpinLoading from '../../components/spin-loading/spin-loading';
import { useGetAllArticlesQuery } from '../../store/API/articlesApi';
import Card from '../../components/card/card';
import ErrorMessage from '../../components/error-message/error-message';

import classes from './articles-page.module.scss';

export default function ArticlesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page'), 10) || 1;

  const slice = useMemo(() => (page - 1) * 5, [page]);

  const {
    data: articlesData,
    error,
    isLoading,
  } = useGetAllArticlesQuery(slice, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    setSearchParams({ page });
  }, [page, setSearchParams]);

  const onChange = (value) => {
    navigate('/articles');
    setSearchParams({ page: value });
  };

  const articles = articlesData?.articles;
  const articlesCount = articlesData?.articlesCount;

  return (
    <div className={classes.container}>
      {error && <ErrorMessage />}
      {isLoading ? (
        <SpinLoading />
      ) : (
        <>
          {articles && articles.map((article) => (
            <Card key={article.slug} article={article} isFull={false} />
          ))}
          {articlesCount > 0 && (
            <Pagination
              className={classes.pagination}
              showSizeChanger={false}
              total={articlesCount}
              hideOnSinglePage
              pageSize={5}
              current={page}
              onChange={onChange}
            />
          )}
        </>
      )}
    </div>
  );
}
