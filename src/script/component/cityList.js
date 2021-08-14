import "./cityItem.js";

class CityList extends HTMLElement {
  constructor() {
    super();
  }

  set deleteEvent(event) {
    this._deleteEvent = event;
  }

  set CityList(citylist) {
    this._CityList = [];
    this._CityList = citylist;
    this.render();
  }

  render() {
    this.innerHTML = "";
    this._CityList.forEach((city) => {
      const cityItem = document.createElement("city-item");

      cityItem.deleteEvent = this._deleteEvent;
      cityItem.city = city;
      this.appendChild(cityItem);
    });
  }
}

customElements.define("city-list", CityList);
