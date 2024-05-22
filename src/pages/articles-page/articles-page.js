import React from 'react';
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
  const page = searchParams.get('page') ?? 1;

  const slice = (page - 1) * 5;
  const {
    data: articlesData,
    error,
    isLoading,
  } = useGetAllArticlesQuery(slice, {
    refetchOnMountOrArgChange: true,
  });

  const onChange = (value) => {
    navigate('/articles');
    setSearchParams({ ...searchParams, page: value });
  };

  const articles = articlesData && articlesData.articles;
  const articlesCount = articlesData && articlesData.articlesCount;

  const pagination = articlesData && (
    <Pagination
      className={classes.pagination}
      showSizeChanger={false}
      total={articlesCount}
      hideOnSinglePage
      pageSize={5}
      current={page}
      onChange={onChange}
    />
  );

  return (
    <div className={classes.container}>
      {error ? <ErrorMessage /> : null}
      {isLoading ? <SpinLoading /> : null}
      {articlesData && articles.map((article) => <Card key={article.slug} article={article} isFull={false} />)}
      {pagination}
    </div>
  );
}
