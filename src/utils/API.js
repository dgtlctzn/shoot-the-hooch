import axios from 'axios';

const API_KEY = "f2f448fdff7880f3d298bdf08e187544"

export default {
    getWeather: function(location) {
        // console.log(process.env.API_KEY)
        return axios({
            method: "GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`
        })
    }
}