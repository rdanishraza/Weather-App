const request = require('request')

const forcast = (lattitue, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=881faa9222dbcc7f1c8820f379236c73&query='+lattitue+','+longitude

    request({url: url, json: true},(error, response) =>{
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(response.body.error){
            callback('unable to find location', undefined)
        }else{
            callback(undefined,"it is currently " + response.body.current.temperature + " degrees out." + "there is "+ response.body.current.precip+"% chance of rain")
        }
    })
}

module.exports = forcast