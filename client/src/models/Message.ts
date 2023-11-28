import IUser from './User'

export default interface IMessage {
  _id: string
  sender: IUser
  timestamp: string
  channelId: string
  content: string
}
