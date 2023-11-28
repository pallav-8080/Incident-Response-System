import { mock } from 'jest-mock-extended'
import SocketIO from 'socket.io'

import ChannelController from './ChannelController'
import * as TestDatabase from '../utils/TestDatabase'
import Channel, { PUBLIC_CHANNEL_NAME, IChannel } from '../models/Channel'
import UserController from './UserController'
import { IUser } from '../models/User'
import UserConnections from '../utils/UserConnections'

describe('Channel controller', () => {
  let userA: IUser
  let userB: IUser
  let userC: IUser
  let channel: IChannel

  beforeAll(async () => {
    TestDatabase.connect()

    userA = await UserController.register('Channel-User-A', 'password-A')
    userB = await UserController.register('Channel-User-B', 'password-B')
    userC = await UserController.register('Channel-User-C', 'password-C')
  })

  it('will not allow to create the public channel manually', async () => {
    expect.assertions(1)

    try {
      await ChannelController.create({
        name: PUBLIC_CHANNEL_NAME,
        userIds: [],
      })
    } catch (e) {
      expect(e.message).toBe('Unauthorized')
    }
  })

  it('will create a new channel given users and channel name', async () => {
    channel = await ChannelController.create({
      userIds: [userA._id, userB._id],
    })

    expect(channel.name).not.toBeDefined()
    expect(channel.users.length).toBe(2)
    expect(channel.messages!.length).toBe(0)
  })

  it('will return the existing channel if users are essentially the same', async () => {
    const newChannel = await ChannelController.create({
      userIds: [userB._id, userA._id],
    })

    expect(newChannel.id).toEqual(channel.id)
  })

  it('can list all existing channels', async () => {
    const result = await ChannelController.list()

    expect(result.length).toBe(2)
    expect(result[0].name).toEqual('Public')
    expect(result[0].users.length).toBe(3)
    // hide messages when listing all channels
    expect(result[0].messages).not.toBeDefined()
    expect(result[1].name).not.toBeDefined()
    expect(result[1].users.length).toBe(2)
    expect(result[1].messages).not.toBeDefined()
  })

  it('can list channels which a user joined', async () => {
    const result = await ChannelController.list(userC._id)

    expect(result.length).toBe(1)
    expect(result[0].name).toEqual('Public')
  })

  it('can get a channel by id', async () => {
    const publicChannel = await Channel.getPublicChannel()
    const channel = await ChannelController.get(publicChannel._id)

    expect(channel!.name).toBe(PUBLIC_CHANNEL_NAME)
  })

  it('can post a new message to the channel and notify others', async () => {
    // setup connections
    const socketA = mock<SocketIO.Socket>()
    const socketB = mock<SocketIO.Socket>()

    UserConnections.addUserConnection(userA.id, socketA)
    UserConnections.addUserConnection(userB.id, socketB)

    // userA post a message to the public channel
    const publicChannel = await Channel.getPublicChannel()
    const content = 'here is a new message'
    const message = await ChannelController.appendMessage({
      content,
      senderId: userA._id,
      channelId: publicChannel._id,
    })

    expect(message.content).toBe(content)
    expect(message.sender._id).toEqual(userA._id)
    expect(message.channelId).toEqual(publicChannel._id)

    // verify that the message has been forwarded to others in the channel
    expect(socketB.emit).toHaveBeenCalledWith('new-message', message)
    expect(socketA.emit).not.toHaveBeenCalled()
  })

  afterAll(TestDatabase.close)
})
