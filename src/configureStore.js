import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './reducers'
//import logger from "redux-logger";
//const middlewares = [thunk, logger];
import { createLogger } from 'redux-logger';
const middleWare = [thunk];
const loggerMiddleware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
});
middleWare.push(loggerMiddleware)

const persistConfig = {
  key: 'root',
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
const configStore = (initialState = {}) => {
  let store = createStore(
    persistedReducer,
    {},
    compose(applyMiddleware(...middleWare))
  );
  let persistor = persistStore(store)
  return { store, persistor }
}

const { store, persistor } = configStore();

global.store = store;

export { store, persistor };
