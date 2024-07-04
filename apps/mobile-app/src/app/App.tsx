import React from 'react';
import { Provider } from 'react-redux';
import { Home } from '../packages/todo-mobile/components/home/home';
import { store }  from '@interview-todo/frontend_rtk_query';

export const App = () => {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
};

export default App;
