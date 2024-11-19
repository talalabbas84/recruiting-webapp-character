import { Provider } from 'react-redux';
import AttributeControls from './components/AttributeControls';
import ClassDisplay from './components/ClassDisplay';
import store from './state/store';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Recruiting WebApp Character</h1>
        <AttributeControls />
        <ClassDisplay />
      </div>
    </Provider>
  );
};

export default App;
