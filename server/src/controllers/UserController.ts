import * as Token from '../utils/Token'
import User, { IUser } from '../models/User'
import ROLES from '../utils/Roles'
import Channel from '../models/Channel'
import UserConnections from '../utils/UserConnections'

class UserController {
  async register(username: string, password: string, role = ROLES.CITIZEN) {
    let user = await User.findOne({ username }).exec()

    if (user) {
      throw new Error(`User "${username}" already exists`)
    } else {
      user = await new User({
        username,
        password,
        role,
      }).save()

      // subscribe to the public channel
      const publicChannel = await Channel.getPublicChannel()

      publicChannel.users.push(user._id)
      publicChannel.save()
    }

    // NOTE: password is still visible in the user instance.
    return user
  }

  async login(username: string, password: string) {
    const user = await User.findOne({ username })
      // @see https://stackoverflow.com/a/12096922
      .select('+password')
      .exec()

    if (user) {
      const isMatch = await user.comparePassword(password)

      if (isMatch) {
        return {
          token: Token.generate(user.id),
          _id: user.id,
          role: user.role,
        }
      }
    }

    throw new Error(`User "${username}" does not exist or incorrect password`)
  }

  /**
   * List all users with their online/office status
   */
  async listUsers() {
    const users = await User.find().exec()

    return users.map(user => ({
      ...(user.toJSON() as Pick<IUser, '_id' | 'username' | 'role'>),
      online: UserConnections.isUserConnected(user.id),
    }))
  }
}

export default new UserController()
