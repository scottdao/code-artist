import reducer from './reducer'

import { createStore,applyMiddleware  } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
const loggerMiddleware = createLogger();
const configureStore = (preloadedState) => {
  return createStore(
   	reducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
export default configureStore;