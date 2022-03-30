const dotenv = require('dotenv').config();
const request = require('request');

// Mapbox token
const API_KEY = process.env.API_KEY_MB

/** Query mapbox API to by passing a search location and returning lat and long
 * 
 * @param {*} location Search location 
 * @param {*} callback Handle response from API call
 */
const geocode = (location, callback) => {
    // Encode to address to URI
    const query = encodeURIComponent(location)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=1&access_token=${API_KEY}`
    const options = {
        url,
        json: true
    }

    request(options, (err, { body }) => {
        const data = body.features
        if (err || !data) {
            callback('Unable to connect to location service. 🙁', undefined)
        } else if (data.length === 0) {
            callback('No locations found, try searching for a new location.', undefined)
        } else {
            callback(undefined, {
                longitude: data[0].center[0],
                latitude: data[0].center[1]
            })
        }
    })
}

module.exports = geocode