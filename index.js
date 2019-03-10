const request = require('request');
const argv = require('yargs').argv;

let apiKey = '468e82bc2524d7eeb56468996f8dc807';
let city = argv.c || 'delhi';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
	// console.log(body);// var cel = (${weather.main.temp}-32)*5/9;
	let weather = JSON.parse(body);
	console.log(weather);
	let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
	console.log(message);
  }
});