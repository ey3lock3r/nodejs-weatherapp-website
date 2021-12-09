const request = require('postman-request')

const geocode = (address, callback) => {
    geo_token = 'pk.eyJ1IjoiZXkzbG9jazNyIiwiYSI6ImNrd3hweHB5ZTBnNWoyb2xjY3ZoODdqdGwifQ.sQ9mvJTLf9p6D7Ww3Bk92w'
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?limit=1&access_token=' + geo_token

    request({url, json: true}, (error, resp, {features} = {}) => {
        if (error) {
            callback('Error! Unable to connect to location services!')

        } else {
            if (!features) {
                callback('Error! Location not found!')

            } else if (features.length === 0) {
                callback('Error! Location not found!')

            } else {
                const {center, place_name} = features[0]
                callback(undefined, {
                    long: center[0],
                    lat: center[1],
                    loc: place_name
                })
            }
        }
    })
}

module.exports = geocode