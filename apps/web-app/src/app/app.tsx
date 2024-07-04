
import { Provider } from 'react-redux';
import { store } from '../packages/api/services/store';
import { Home } from '../packages/todo-web/components/home/home';

export function App() {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
}

export default App;
