import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import SpinLoading from '../../components/spin-loading/spin-loading';
import { useCreateArticleMutation } from '../../store/API/articlesApi';
import CardAction from '../../components/card-action/card-action';

import classes from './create-arcticle-page.module.scss';

function CreateArticlePage() {
  const navigate = useNavigate();
  const [createArticle, { isLoading }] = useCreateArticleMutation();

  const methods = useForm({ mode: 'onSubmit' });

  const onSubmit = (data) => {
    const requestData = {
      article: {
        ...data,
        tagList: data.tagList.map((tag) => tag.value),
      },
    };

    createArticle(requestData)
      .unwrap()
      .then((res) => navigate(`/articles/${res.article.slug}`));
  };

  if (isLoading) return <SpinLoading />;

  return (
    <div className={classes.container}>
      <FormProvider {...methods}>
        <CardAction submit={onSubmit} />
      </FormProvider>
    </div>
  );
}

export default CreateArticlePage;