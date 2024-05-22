import { useParams } from 'react-router-dom';

import SpinLoading from '../../components/spin-loading/spin-loading';
import { useGetSoloArticleQuery } from '../../store/API/articlesApi';
import Card from '../../components/card/card';
import ErrorMessage from '../../components/error-message/error-message';

export default function ArticlePage() {
  const { slug } = useParams();
  const { data: articleData, error, isLoading } = useGetSoloArticleQuery(slug, { refetchOnMountOrArgChange: true });

  if (error) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    return <SpinLoading />;
  }

  if (articleData) {
    return <Card article={articleData.article} isFull />;
  }

  return null;
}


