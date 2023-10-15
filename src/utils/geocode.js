const request = require('postman-request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicGF1cnVzaGJhdGlzaCIsImEiOiJja2Nzcmo5NXAxcTBhMnlvMnlkYm40aDUyIn0.doTV1Zh05KwH0kDE0cpNoA'
    request({url : url, json : true}, (error,response) => {
        if(error)
        {
            // aji sunte ho
            callback('Please check your connectivity')
        }else if(response.body.features.length === 0)
        {
            callback('Sorry, the address is not valid. Please try with a different keyword')
        }else
        {
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
