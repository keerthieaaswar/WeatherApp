import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import readForecastAPI from '../../api/forecastAPI';
import { ToastAndroid } from 'react-native';
const initialState = {
  forecastData: [],
  loading: true,
  error: null,
};

export const readForecast = createAsyncThunk(
  'weather/readForecast',
  async (payload, { rejectWithValue }) => {
    try {
      const forecastData = await readForecastAPI(
        payload.latitude,
        payload.longitude,
      );
      return forecastData.data;
    } catch (error) {
      return rejectWithValue(error.value);
    }
  },
);

const forecast = createSlice({
  name: 'forecast',
  initialState,
  extraReducers: {
    [readForecast.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [readForecast.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.forecastData = action.payload;
    },
    [readForecast.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.error.message;
      state.forecastData = [];
      ToastAndroid.showWithGravity(
        'Network request failed',
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT,
      );
    },
  },
});

export default forecast.reducer;
