const CONSTANTS = require('../data/CONSTANTS')
const requests = require('postman-request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const weatherConstants = CONSTANTS.weatherConstants

const getWeatherData = ({latitude, longitude} = {}, callback) => {
    let query = latitude + ',' + longitude
    const url = weatherConstants.baseurl + weatherConstants.api + '&query=' + (query) + '&units=m'
    console.log(url)
    requests({url: url, json: true}, (error, {body}={})=> {
        try {
            const data = {
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                precipitation: body.current.precip,
                currentTime: body.current.observation_time
            }
            callback(undefined, data)
        } catch (e) {
            let e2 = e.toString()
            if (error) {
                callback(error, undefined)
            } else if (body.error) {
                e2 = body.error
                callback(e2, undefined)
            }
        }
    })
}

module.exports = getWeatherData