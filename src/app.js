// Node modules
const path = require('path')
// NPM modules
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
// Files
const getGeocode = require('../utils/getGeocode')
const getWeather = require('../utils/getWeather')
const app = express()
//Define Paths for Express Configuration

const htmlPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//Setup Handlebars and templates location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup Static directory to serve
app.use(express.static(htmlPath))
//Routes

// INDEX
app.get('', (req,res)=>{
    res.render('index', {
        title: 'Saharsh Shukla',

        name: 'Saharsh Shukla'
    })
})
// ABOUT
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About',
        name: 'Saharsh Shukla'
    })
})
// HELP
app.get('/help', (req,res)=>{
    res.render('help', {
        message: 'How can I help you?',
        title: 'Help',
        name: 'Saharsh Shukla'
    })
})
// Projects
app.get('/projects', (req,res)=>{
    res.render('projects', {
        title: 'Projects',
        name: 'Saharsh Shukla',
        message: 'A dash of Data science and a tiny sprinkle of MERN'
    })
})
//HELP ERROR
app.get('/help/*', (req,res)=>{
    res.render('404', {
        name: 'Saharsh Shukla',
        title: 'Error 404',
        errorMessage: 'Error Occurred - Help not found'
    })
})
//WEATHER
app.get('/weather', (req,res)=> {
    if (!req.query.location) {
        return res.send({
            error: 'Null Location Error: please send a valid location'
        })
    }
    getGeocode(req.query.location, (error, body)=>{
        getWeather(body,(error, {temperature, feelsLike, precipitation, currentTime} = {})=>{
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                temperature, feelsLike, precipitation, currentTime,
                location: body
            })
        })
    })

/*    res.send({
        location: req.query.location,
        forecast: "This is the forecast"
    })*/
})


// Error 404
app.get('*', (req,res)=> {
    res.render('404', {
        name: 'Saharsh Shukla',
        title: 'Error 404',
        errorOOPS: 'OOPS!, This page does not exist',
        contactMe: 'If this is a mistake please get in touch'
    })
})
app.listen(3000, ()=> {
    console.log("Server is Running on port 3000")
})

console.log(viewsPath)
console.log(path.join(__dirname, '../templates/partials'))