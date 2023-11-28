import mongoose from 'mongoose'

import * as Database from './Database'

export const connect = async () => {
  // ensure that a brand new database is used each time
  // in case the previous database may not be properly dropped on some machines
  const time = new Date().getTime().toString().slice(8,14)
  const random = Math.round(Math.random() * 100000)
  const testDBURL = `mongodb://localhost:27017/incident-response-test-${time}-${random}`

  await Database.connect(testDBURL)
}

export const close = async () => {
  await mongoose.connection.db.dropDatabase()
  await Database.close()
}
