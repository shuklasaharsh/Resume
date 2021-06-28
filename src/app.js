// Node modules
const path = require('path')
// NPM modules
const express = require('express')
const hbs = require('hbs')
// Files
const getGeocode = require('../utils/getGeocode')
const getWeather = require('../utils/getWeather')
const mailUtilities = require('../utils/mailUtilities')
const app = express()
const port = process.env.PORT || 3000
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
        message: 'A dash of Data science and a tiny sprinkle of MERN',
        projectLink1: 'https://github.com/shuklasaharsh/Oil-Price-Analysis-Data',
        projectLink2: 'https://github.com/shuklasaharsh/IOT_Temperatur_ESP8266',
        projectLink3: 'https://github.com/shuklasaharsh/Vaccine-Notification',
        projectLink4: 'https://github.com/shuklasaharsh/Brain-Tumor-Detection/',
        projectLink5: 'https://github.com/shuklasaharsh/Error-Handling',
        projectLink6: 'https://github.com/shuklasaharsh/web-server',
        projectLink7: 'https://github.com/shuklasaharsh/LSTM-NN-TSP',
        projectLink8: 'https://github.com/shuklasaharsh/RNN-TSP',
        projectLink9: 'https://github.com/shuklasaharsh/Stock-Market',
        projectLink10: 'https://github.com/shuklasaharsh/tensor-emoji-python',
        projectLink11: 'https://github.com/shuklasaharsh/DSP2',
        projectLink12: 'https://github.com/shuklasaharsh/Leaf-Classifier'
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

//MAIL
app.get('/help/mail', (req,res)=>{
    if (!req.query.mailString) {
        return res.send({
            error: 'Null Help Error'
        })
    }
    const sendTo = 'saharsh.shukla2018@vitstudent.ac.in'
    mailUtilities.sendMailTo(sendTo,req.query.mailString,req.query.mailSubject, (info)=>{
        res.send(info)
    })
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

app.get('*/*', (req,res)=> {
    res.render('404', {
        name: 'Saharsh Shukla',
        title: 'Error 404',
        errorOOPS: 'OOPS!, This page does not exist',
        contactMe: 'If this is a mistake please get in touch'
    })
})
app.listen(port, ()=> {
    console.log("Server is Running on port " + port)
})
