import { Provider } from 'react-redux';
import AttributeControls from './components/AttributeControls';
import store from './state/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Recruiting WebApp Character</h1>
        <AttributeControls />
      </div>
    </Provider>
  );
};

export default App;
