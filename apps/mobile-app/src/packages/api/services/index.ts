import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo } from '@prisma/client';
import { NewTodo } from '../models/services';


export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl:'http://192.168.100.14:3000' }),
  tagTypes: ['Todo'],
  endpoints: (builder)=>({
    getTodos: builder.query<Todo[], void>({
      query:()=> ({
        url:'/todos',
        method: 'GET'
      }),
      providesTags: ['Todo'],

    }),
    addTodo: builder.mutation<Todo, Partial<NewTodo>>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todo'],
    }),
    updateTodo: builder.mutation({
      query: ({ id, title }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: {title},
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
})


export const {
  useAddTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi;


