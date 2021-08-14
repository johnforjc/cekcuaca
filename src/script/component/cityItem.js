import apiId from "../data/apiAccess";

class CityItem extends HTMLElement {
  constructor() {
    super();
  }

  set deleteEvent(event) {
    this._deleteEvent = event;
  }

  set city(city) {
    this._city = city;

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this._city.latitude}&lon=${this._city.longitude}&appid=${apiId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this._cuaca = responseJson.weather[0].main;
        this._suhu = Math.round((responseJson.main.temp - 273) * 10) / 10;
        this._kelembaban = responseJson.main.humidity;
        this._icon = `http://openweathermap.org/img/wn/${responseJson.weather[0].icon}.png`;

        this.render();
      })
      .catch((error) => this.renderError());
  }

  render() {
    this.innerHTML = `
      <h2>${this._city.name}</h2>
      <div class="delete-btn" id="delete-btn" data-city="${this._city.name}">X</div>
      <img src="${this._icon}" />
      <h3>${this._cuaca}</h3>
      <h3>${this._suhu}</h3>
      <h3>${this._kelembaban}</h3>
    `;

    this.querySelector("#delete-btn").addEventListener("click", this._deleteEvent);
  }

  renderError() {
    this.innerHTML = `
      <h2>${this._city}</h2>
      <div class="delete-btn" id="delete-btn" data-city="${this._city.name}">X</div>
      <h3>Maaf daerah ini tidak terdaftar pada database <a href="https://openweathermap.org/" target="_blank">Open Weather</a></h3>
    `;

    this.querySelector("#delete-btn").addEventListener("click", this._deleteEvent);
  }
}

customElements.define("city-item", CityItem);
