import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewTodo,Todo } from '../models/services';


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
    addTodo: builder.mutation<Todo,  Pick<Todo, 'title'>>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todo'],
    }),
    updateTodo: builder.mutation<void, Omit<Todo, 'createdAt'>>({
      query: ({ id, title, completed }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: {title , completed},
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation<void, string>({
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


