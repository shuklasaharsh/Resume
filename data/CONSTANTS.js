const api = 'd0cf7eb36f9816c1f844fa52f738970a'//insert api key here
const urlWeather = 'http://api.weatherstack.com/current?access_key=d0cf7eb36f9816c1f844fa52f738970a&query=37.8267,-122.4233&units=m' //
const urlGeocoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2h1a2xhc2FoYXJzaCIsImEiOiJja3EyZHYwMzcwMmtqMm5vNnBuZHlhand4In0.vDk328o-nkbMbgXZP5nwVA&limit=1'
const Account = {
    user: 'shukla.saharsh7.work@gmail.com',
    pass: 'DeltaS>0'
}

const geocodeConstants = {
    baseurl: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
    api: 'access_token=pk.eyJ1Ijoic2h1a2xhc2FoYXJzaCIsImEiOiJja3EyZHYwMzcwMmtqMm5vNnBuZHlhand4In0.vDk328o-nkbMbgXZP5nwVA',
    format: {
        example_url:urlGeocoding,
        break_format: "Protocol://api.mapbox.com/#ServicenName#/v5/#ServiceType#/#LocationName.json?access_token=#API#"
    }
}
const weatherConstants = {
    baseurl: 'http://api.weatherstack.com/current',
    api: '?access_key=d0cf7eb36f9816c1f844fa52f738970a',
    format: {
        example_url: urlWeather,
        break_format: "Protocol://api.weatherstack.com/#Service#?access_key=#API#&query=#Query#"
    }
}
module.exports = {
    api,
    urlWeather,
    urlGeocoding,
    geocodeConstants,
    weatherConstants,
    Account
}
