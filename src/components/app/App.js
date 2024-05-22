import { Outlet } from 'react-router-dom';
import { Offline } from 'react-detect-offline';
import { Alert } from 'antd';
import { CloseSquareFilled } from '@ant-design/icons';

import Header from '../header/header';
import store from '../../store/store';
import { userApi } from '../../store/API/userApi';

import classes from './App.module.scss';

export default function App() {
  const token = localStorage.getItem('token');
  if (token) {
    store.dispatch(userApi.endpoints.getUser.initiate(token));
  }

  return (
    <div className={classes.container}>
      <Header />
      <Offline>
        <Alert
          message="Error"
          description="Вы не в сети, проверьте подключение к интернету"
          type="error"
          showIcon
          closable={{
            'aria-label': 'close',
            closeIcon: <CloseSquareFilled />,
          }}
        />
      </Offline>
      <section className={classes.content}>
        <Outlet />
      </section>
    </div>
  );
}
