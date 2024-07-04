import React from 'react';
import {View} from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../packages/api/services/store';
import { Home } from '../packages/todo-mobile/components/home/home';

export const App = () => {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
};

export default App;
