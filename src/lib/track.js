import ReactGA from 'react-ga'
import find from 'lodash/find'
import defer from 'lodash/defer'

const EVENTS = [
  {
    name: 'purchase',
    category: 'User'
  }
]

const track = (name, data) => {
  defer(() => {
    const event = find(EVENTS, { name })
    if (!event) {
      throw new Error('unknown event type—add it to track.js')
    }

    ReactGA.event({
      category: event.category,
      action: name,
      ...(data.package && { label: data.package })
    })
    window.heap.track(name, data)
  })
}

export default track
