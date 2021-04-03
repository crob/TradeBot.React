import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import SocketClient from '../sockets/socket-client';
import reducer from './combineReducers';
import apiMiddleware from './middleware/api-middleware';
import socketMiddleware from './middleware/socket-middleware';

export default function() {
  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), socketMiddleware(new SocketClient()), apiMiddleware]
  });
  return store;
}