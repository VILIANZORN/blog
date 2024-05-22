import { useParams } from 'react-router-dom';

import SpinLoading from '../../components/spin-loading/spin-loading';
import { useGetSoloArticleQuery } from '../../store/API/articlesApi';
import Card from '../../components/card/card';
import ErrorMessage from '../../components/error-message/error-message';

function ArticlePage() {
  const { slug } = useParams();
  const { data: articleData, error, isLoading } = useGetSoloArticleQuery(slug, { refetchOnMountOrArgChange: true });

  return (
    <>
      {error ? <ErrorMessage /> : null}
      {isLoading ? <SpinLoading /> : null}
      {articleData && <Card article={articleData.article} isFull />}
    </>
  );
}

export default ArticlePage;
