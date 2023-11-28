import { Router } from 'express'

import UserController from '../controllers/UserController'

export default Router()
  /**
   * Login
   */
  .post('/', async (request, response) => {
    const { username, password } = request.body

    try {
      const result = await UserController.login(username, password)

      response.send(result)
    } catch ({ message }) {
      response.status(400).send({ message })
    }
  })
