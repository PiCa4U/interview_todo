import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl:'http://localhost:3000' }),
  endpoints: (builder)=>({
    getTodos: builder.query({
      query:()=> '/todos',
    }),
    addTodo: builder.mutation({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})


export const {
  useAddTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi;


