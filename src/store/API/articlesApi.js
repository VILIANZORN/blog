import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const articlesApi = createApi({
  reducerPath: 'articlesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api' }),
  tagTypes: ['Article'],
  endpoints: (builder) => ({
    getAllArticles: builder.query({
      query: (offset) => ({
        url: '/articles',
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
        params: {
          limit: 5,
          offset,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.articles.map(({ slug }) => ({
                type: 'Article',
                id: slug,
              })),
              { type: 'Article', id: 'LIST' },
            ]
          : [{ type: 'Article', id: 'LIST' }],
    }),

    getSoloArticle: builder.query({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'GET',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),

      providesTags: (arg) => [{ type: 'Article', id: arg }],
    }),

    createArticle: builder.mutation({
      query: (body) => ({
        url: '/articles',
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
        body,
      }),

      invalidatesTags: () => [{ type: 'Article', id: 'LIST' }],
    }),

    editArticle: builder.mutation({
      query: ({ slug, requestData }) => ({
        url: `/articles/${slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: requestData,
      }),

      invalidatesTags: (arg) => [
        { type: 'Article', id: arg.slug },
      ],
    }),

    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),

      invalidatesTags: (arg) => [{ type: 'Article', id: arg }],
    }),

    setFavoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),

      invalidatesTags: (arg) => [{ type: 'Article', id: arg }],
    }),

    deleteFavoriteArticle: builder.mutation({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }),

      invalidatesTags: (arg) => [{ type: 'Article', id: arg }],
    }),
  }),
});

export const {
  useGetAllArticlesQuery,
  useGetSoloArticleQuery,
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useSetFavoriteArticleMutation,
  useDeleteFavoriteArticleMutation,
} = articlesApi;