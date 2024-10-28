import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todosApi = createApi({
  reducerPath: 'todosApi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.calmplete.net/',
    prepareHeaders: (headers) => {
      const token =
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZab0VjXzhpcmc5a0lyZzk4NnUzSnN5UzVlbHdKOFRzaGt2VDFOZElVd3MifQ.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxNmJhODhiOS0xMGYwLTQ1YzgtNjBkMi0wOGRjZjZkYTBmOWIiLCJuYmYiOjE3MzAwNjk2MTksImV4cCI6MTczMDE1NjAxOSwiaWF0IjoxNzMwMDY5NjE5LCJpc3MiOiJDYWxtcGxldGUgQXV0aG9yaXphdGlvbiBTZXJ2ZXIiLCJhdWQiOiJDYWxtcGxldGUifQ.PorJCSclwPpxIEjpdWc6ec9XzNJH9h-VmLKs7ECQADg9_OaXutk1U_xN96MArqqP2Ox-gsUtSLnI7lMKCVMuXy_S7iFc18rmXYzOtbyUX_FSeHXiSShRvrFisIvA_5Wqy3TeXdca2mnRfNPUXWnxSiwJVVFmpi6VRHNLeQL8LpZ_VaJZPrRqAz0ReGfo8rjFcTXSsFF4AmnYEF5u7M0G9P2y2OxUlUU1FPzCrmZB4Ueqbx_Q--rFR4eYnyfUVnSDkzgcRzAnzrx3hJRC5tJW7hTz7Pl2QuRWmM52kFskO4lz7OZceWZ8cOQki1K_TOOGdQXfhKF1LQNhBUxulb7qTw'
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
      invalidatesTags: ['Todos'], // TODO
    }),

    updateTodo: build.mutation({
      query: ({ id, data }) => ({
        url: `api/todos/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Todos'], // TODO
    }),

    updateUser: build.mutation({
      query: ({ id, formData }) => ({
        url: `v1/user/update?id=${id}`,
        method: 'PUT',
        body: formData,
      }),
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `v1/user/delete?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useGetTodoByIdQuery,
  useUpdateTodoMutation,
} = todosApi
