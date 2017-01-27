import { Subscriber } from './connectors';

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

      if (subscriberExists) {
        throw new Error(`A subscriber with this email already exists`);
      }

      const subscriber = new Subscriber({
        email: args.email
      });

      try {
        return await subscriber.save();
      } catch (err) {
        throw err;
      }
    }
  }
}
