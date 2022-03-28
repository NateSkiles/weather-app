const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Static Directory
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Nate Skiles'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nate Skiles'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Hey, listen!',
        title: 'Help',
        name: 'Nate Skiles'
    });
});

app.get('/weather', (req, res) => {
    geocode(req.query.address, (err, { latitude, longitude } = {}) => {
        if (err) {
            return res.send({ err });
        }

        forecast(latitude, longitude, (err, data) => {
            if (err) {
                return res.send({ err });
            }

            res.send({
                data
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found. 😢'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found 🔎'
    });
});

app.listen(port, () => {
    console.log(`Server port is up on port ${port}!`);
});

