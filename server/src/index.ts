import { Server } from 'http'
import { Server as SocketIO } from 'socket.io'

import app from './app'
import Socket from './socket'
import * as Database from './utils/Database'

const PORT = parseInt(process.env.PORT || '3001')
const server = new Server(app)
const socketIO = new SocketIO({
  // @see https://socket.io/docs/v3/handling-cors/
  cors: {
    origin: '*',
    credentials: true,
  },
}).attach(server)

Database.connect()

Socket.setup(socketIO)

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!`))
