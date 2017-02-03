import { createError } from 'apollo-errors'
import { Subscriber } from './connectors';

const DbError = createError('DbError', {
  message: 'An error occured when saving to the database',
});

export default {
  Query: {
    subscriber(root, args, context) {
      return Subscriber.findOne({ email: args.email });
    },
    allSubscribers(root, args, context) {
      return Subscriber.find();
    }
  },

  Mutation: {
    async subscribe(root, args, context) {
      let subscriberExists;

      try {
        subscriberExists = await Subscriber.findOne({ email: args.email });
      }
      catch (err) {
        throw err;
      }

      // validating email
      if (subscriberExists) {
        throw new DbError({
          data: {
            reason: 'A subscriber with this email already exists',
          },
        });
      } else if (args.email.length === 0) {
        throw new DbError({
          data: {
            reason: 'The email provided should not be empty',
          },
        });
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(args.email)) {
        throw new DbError({
          data: {
            reason: 'Provide a valid email',
          },
        });
      }

      const subscriber = new Subscriber({
        email: args.email,
      });

      try {
        return await subscriber.save();
      } catch (err) {
        throw err;
      }
    }
  }
}
