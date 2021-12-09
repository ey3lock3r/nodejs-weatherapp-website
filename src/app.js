const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dhinson Dacpano'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dhinson Dacpano'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'What can I do for you today?',
        name: 'Dhinson Dacpano'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {long, lat, loc} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(long, lat, (error2, fdata) => {
            if (error2) {
                return res.send({
                    error: error2
                })
            } 
            
            console.log(long, lat, loc)
            console.log(fdata)
            res.send({
                forecast: fdata,
                location: loc,
                name: 'Dhinson Dacpano'
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
    // res.render('weather', {
    //     forecast: 'It is snowing',
    //     location: 'Albay, Philippines',
    //     name: 'Dhinson Dacpano'
    // })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'My 404 Page',
        name: 'Dhinson Dacpano',
        error: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'My 404 Page',
        name: 'Dhinson Dacpano',
        error: 'Page not found!'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

