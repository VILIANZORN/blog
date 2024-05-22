import { configureStore } from '@reduxjs/toolkit';

import { articlesApi } from './API/articlesApi';
import { userApi } from './API/userApi'
import userSliceReducer from './userSlice';

export default configureStore({
  reducer: {
    user: userSliceReducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware, userApi.middleware),
});