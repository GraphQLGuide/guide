import Mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/graphQLGuide';

Mongoose.Promise = global.Promise;
Mongoose.connect(MONGO_URL);

const SubscriberSchema = Mongoose.Schema({ // eslint-disable-line
  email: String,
}, {
    versionKey: false
});

const Subscriber = Mongoose.model('subscribers', SubscriberSchema);

export { Subscriber };
