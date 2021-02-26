const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?access_token='+
    'pk.eyJ1Ijoicmlua3UxMjMiLCJhIjoiY2tsaG8weXJiMWFhYjJ1cHIzcG4zbW5zZyJ9._sediHf49dBXw2jG3JsZpQ'

    request({url : url, json : true},(error, response) =>{
        if(error){
            callback('unable to connect location service!', undefined)
        }else if( response.body.features.length === 0){
            callback('unable to find location! Try another search', undefined)
        } else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name 
            })
        }
    })
}
module.exports = geocode