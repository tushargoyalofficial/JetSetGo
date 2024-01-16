import {configureStore} from '@reduxjs/toolkit';

// slices
import flightSlice from './feature/flightsSlice';

export const store = configureStore({
  reducer: {
    flights: flightSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
