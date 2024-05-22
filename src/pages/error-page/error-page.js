import { useRouteError } from 'react-router-dom';

import classes from './error-page.module.scss';

export default function ErrorPage() {
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Ошибка</h1>
      <p className={classes.text}>Произошка непредвиденная ошибка, пожалуйста перезагрузите страницу</p>
      <p className={classes.message}>{useRouteError().statusText || useRouteError().message}</p>
    </div>
  );
}
