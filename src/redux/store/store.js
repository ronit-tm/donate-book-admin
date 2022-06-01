import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import reducer from '../reducers';

export default function configureStore() {
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

  persistStore(store, () => {
    console.log('---> restored reducers');
  });
  return store;
}
