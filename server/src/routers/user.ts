import { Router } from 'express'

import UserController from '../controllers/UserController'
import ROLES from '../utils/Roles'

export default Router()
  /**
   * Register
   */
  .post('/', async (request, response) => {
    const { username, password, role = ROLES.CITIZEN } = request.body

    try {
      const user = (
        await UserController.register(username, password, role)
      ).toObject()

      // hide password and __v manually
      delete user.password
      delete user.__v

      response.send(user)
    } catch ({ message }) {
      response.status(400).send({ message })
    }
  })
  /**
   * List all users with their online status
   */
  .get('/', async (_, response) => {
    const users = await UserController.listUsers()

    response.send(users)
  })
