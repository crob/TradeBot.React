import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from './combineReducers';
import apiMiddleware from './middleware/api-middleware';

export default function() {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), apiMiddleware]
  });
}