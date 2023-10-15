const request = require('postman-request')

// mai kakahn sirji namashkar
const temperature = (lattitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2eb04cc20b40aa64e12e639a000ceb63&query=' + lattitude + ',' + longitude ;
    request({url : url , json : true}, (error,response) =>{
        if(error)
        {
            callback('Please check your internet connection')
        }else if(response.body.success === false)
        {
            callback('Please choose a better location')
        }
        else
        {
            callback(undefined,{
                temp : response.body.current.temperature,
                feelslike : response.body.current.feelslike,
                humidity : response.body.current.humidity
            })
        }
    })
}
module.exports = temperature
