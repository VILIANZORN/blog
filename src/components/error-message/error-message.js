import React from 'react';
import { Alert } from 'antd';

import classes from './error-message.module.scss';

export default function ErrorMessage() {
  return (
    <div className={classes.error}>
      <Alert
        message="Error"
        description="Кажется произошла непредвиденная ошибка, попробуйте перезагрузить страницу."
        type="error"
      />
    </div>
  );
}
