import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import SpinLoading from '../../components/spin-loading/spin-loading';
import { useEditArticleMutation } from '../../store/API/articlesApi';
import CardAction from '../../components/card-action/card-action';


function EditArticlePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [editArticle, { isLoading }] = useEditArticleMutation();
  const { slug, title, description, body, tagList } = location.state;

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title,
      description,
      body,
      tagList: tagList.map((tag) => ({ value: tag })),
    },
  });

  const onSubmit = (data) => {
    const requestData = {
      article: {
        ...data,
        tagList: data.tagList.map((tag) => tag.value),
      },
    };

    editArticle({ slug, requestData })
      .unwrap()
      .then(() => navigate(`/articles/${slug}`, { replace: true }));
  };

  if (isLoading) return <SpinLoading />;

  return (
    <div>
      <FormProvider {...methods}>
        <CardAction submit={onSubmit} edit />
      </FormProvider>
    </div>
  );
}

export default EditArticlePage;