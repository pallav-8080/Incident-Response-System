import { Router } from 'express'
import { Types } from 'mongoose'

import ChannelController from '../controllers/ChannelController'
import Channel from '../models/Channel'

export default Router()
  /**
   * Create a new channel
   */
  .post('/', async (request, response) => {
    const { name, users } = request.body as {
      name?: string
      users: string[]
    }
    try {
      const channel = await ChannelController.create({
        name,
        userIds: users.map(userId => Types.ObjectId(userId)),
      })

      response.send(channel)
    } catch ({ message }) {
      response.status(403).send({ message })
    }
  })
  /**
   * List channels
   */
  .get('/', async (request, response) => {
    const user = request.query['user'] as string | undefined
    const channels = await ChannelController.list(
      user ? Types.ObjectId(user) : undefined
    )

    response.send(channels)
  })
  .post('/public/messages', async (_, response) => {
    const publicChannel = await Channel.getPublicChannel()

    // @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308
    return response.redirect(308, `/api/channels/${publicChannel.id}/messages`)
  })
  /**
   * Append a new message into the channel
   */
  .post('/:id/messages', async (request, response) => {
    const senderId = Types.ObjectId(
      request.headers['x-application-uid'] as string
    )
    const { content } = request.body
    const channelId = Types.ObjectId(request.params.id)

    try {
      const message = await ChannelController.appendMessage({
        content,
        senderId,
        channelId,
      })

      response.send(message)
    } catch (message) {
      response.status(404).send({ message })
    }
  })
  .get('/public/messages', async (_, response) => {
    const publicChannel = await Channel.getPublicChannel()

    return response.redirect(`/api/channels/${publicChannel.id}/messages`)
  })
  /**
   * List messages in the channel
   */
  .get('/:id/messages', async (request, response) => {
    const { id: channelId } = request.params
    const channel = await ChannelController.get(Types.ObjectId(channelId))

    if (!channel) {
      return response
        .status(404)
        .send({ message: `Channel(${channelId}) not found.` })
    }

    return response.send(channel.messages)
  })
