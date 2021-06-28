const requests = require('postman-request')
const CONSTANTS = require('../data/CONSTANTS')
const geocodeConstants = CONSTANTS.geocodeConstants

const getGeocode = (address, callback) => {
    const url = geocodeConstants.baseurl + encodeURIComponent(address) + '.json?' + geocodeConstants.api + '&limit1'
    requests({url: url, json: true}, (error, {body}={}) => {
        try {
            const location = {
                coordinates: body.features[0].center,
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            }
            callback(undefined, location)
        } catch (e) {
            let e2 = e.toString()
            if (error) {
                e2 = 'OS Error: ' + error
                callback(e2, undefined)
            } else if (body.message) {
                callback(body.message, undefined)
            } else if (body.features) {
                e2 = "Invalid Query Error"
                callback(e2, undefined)
            }
        }
    })
}


module.exports = getGeocode