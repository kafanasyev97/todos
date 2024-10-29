import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todosApi = createApi({
  reducerPath: 'todosApi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.calmplete.net/',
    prepareHeaders: (headers) => {
      const token =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZab0VjXzhpcmc5a0lyZzk4NnUzSnN5UzVlbHdKOFRzaGt2VDFOZElVd3MifQ.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI4Mjg2ZDUzNC03NGIzLTQ0ZDktYzVmNS0wOGRjZjg3MDc0Y2YiLCJuYmYiOjE3MzAyNDQxMTksImV4cCI6MTczMDMzMDUxOSwiaWF0IjoxNzMwMjQ0MTE5LCJpc3MiOiJDYWxtcGxldGUgQXV0aG9yaXphdGlvbiBTZXJ2ZXIiLCJhdWQiOiJDYWxtcGxldGUifQ.LGKGKbjRtGfEzrroypDJWuSMbm9YrnTSjTvpTrA5D-e58d0ev8Uixn8qnRlF_SuxMk8i_Wq-q1fCpfxY9DUWde1ASPy_5nnMsIU3lbh0EH3-525jhaURPRI-A3GufxikPQxyd_r50U2x7c1yjMW-sO9BKqWOl8LZ4FnB2piK-sQCtmFyaCuVA7VWwrtfY-IYR7aOctkAbFmWPfO57NMBkL0u52fXlT-dzP-T6vF85VZp7HfLcxIwQOp26ZW0IL9A9vcKJS7S4SB2uDxPQgK045IgdzqhLetvODNsmGb7o4IUGDb3lIGN_d1wsSPCqJHqI4JA6f_ztfIj-5GWSzCl8g'
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
