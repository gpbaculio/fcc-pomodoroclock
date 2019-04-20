import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import clock from './clock/reducer';

const rootReducer = combineReducers({
  clock
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}
