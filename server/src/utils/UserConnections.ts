import SocketIO from 'socket.io'

const connections = new Map<string, SocketIO.Socket>()

class UserConnections {
  isUserConnected = (uid: string) => !!connections.get(uid)

  addUserConnection = (uid: string, connection: SocketIO.Socket) =>
    connections.set(uid, connection)

  getUserConnection = (uid: string) => connections.get(uid)

  removeUserConnection = (uid: string) => connections.delete(uid)

  getConnectedUsers = () => Array.from(connections.keys())
}

export default new UserConnections()
