import apiId from "../data/apiAccess";

class CityItem extends HTMLElement {
  constructor() {
    super();
  }

  set deleteEvent(event) {
    this._deleteEvent = event;
  }

  set city(cityname) {
    this._city = cityname;

    let cityQuery = cityname.slice(5);
    console.log(cityQuery);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityQuery},id&appid=${apiId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.main.humidity);
        this._cuaca = responseJson.weather[0].main;
        this._suhu = Math.round((responseJson.main.temp - 273) * 10) / 10;
        this._kelembaban = responseJson.main.humidity;
        this._icon = `http://openweathermap.org/img/wn/${responseJson.weather[0].icon}.png`;

        this.render();
      });
  }

  render() {
    this.innerHTML = `
      <h2>${this._city}</h2>
      <div class="delete-btn" id="delete-btn" data-city="${this._city}">X</div>
      <img src="${this._icon}" />
      <h3>${this._cuaca}</h3>
      <h3>${this._suhu}</h3>
      <h3>${this._kelembaban}</h3>
    `;

    this.querySelector("#delete-btn").addEventListener("click", this._deleteEvent);
  }
}

customElements.define("city-item", CityItem);
