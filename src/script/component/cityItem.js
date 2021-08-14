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

        // ambil timezone lokasi dari api
        this._timezone = responseJson.timezone / 3600;

        // ambil waktu lokal(komputer client) lalu ditambah dengan perbedaan waktunya
        this._date = new Date();
        this._timezoneDiff = this._date.getTimezoneOffset() / 60 + this._timezone;

        this._hour = (this._date.getHours() + this._timezoneDiff) % 24;

        this.render();
      })
      .catch((error) => this.renderError());
  }

  render() {
    this.innerHTML = `
      <div class="info-header">
        <h2>${this._city.name}</h2>
        <div class="delete-btn" id="delete-btn" data-city="${this._city.name}">X</div>
      </div>

      <div class="info-body">
        <img class="icon-cuaca" src="${this._icon}" />
        <h3 class="info-cuaca">${this._cuaca}</h3>
        <div class="detail-info-box">
          <div class="detail-info">
            <div class="info-title">
              Temperature
            </div>
            <div class="info-context">
              ${this._suhu}
            </div>
          </div>
          <div class="detail-info">
            <div class="info-title">
              Kelembaban
            </div>
            <div class="info-context">
              ${this._kelembaban}
            </div>
          </div>
        </div>
      </div>
    `;

    this.querySelector("#delete-btn").addEventListener("click", this._deleteEvent);
    if (this._hour >= 6 && this._hour <= 18) {
      this.classList.add("siang");
    } else {
      this.classList.add("malam");
    }
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
