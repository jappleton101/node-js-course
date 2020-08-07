const request = require('postman-request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=13be0ca7e295f9c216ace37622d6a6db&query='+lat+','+lon+'&units=f'
    
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather API!', undefined)
        } else if(body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, 'The temperature is ' + body.current.temperature + ' degrees farenheit.')
        }
    })
  }

module.exports = forecast

