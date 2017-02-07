import Mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/graphQLGuide'

Mongoose.Promise = Promise

Mongoose.connect(MONGO_URL, {
  server: {
    auto_reconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  },
}, (err) => {
  if (err) throw err
})

Mongoose.connection.on('error', (e) => {
  if (e.message.code === 'ETIMEDOUT') {
    console.log(e)
    Mongoose.connect(MONGO_URL)
  }
  console.log(e)
})

Mongoose.connection.once('open', () => {
  console.log(`MongoDB successfully connected to ${MONGO_URL}`)
})

const SubscriberSchema = Mongoose.Schema({ // eslint-disable-line
  email: String,
  createdAt: Date,
  source: String,
}, {
  versionKey: false,
})

const Subscriber = Mongoose.model('subscribers', SubscriberSchema)

export default Subscriber
