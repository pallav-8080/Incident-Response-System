import { Router } from 'express'

import user from './user'
import login from './login'
import channel from './channel'

export default Router()
  .use('/users', user)
  .use('/login', login)
  .use('/channels', channel)
