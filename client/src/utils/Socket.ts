import SocketIO, { Socket,io } from 'socket.io-client'
import IMessage from '@/models/Message'
import DataStore from './DataStore'
import request from './request'
import IUser from '../models/User'

/**
 * Maintains a single Socket instance across pages
 */
class SocketWrapper {
  private socket?: Socket

  connect = () => {
    const uid = localStorage.getItem('uid')
    const token = localStorage.getItem('token')

    if (this.socket || !uid || !token) {
      return
    }

    const url = window.location.host.startsWith('localhost')
      ? 'localhost:3001/'
      : '/'

    this.socket = io(url)

    // register listeners
    this.socket.on('new-message', this.appendMessage)
    this.socket.on('user-status-changed', this.refreshContacts)

    // authenticate
    this.socket.emit('login', {
      token,
      uid,
    })
  }

  close = () => {
    if (this.socket) {
      this.socket.close()

      this.socket = undefined
    }
  }

  private appendMessage = async (message: IMessage) => {
    const { messages } = DataStore.getState()
    const channelMessages = messages.get(message.channelId) || []

    channelMessages.push(message)
    messages.set(message.channelId, channelMessages)

    DataStore.setState({ messages })
  }

  private refreshContacts = async () => {
    const contacts = await request<IUser[]>('/api/users')

    DataStore.setState({ contacts })
  }
}

export default new SocketWrapper()
