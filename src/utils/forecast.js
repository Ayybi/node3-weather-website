const request = require('request')
const forecast = (latitude,longitude,callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=564865512a8a28e142dec96c8026f35c&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)

        request({url,json: true},(error,{body}) =>{
            if(error){
                callback('The weather app is unable to connect', undefined)
            }else if(body.error){
                 callback('Enter the correct location', undefined)
            }
            else{
                callback(undefined,{
                   weather_description: body.current.weather_descriptions[0],
                   temperature: body.current.temperature,
                   feelslike: body.current.feelslike
                })
            }
        })
}

module.exports = forecast