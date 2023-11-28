import IUser from './User'

export default interface IChannel {
  _id: string
  name?: string
  users: IUser[]
}

export const resolveChannelName = (channel: IChannel) => {
  if (!channel.name) {
    const uid = localStorage.getItem('uid')
    const others = channel.users.filter(user => user._id !== uid)

    channel.name = others
      .map(({ username }) => username)
      .sort()
      .join(',')
  }

  return channel
}
