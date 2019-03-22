const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '468e82bc2524d7eeb56468996f8dc807';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error!, please try again'});
    } else {
      let weather = JSON.parse(body);
      console.log(weather);
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error!!, please try again'});
      } else {
        let weatherTextF = `It's ${weather.main.temp} degrees (Fahrenheit) in ${weather.name}!`;
        // var cel = (weather.main.temp-32)*5/9;
        // cel.toFixed(3);
        // console.log(cel);
        // let weatherTextC = `It's ${cel} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherTextF, error: null});
        // res.render('index', {weather: weatherTextC, error: null});
      }
    }
  });
})

app.listen(3000,'0.0.0.0', function () {
  console.log('Example app listening on port 3000!')
})