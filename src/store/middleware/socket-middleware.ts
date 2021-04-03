import SocketClient from '../../sockets/socket-client';
import { userLoggedInAction, userLoggedOutAction, userReceivedAction } from '../reducers/user.reducer';
export default function socketMiddleware(socket: SocketClient) {
  // Socket param is the client. We'll show how to set this up later.
  return ({dispatch, getState}: any) => (next: any) => async (action: any) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, type, types, ...rest } = action;

    if (type === userReceivedAction.type || type === userLoggedInAction.type) {
      console.log("userReceivedAction or Login, connecting to socket", action.payload, getState);
      await socket.connect(action.payload?.id, {dispatch, getState});
      return next(action);
    }

    if (type === userLoggedOutAction.type) {
      console.log("user logged out, disconnectiing");
      await socket.disconnect();
      return next(action);
    }

    if (type !== 'socket' || !promise) {
      // Move on! Not a socket request or a badly formed one.
      return next(action);
    }


    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});

    return promise(socket)
      .then((result: any) => {
        return next({...rest, result, type: SUCCESS });
      })
      .catch((error: any) => {
        return next({...rest, error, type: FAILURE });
      })
  };
}