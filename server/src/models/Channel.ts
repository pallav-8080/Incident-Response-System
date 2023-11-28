/**
 * A channel is an abstraction where a group of users can send messages.
 * Consider it as a mimic of Slack Channel.
 */

import mongoose, { Schema, Document, Model } from 'mongoose'
import AutoPopulate from 'mongoose-autopopulate'

import { IUser } from './User'
import { IMessage } from './Message'

export const PUBLIC_CHANNEL_NAME = 'Public'

export interface IChannel extends Document {
  name?: string
  users: IUser[]
  messages?: IMessage[]
}

export interface IChannleModel extends Model<IChannel> {
  getPublicChannel: () => Promise<IChannel>
}

const ChannelSchema = new Schema({
  name: { type: String },
  users: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      autopopulate: {
        select: '-password -__v',
      },
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Message',
      autopopulate: true,
    },
  ],
})

ChannelSchema.plugin(AutoPopulate)

ChannelSchema.statics.getPublicChannel = async () => {
  const channel = await Channel.findOne({ name: PUBLIC_CHANNEL_NAME }).exec()

  if (channel) {
    return channel
  } else {
    return new Channel({ name: PUBLIC_CHANNEL_NAME }).save()
  }
}

const Channel = mongoose.model<IChannel, IChannleModel>(
  'Channel',
  ChannelSchema
)

export default Channel
