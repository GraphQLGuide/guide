import { createError } from 'apollo-errors'
import Subscriber from './connectors'

const DbError = createError('DbError', {
  message: 'An error occured when saving to the database',
})

export default {
  Query: {
    subscriber(root, args, context) {
      return Subscriber.findOne({ email: args.email })
    },
  },

  Mutation: {
    async subscribe(root, args, context) {
      let subscriberExists

      try {
        subscriberExists = await Subscriber.findOne({ email: args.email })
      } catch (err) {
        throw err
      }

      let error

      // validating email
      if (subscriberExists) {
        error = 'A subscriber with this email already exists'
      } else if (args.email.length === 0) {
        error = 'The email provided should not be empty'
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(args.email)) {
        error = 'Provide a valid email'
      }

      if (error) {
        throw new DbError({
          data: {
            reason: error,
          },
        })
      }

      const subscriber = new Subscriber({
        email: args.email,
        createdAt: new Date(),
        source: 'prelaunch-landing',
      })

      try {
        return await subscriber.save()
      } catch (err) {
        throw err
      }
    },
  },
}
