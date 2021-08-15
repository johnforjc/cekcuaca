import html from "./cityItem.html";

class CityItem extends HTMLElement {
  constructor() {
    super();
  }

  set deleteEvent(event) {
    this._deleteEvent = event;
  }

  set result(result) {
    this._result = result;

    if (this._result.error) {
      this.renderError();
    } else {
      this.render();
    }
  }

  render() {
    this.innerHTML = `
      ${html}
    `;

    this.querySelector("#nama-kota").innerText = this._result.city.name;
    this.querySelector("#cuaca").innerText = this._result.cuaca;
    this.querySelector("#icon-cuaca").src = this._result.icon;
    this.querySelector("#temperature").innerText = this._result.suhu;
    this.querySelector("#kelembaban").innerText = this._result.kelembaban;
    this.querySelector("#delete-btn").dataset.city = this._result.city.name;

    this.querySelector("#delete-btn").addEventListener("click", this._deleteEvent);
    if (this._result.hour >= 6 && this._result.hour <= 18) {
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
