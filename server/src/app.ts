import path from 'path'
import express from 'express'
import bodyParser from 'body-parser'

import router from './routers'

export default express()
  .use(bodyParser.json())
  .use('/api', router)
  .use(
    express.static(path.join(__dirname, '..', '..', 'client', 'build'), {
      fallthrough: true,
    })
  )
  // Fix static file serving in FireFox.
  .use(
    '*',
    express.static(
      path.join(__dirname, '..', '..', 'client', 'build', 'index.html')
    )
  )
