// Node modules
const path = require('path')
// NPM modules
const express = require('express')
const hbs = require('hbs')
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
app.get('/weather', (req,res)=>{
    const body = {
        forecast: 'Something',
        location: 'Something2'
    }
    res.send(body)
})
// INDEX
app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather app',

        name: 'Saharsh Shukla'
    })
})
// ABOUT
app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Saharsh Shukla'
    })
})
// HELP
app.get('/help', (req,res)=>{
    res.render('help', {
        message: 'How can we help you?',
        title: 'Help',
        name: 'Saharsh Shukla'
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        name: 'Saharsh Shukla',
        title: 'Error 404',
        errorMessage: 'Error Occurred - Help not found'
    })
})

// Error 404
app.get('*', (req,res)=> {
    res.render('404', {
        name: 'Saharsh Shukla',
        title: 'Error 404',
        errorMessage: 'Error occurred'
    })
})
app.listen(3000, ()=> {
    console.log("Server is Running on port 3000")
})

console.log(viewsPath)
console.log(path.join(__dirname, '../templates/partials'))