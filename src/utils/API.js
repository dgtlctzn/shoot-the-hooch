import axios from "axios";

const exclude = "minutely,daily,alerts";

export default {
  getWeather: function (latitude, longitude) {
    return axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`,
    });
  },
};
