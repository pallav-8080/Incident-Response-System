import { FilterQuery, Types } from 'mongoose'

import Channel, { IChannel, PUBLIC_CHANNEL_NAME } from '../models/Channel'
import User from '../models/User'
import Message from '../models/Message'
import UserConnections from '../utils/UserConnections'

class ChannelController {
  create = async (channel: { name?: string; userIds: Types.ObjectId[] }) => {
    if (channel.name === PUBLIC_CHANNEL_NAME) {
      throw new Error('Unauthorized')
    }

    // remove duplicates and ensure order
    const userIds = Array.from(new Set(channel.userIds)).sort((a, b) =>
      a.toHexString().localeCompare(b.toHexString())
    )
    const users = await Promise.all(
      userIds.map(async id => (await User.findById(id).exec())!)
    )
    const exists = await Channel.findOne({
      users,
      name: {
        $ne: PUBLIC_CHANNEL_NAME,
      },
    }).exec()

    if (exists) {
      return exists
    } else {
      return new Channel({
        name: channel.name,
        users,
      }).save()
    }
  }

  /**
   * List channels.
   *
   * @param hasUser If specified, the function will only list
   *                channels that the user joined.
   *                Otherwise, all channels will be returned.
   */
  list = async (hasUser?: Types.ObjectId) => {
    let query: FilterQuery<IChannel> = {}

    if (hasUser) {
      const user = await User.findById(hasUser).exec()

      if (user) {
        query = {
          users: user,
        }
      }
    }

    return (
      Channel.find(query)
        // hide messages when listing all channels
        .select('-messages')
        .exec()
    )
  }

  get = async (id: Types.ObjectId) => Channel.findById(id).exec()

  /**
   * Post a new message to the channel,
   * and notify others in the channel who are currently online.
   *
   * @returns the newly posted message
   */
  appendMessage = async ({
    content,
    senderId,
    channelId,
  }: {
    content: string
    senderId: Types.ObjectId
    channelId: Types.ObjectId
  }) => {
    const sender = await User.findById(senderId).exec()
    if (!sender) {
      throw new Error(`Sender(${senderId.toHexString()}) not found.`)
    }

    const channel = await Channel.findById(channelId).exec()
    if (!channel) {
      throw new Error(`Channel(${channelId.toHexString()}) not found.`)
    }

    const message = await new Message({
      content,
      sender,
      channelId: channel._id,
    }).save()

    channel.messages!.push(message)
    channel.save()

    // notify others
    channel.users.forEach(user => {
      if (user._id.equals(senderId)) return

      const id = user._id.toHexString()
      if (!UserConnections.isUserConnected(id)) return

      const connection = UserConnections.getUserConnection(id)!

      connection.emit('new-message', message)
    })

    return message
  }

  getMessages = async () => {
    // TODO:
    throw new Error('Not Implemented')
  }
}

export default new ChannelController()
