import SocketIO from 'socket.io'

import * as Token from './utils/Token'
import UserConnections from './utils/UserConnections'

interface ILoginMessage {
  token: string
  uid: string
}

class Socket {
  setup = (server: SocketIO.Server) => {
    server.on('connection', (socket: SocketIO.Socket) => {
      socket.on('login', (message: ILoginMessage) => {
        // validate
        if (
          message.uid &&
          message.token &&
          Token.validate(message.uid, message.token)
        ) {
          // save socket instance
          UserConnections.addUserConnection(message.uid, socket)
          socket.broadcast.emit('user-status-changed', { uid: message.uid })
        } else {
          console.error(`Invalid login message from ${message.uid}`)

          socket.disconnect()
        }
      })

      socket.on('disconnect', () => {
        const uid = UserConnections.getConnectedUsers().find(
          uid => UserConnections.getUserConnection(uid) === socket
        )

        if (uid) {
          UserConnections.removeUserConnection(uid)
          socket.broadcast.emit('user-status-changed', { uid })
        }
      })
    })
  }
}

export default new Socket()
