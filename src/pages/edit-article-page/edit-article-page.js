import { useNavigate, useLocation } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useMemo } from 'react';

import SpinLoading from '../../components/spin-loading/spin-loading';
import { useEditArticleMutation } from '../../store/API/articlesApi';
import CardAction from '../../components/card-action/card-action';

function EditArticlePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [editArticle, { isLoading, error }] = useEditArticleMutation();
  const { slug, title, description, body, tagList } = location.state;

  const defaultValues = useMemo(() => ({
    title,
    description,
    body,
    tagList: tagList.map((tag) => ({ value: tag })),
  }), [title, description, body, tagList]);

  const methods = useForm({
    mode: 'onSubmit',
    defaultValues,
  });

  const onSubmit = async (data) => {
    const requestData = {
      article: {
        ...data,
        tagList: data.tagList.map((tag) => tag.value),
      },
    };

    try {
      await editArticle({ slug, requestData }).unwrap();
      navigate(`/articles/${slug}`, { replace: true });
    } catch (err) {
      console.error('Failed to edit article:', err);
    }
  };

  if (isLoading) return <SpinLoading />;

  return (
    <div>
      <FormProvider {...methods}>
        <CardAction submit={onSubmit} edit />
      </FormProvider>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default EditArticlePage;
