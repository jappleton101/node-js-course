const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '..','/public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..','/public')
const viewsPath = path.join(__dirname, '..','/templates/views')
const partialsPath = path.join(__dirname, '..','/templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'James Appleton'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'James Appleton'
    })
 })

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Get yourself some help',
        name: 'James Appleton',
        title: 'Help Page'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a location!'
        })
    }

    const location = req.query.address
    
    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error: error
                })
            }
            return res.send({
                location: location,
                currentWeather: forecastData,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help page not found.',
        name: 'James Appleton',
        title: '404 Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Page not found.',
        name: 'James Appleton',
        title: '404 Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})