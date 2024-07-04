
import { Provider } from 'react-redux';
import { store } from '@interview-todo/frontend_rtk_query';
import { Home } from '../packages/todo-web/components/home/home';;

export function App() {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
}

export default App;
