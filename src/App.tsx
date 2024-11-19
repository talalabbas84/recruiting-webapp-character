import { Provider } from 'react-redux';
import Character from './components/Character';
import store from './state/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Recruiting WebApp Character</h1>
        <Character />
      </div>
    </Provider>
  );
};

export default App;
