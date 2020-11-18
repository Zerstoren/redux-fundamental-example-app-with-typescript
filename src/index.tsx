import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css'

import store from './store';
import App from './features/App';
import {fetchTodos} from './features/todos/todoSlice';

store.dispatch(fetchTodos());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
