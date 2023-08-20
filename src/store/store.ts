// src/store.ts

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import companyReducer from './companySlice';
import CustomizerReducer from './customizer/CustomizerSlice';

const store = configureStore({
  reducer: {
    company: companyReducer,
    customizer: CustomizerReducer,
  },
});

const rootReducer = combineReducers({
  company: companyReducer,
  customizer: CustomizerReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
