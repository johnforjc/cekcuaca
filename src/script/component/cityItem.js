class CityItem extends HTMLElement {
  constructor() {
    super();
  }

  set deleteEvent(event) {
    this._deleteEvent = event;
  }

  // deleteEvent()
  // {
  //   console.log("deleted");
  // }

  set city(cityname) {
    this._city = cityname;
    this.render();
  }

  render() {
    this.innerHTML = `<h2>${this._city}</h2> <div class="delete-btn" id="delete-btn" data-city="${this._city}">X</div>`;

    this.querySelector("#delete-btn").addEventListener("click", this._deleteEvent);
  }
}

customElements.define("city-item", CityItem);
