import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import IconButton from '@material-ui/core/IconButton'
import MyLocation from '@material-ui/icons/MyLocation'

const kelvinToCelsius = kelvin => Math.round(kelvin - 273.15)
const kelvinToFahrenheit = kelvin =>
  Math.round((kelvin - 273.15) * (9 / 5) + 32)

class CurrentTemperature extends Component {
  state = {
    lat: null,
    lon: null,
    gettingPosition: false,
    displayInCelsius: true
  }

  requestLocation = () => {
    this.setState({ gettingPosition: true })
    window.navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        this.setState({ lat: latitude, lon: longitude, gettingPosition: false })
      }
    )
  }

  toggleDisplayFormat = () => {
    this.setState({
      displayInCelsius: !this.state.displayInCelsius
    })
  }

  render() {
    const dontHaveLocationYet = !this.state.lat

    return (
      <div className="Weather">
        <Query
          query={TEMPERATURE_QUERY}
          skip={dontHaveLocationYet}
          variables={{ lat: this.state.lat, lon: this.state.lon }}
        >
          {({ data, loading }) => {
            if (loading || this.state.gettingPosition) {
              return <div className="Spinner" />
            }

            if (dontHaveLocationYet) {
              return (
                <IconButton
                  className="Weather-get-location"
                  onClick={this.requestLocation}
                  color="inherit"
                >
                  <MyLocation />
                </IconButton>
              )
            }

            const kelvin = data.weather.main.temp
            const formattedTemp = this.state.displayInCelsius
              ? `${kelvinToCelsius(kelvin)} °C`
              : `${kelvinToFahrenheit(kelvin)} °F`

            return (
              <IconButton onClick={this.toggleDisplayFormat}>
                {formattedTemp}
              </IconButton>
            )
          }}
        </Query>
      </div>
    )
  }
}

const TEMPERATURE_QUERY = gql`
  query TemperatureQuery {
    weather(lat: $lat, lon: $lon)
      @rest(
        type: "WeatherReport"
        path: "weather?appid=4fb00091f111862bed77432aead33d04&{args}"
      ) {
      main
    }
  }
`

export default CurrentTemperature
