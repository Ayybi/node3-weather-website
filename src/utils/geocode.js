const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/L'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXliaTEyOTgiLCJhIjoiY2t0ankwYmkxMDFpeDJ2bWo4dW96YmdiYSJ9.l5bPDv2kjjQPmRLpiwfC1w&limit=1'

    request({ url,json: true},(error, {body} )=> {
        if (error) {
            callback('Unable to connect to web services',undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location try another search',undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
             
        }
    })
}

module.exports = geocode