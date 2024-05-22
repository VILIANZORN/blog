import { createBrowserRouter } from 'react-router-dom';

import App from '../components/app/App';
import ErrorPage from '../pages/error-page/error-page';
import ArticlesPage from '../pages/articles-page/articles-page';
import ArticlePage from '../pages/article-page/article-page';
import SignInPage from '../pages/sign-in-page/sign-in-page';
import SignUpPage from '../pages/sign-up-page/sign-up-page';
import EditProfilePage from '../pages/edit-profile-page/edit-profile-page';
import CreateArticlePage from '../pages/create-article-page/create-article-page';
import EditArticlePage from '../pages/edit-article-page/edit-article-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <ArticlesPage />,
      },

      {
        path: '/articles',
        element: <ArticlesPage />,
      },
      {
        path: '/articles/:slug',
        element: <ArticlePage />,
      },
      {
        path: '/sign-in',
        element: <SignInPage />,
      },

      {
        path: '/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '/profile',
        element: <EditProfilePage />,
      },
      {
        path: '/new-article',
        element: <CreateArticlePage />,
      },
      {
        path: '/article/:slug/edit',
        element: <EditArticlePage />,
      },
    ],
  },
]);

export default router;
