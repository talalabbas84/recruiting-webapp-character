import { Provider } from 'react-redux';
import CharacterControl from './components/CharacterControl';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Recruiting WebApp Character</h1>
        <CharacterControl />
      </div>
    </Provider>
  );
};

export default App;
