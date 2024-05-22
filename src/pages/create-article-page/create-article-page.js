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

  const onSubmit = async (data) => {
    const requestData = {
      article: {
        ...data,
        tagList: data.tagList.map((tag) => tag.value),
      },
    };

    try {
      const res = await createArticle(requestData).unwrap();
      navigate(`/articles/${res.article.slug}`);
    } catch (error) {
      console.error("Failed to create article:", error);
    }
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
