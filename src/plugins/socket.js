import { SocketManager } from '../utils/network/socket-manager';
import { SOCKET_URL } from '../utils/misc';

export default function ({ app, store }, inject) {
  if (typeof window === 'undefined') {
    return;
  }

  const socketManager = SocketManager.getManager();

  inject( 'sm', socketManager );

  return socketManager.connect( SOCKET_URL ).then(_ => {
    const socket = socketManager.socket;
    socket.on('issues.update', issue => {
      console.log( 'new issue', issue.id );

      app.$ion.sound.play( 'event' );

      store.dispatch( 'prependIssues', [ issue ] );
    });

    socket.on('money.update', updates => {
      const state = store.state;
      const theme = state.ui.theme;
      if (theme === 'dark') {
        store.dispatch( 'money/updateFromServer', updates );
      }
    });
  });
}
