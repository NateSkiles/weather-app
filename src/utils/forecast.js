const dotenv = require('dotenv').config();
const request = require('request');
const moment = require('moment');

// Weatherstack API Key
const API_KEY = process.env.API_KEY_WS

const forecast = (lat, long, callback) => {
    // API Call
    const latLong = `${lat},${long}`
    const units = 'f'
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${latLong}&units=${units}`

    const options = {
        url,
        json: true
    }
    request(options, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service. 🙁');
        } else if (body.error) {
            callback('Unable to find location 🕵️‍♂️');
        } else {
            let { name, region } = body.location
            let { weather_descriptions: description, temperature, feelslike: feelsLike, localtime } = body.current

            let localTime = moment(localtime).format('LT')
            let conjunction

            if (Math.abs(temperature - feelsLike) > 8) {
                conjunction = 'but'
            } else {
                conjunction = 'and'
            }
            // `Currently in ${name}, ${region} the weather is ${description[0]} with a temperature of${temperature}℉ ${conjunction} feels like ${feelsLike}℉\nThe Local time is: ${localTime}`)
            
            callback(undefined, { name, region, description: description[0], temperature, conjunction, feelsLike, localTime })
        }
    })
}

module.exports = forecast