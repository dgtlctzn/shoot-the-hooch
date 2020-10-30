import axios from 'axios';
require('dotenv').config()

export default {
    getWeather: function(location) {
        return axios({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.API_KEY}`
        })
    }
}