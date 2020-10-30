import axios from 'axios';

export default {
    getWeather: function(location) {
        return axios({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.REACT_APP_API_KEY}`
        })
    }
}