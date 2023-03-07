import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/demoSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: [],
});

export default store;
