import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface NewTodo {
  title: string;
  completed?: boolean;
}

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
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Todo' as const, id })), { type: 'Todo', id: 'LIST' }]
          : [{ type: 'Todo', id: 'LIST' }],

    }),
    addTodo: builder.mutation<Todo, Partial<NewTodo>>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/todos/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
  }),
})


export const {
  useAddTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi;


