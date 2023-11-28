import mongoose from 'mongoose'

// @see https://stackoverflow.com/a/27540516
// NOTE: Enforce mongoose to create dependent collections in the testing environment.
import '../models/User'
import '../models/Message'
import '../models/Channel'

export const connect = async (
  // url = 'mongodb://localhost:27017/incident-response'
  url = 'mongodb+srv://root:root@cluster0.cunonhp.mongodb.net/?retryWrites=true&w=majority'

) => {
  await mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
}

export const close = async () => {
  mongoose.connection.close()
}
