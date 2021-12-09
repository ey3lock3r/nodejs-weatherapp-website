const request = require('postman-request')

const forecast = (long, lat, callback) => {
    coords = lat + ',' + long
    const url = 'http://api.weatherstack.com/current?access_key=4263d5a63794b453a554e17732854df4&query=' + coords + '&units=m'

    request({url, json: true}, (err, resp, {error, success, current} = {}) => {
        if (err) {
            callback('Error! Unable to connect to weather service!')

        } else if (success === false) {
            const {type, info} = error
            callback('Error! ' + type + '! ' + info)
        }
        else {
            const {temperature, feelslike, weather_descriptions} = current
            text = weather_descriptions[0] + '. It is currently ' + temperature + ' degrees out. It feels like ' + feelslike + ' degress out.'
            callback(undefined, text)
        }
    })
}

module.exports = forecast