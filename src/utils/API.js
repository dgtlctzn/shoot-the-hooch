import axios from "axios";

const exclude = "minutely,daily,alerts";

// site = 02335815

export default {
  getWeather: function (latitude, longitude) {
    return axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`,
    });
  },
  getWaterLevel: function (site) {
    return axios({
      method: "GET",
      url: `https://waterservices.usgs.gov/nwis/iv?sites=${site}&period=P7D&format=json`
    })
  }
};
