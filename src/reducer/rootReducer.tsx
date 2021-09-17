import { configureStore, combineReducers } from '@reduxjs/toolkit';
import weather from './Weather';

const store = configureStore({
  reducer: combineReducers({ weather }),
});

export default store;
