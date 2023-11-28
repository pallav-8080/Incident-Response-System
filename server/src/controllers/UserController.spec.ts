import { mock } from 'jest-mock-extended'
import SocketIO from 'socket.io'

import * as TestDatabase from '../utils/TestDatabase'
import UserController from './UserController'
import Channel from '../models/Channel'
import { IUser } from '../models/User'
import ROLES from '../utils/Roles'
import * as Token from '../utils/Token'
import UserConnections from '../utils/UserConnections'

describe('User controller', () => {
  beforeAll(TestDatabase.connect)

  const username = 'test-username-1'
  const password = 'super-secret-password'
  const role = ROLES.DISPATCH
  let newUser: IUser

  it('will register a new user', async () => {
    newUser = await UserController.register(username, password, role)
    const users = await UserController.listUsers()

    expect(users.length).toBe(1)
    expect(users[0]._id).toStrictEqual(newUser._id)
  })

  it('will not register two users with the same username', async () => {
    // @see https://jestjs.io/docs/en/asynchronous#promises
    expect.assertions(1)

    try {
      await UserController.register(username, password)
    } catch (e) {
      expect(e.message).toBe(`User "${username}" already exists`)
    }
  })

  it('will subscribe the new user to the public channel', async () => {
    const publicChannel = await Channel.getPublicChannel()
    const channelMembers = publicChannel.users as IUser[]

    expect(channelMembers.length).toBe(1)
    expect(channelMembers[0].id).toStrictEqual(newUser.id)
  })

  it('will allow an existing user to login', async () => {
    const credential = await UserController.login(username, password)

    expect(credential.token).toBeDefined()
    expect(Token.validate(newUser.id, credential.token)).toBeTruthy
    expect(credential._id).toBe(newUser.id)
    expect(credential.role).toBe(role)
  })

  it('will not allow an existing user to login if the password is incorrect', async () => {
    expect.assertions(1)

    try {
      await UserController.login(username, 'random-password')
    } catch (e) {
      expect(e.message).toBe(
        `User "${username}" does not exist or incorrect password`
      )
    }
  })

  it('will not allow a non-existing user to login', async () => {
    expect.assertions(1)

    try {
      await UserController.login('non-existing-user', 'random-password')
    } catch (e) {
      expect(e.message).toBe(
        'User "non-existing-user" does not exist or incorrect password'
      )
    }
  })

  it('will list users with their online/offline status', async () => {
    // connect the previous user
    const socket = mock<SocketIO.Socket>()
    UserConnections.addUserConnection(newUser.id, socket)

    // add another user
    const citizenName = 'new-citizen'
    const citizenPassword = 'citizen-password'
    const newCitizen = await UserController.register(
      citizenName,
      citizenPassword
    )
    let users = await UserController.listUsers()

    expect(users.length).toBe(2)
    expect(users).toContainEqual({
      _id: newUser._id,
      role: newUser.role,
      username: newUser.username,
      online: true,
    })
    expect(users).toContainEqual({
      _id: newCitizen._id,
      role: newCitizen.role,
      username: newCitizen.username,
      online: false,
    })

    // double check
    UserConnections.removeUserConnection(newUser.id)

    users = await UserController.listUsers()

    expect(users.length).toBe(2)
    expect(users).toContainEqual({
      _id: newUser._id,
      role: newUser.role,
      username: newUser.username,
      online: false,
    })
    expect(users).toContainEqual({
      _id: newCitizen._id,
      role: newCitizen.role,
      username: newCitizen.username,
      online: false,
    })
  })

  afterAll(TestDatabase.close)
})
