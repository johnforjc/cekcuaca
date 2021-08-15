import apiId from "../data/apiAccess";
import "./../component/cityItem.js";

function apiControll(city, element) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${apiId}`)
    .then((response) => response.json())
    .then((responseJson) => {
      let cuaca = responseJson.weather[0].main;
      let suhu = Math.round((responseJson.main.temp - 273) * 10) / 10;
      let kelembaban = responseJson.main.humidity;
      let icon = `http://openweathermap.org/img/wn/${responseJson.weather[0].icon}.png`;

      // ambil timezone lokasi dari api
      let timezone = responseJson.timezone / 3600;

      // ambil waktu lokal(komputer client) lalu ditambah dengan perbedaan waktunya
      let date = new Date();
      let timezoneDiff = date.getTimezoneOffset() / 60 + timezone;

      let hour = (date.getHours() + timezoneDiff) % 24;

      let objectResult = {
        city: city,
        error: false,
        cuaca: cuaca,
        suhu: suhu,
        kelembaban: kelembaban,
        icon: icon,
        hour: hour,
      };

      element.result = objectResult;
    })
    .catch((error) => {
      let objectResult = {
        error: true,
      };
      element.result = objectResult;
    });
}

export default apiControll;
