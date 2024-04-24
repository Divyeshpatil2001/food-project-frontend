import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import rootReducer from './rootReducer';
import {thunk} from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware : getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(thunk), 
});

export default store;
export const persistor = persistStore(store);
