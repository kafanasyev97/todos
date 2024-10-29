import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todosApi = createApi({
  reducerPath: 'todosApi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.calmplete.net/',
    prepareHeaders: (headers) => {
      const token =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZab0VjXzhpcmc5a0lyZzk4NnUzSnN5UzVlbHdKOFRzaGt2VDFOZElVd3MifQ.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI0OTE5NjRkOC1hZmMwLTQzMDgtY2Y5Ni0wOGRjZjc3M2U1NDAiLCJuYmYiOjE3MzAxNTY1NzEsImV4cCI6MTczMDI0Mjk3MSwiaWF0IjoxNzMwMTU2NTcxLCJpc3MiOiJDYWxtcGxldGUgQXV0aG9yaXphdGlvbiBTZXJ2ZXIiLCJhdWQiOiJDYWxtcGxldGUifQ.h_aDpyJVFJDp-1aXdz6L1u49WbkKOq9TgI0tO6W8AR8PlAWGWzSQm9OZ9WTF5CJHeewjMOr8cwG1P9nmrc_1qLT68hAmtWf6e7ukmB1SdlyOokIp8CiB6sxssdhY3SyEJwjLzgALii6MSq1j9mYaaCebFnislFOSEp6JVz2g-hdZCMvElrp7Mc5fUTOvHhUEFcrgregsZEF_HR-V3OXKSFDnvLm37VVpcv86BZ7d05QBooWJ5RhmDCq2QeQWFrqOW4SC5VtC7Rp4rOuMujlG8FwZz_tYxdD7vwtW-NtWuaRmfLvSO3O0JKy20IU1zcFal-GZVEjU9oJruFqKEfgEkw'
      headers.set('Authorization', `Bearer ${token}`)

      return headers
    },
  }),
  endpoints: (build) => ({
    getTodos: build.query({
      query: () => 'api/todos',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Todos', id })), 'Todos']
          : ['Todos'],
    }),

    getTodoById: build.query({
      query: (id) => `api/todos/${id}`,
    }),

    createTodo: build.mutation({
      query: (body) => ({
        url: 'api/todos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Todos'],
    }),

    updateTodo: build.mutation({
      query: ({ id, data }) => ({
        url: `api/todos/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Todos'],
    }),

    todoComplitionToggle: build.mutation({
      query: (id) => ({
        url: `api/todos/toggle/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Todos'],
    }),

    deleteTodo: build.mutation({
      query: (id) => ({
        url: `api/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
})

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
  useTodoComplitionToggleMutation,
  useDeleteTodoMutation,
} = todosApi
