const request = require('postman-request')

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiamFwcGxldG9uMTAxIiwiYSI6ImNrY2U1NXJtOTAzemIyenBiOGtkM2JsejMifQ.tRtcXxM39mpqPM-SHRCkJQ&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('No internet connection!', undefined)
        } else if(body.features.length === 0){ 
            callback('No results found. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode