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
      const subscriberExists = await Subscriber.findOne({ email: args.email })

      let error

      if (subscriberExists) {
        error = 'A subscriber with this email already exists'
      } else if (args.email.length === 0) {
        error = 'The email provided should not be empty'
      } else {
        const isValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(args.email)
        if (!isValid) {
          error = 'Provide a valid email'
        }
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

      return subscriber.save()
    },
  },
}
