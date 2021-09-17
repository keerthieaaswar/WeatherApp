import { configureStore, combineReducers } from '@reduxjs/toolkit';
import weather from './Weather';
import forecast from './Forecast';
const store = configureStore({
  reducer: combineReducers({ weather, forecast }),
});

export default store;
