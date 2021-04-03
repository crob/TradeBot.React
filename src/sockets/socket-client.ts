import socketIOClient from 'socket.io-client';
import HttpHelper from '../helpers/http-helper';

// Example conf. You can move this to your config file.
const host = 'http://localhost:5000/user';
// const socketPath = '';

export default class SocketClient {
  socket: any;

  connect(userId: number, store: any) {
    if (!this.socket) {
      this.socket = socketIOClient(host, {});
      return new Promise((resolve: any, reject) => {
        this.socket.on('connect', () => resolve());
        this.socket.on('connect_error', (error: any) => reject(error));
        this.socket.on("user::subscribed", (data: any) => {
          console.log("subscribed", data)
        });
        this.socket.on("socket::user::event", (response: any) => {
          console.log("socket::user::event", response, store)
          response.payload = HttpHelper.reviveData(response.payload);
          store.dispatch(response);
        });
        this.socket.emit('user::subscribe', userId);
      });
    }
  }

  disconnect() {
    return new Promise((resolve: any) => {
      if (this.socket) {
        this.socket.disconnect(() => {
          this.socket = null;
          resolve();
        });
      }
    });
  }

  emit(event: any, data: any) {
    return new Promise((resolve: any, reject) => {
      if (!this.socket) return reject('No socket connection.');

      return this.socket.emit(event, data, (response: any) => {
        // Response is the optional callback that you can use with socket.io in every request. See 1 above.
        if (response.error) {
          console.error(response.error);
          return reject(response.error);
        }

        return resolve();
      });
    });
  }

  on(event: any, fun: any) {
    // No promise is needed here, but we're expecting one in the middleware.
    return new Promise((resolve: any, reject) => {
      if (!this.socket) return reject('No socket connection.');

      this.socket.on(event, fun);
      resolve();
    });
  }
}