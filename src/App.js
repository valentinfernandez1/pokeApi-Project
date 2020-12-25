import './App.css';
import {Router} from 'react-router-dom';
import Main from './components/MainComponent'
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import history from './shared/history';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Main />
      </Router>
    </Provider>
  );
}

export default App;
