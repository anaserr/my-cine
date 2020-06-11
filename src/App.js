import React from 'react';
import './assets/App.css';
import HomePage from './components/HomePage';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <HomePage />
      </React.Fragment>
    </Provider>
  );
}

export default App;
