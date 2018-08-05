import find from 'lodash/find'

const packages = [
  {
    basic: true,
    key: 'basic',
    name: 'Basic',
    price: 39
  },
  {
    pro: true,
    key: 'pro',
    name: 'Pro',
    price: 89
  },
  {
    full: true,
    key: 'full',
    name: 'Full edition',
    price: 289,
    includesTshirt: true,
    includesSlackAccess: true
  },
  {
    training: true,
    key: 'training',
    name: 'Training',
    price: 749,
    includesTshirt: true,
    includesSlackAccess: true
  },
  {
    team: true,
    key: 'team',
    name: 'Team license',
    price: 1000,
    includesTshirt: true,
    includesSlackAccess: true
  }
]

// `which` is either:
//   'team'
//   { team: true, full: false}
export const getPackage = which => {
  if (typeof which === 'object') {
    for (const prop in which) {
      if (which[prop]) {
        return find(packages, [prop, true]) || {}
      }
    }
    return {}
  } else {
    const name = which.toLowerCase()
    return find(packages, [name, true]) || {}
  }
}

export const BASE_LICENSES = 5

export const formatTeamName = licenses => `Team license—${licenses} seats`

export const calculateTeamPrice = licenses =>
  getPackage('team').price * (licenses / BASE_LICENSES)

export default packages
