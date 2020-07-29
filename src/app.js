const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const temperature = require('./utils/temperature')
const port = process.env.PORT || 3000
 
// paths
const publicdirectorypath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,"../templates/views")
const partialspath = path.join(__dirname,"../templates/partials")


const page = express()
// set up handlebar engine , views location
page.set('view engine','hbs')
page.set('views',viewpath)
hbs.registerPartials(partialspath)
// static DIRECTORY to serve 
page.use(express.static(publicdirectorypath))


///request to be send

page.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            Error : "Must provide a search first"
        })
    }
    res.send({
        your_randi_name : req.query.search
    })

})

// page.get('/weather',(req,res)=>{
//     res.render('weather')
// })

page.get("/Weather-forecast", (req,res)=>{
    res.render('Weather-forecast')
})


page.get('/weather' , (req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error : "Please give a particular address"
        })

    }
    geocode(req.query.address , (error, {latitude , longitude , location} = {} )=>{
        if(error)
        {
            return res.send({
                error
            })
        }

        temperature(latitude,longitude,(error,{temp,feelslike,humidity} = {} )=>{
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                temp,feelslike, humidity
            })

        })
    })
})



page.get('',(req,res) =>{
    res.render('index',{
        title: 'weather',
        name : 'Paurush'
    })
})
page.get('/about',(req,res)=>{
    res.render('about')
})
page.get('/contact',(req,res)=>{
    res.render('contact')
})
// page.get('',(req,res)=>{

//     res.send()
// })
page.get('/home',(req,res)=>{
    res.send('This is your homepage')
})
page.get('*',(req,res)=>{
    res.render('404-error')
})

page.listen(port,()=>{
    console.log('Started')
})