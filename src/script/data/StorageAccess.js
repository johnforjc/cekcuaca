class StorageAccess {
  static checkingLocalStorage() {
    if (typeof Storage !== "undefined") {
      return true;
    } else {
      alert("Your Browser Not Supported");
      return false;
    }
  }

  static addCity(city) {
    let cityList = this.getCity();

    cityList.unshift(city);

    if (cityList.length > 6) {
      cityList.pop();
    }

    localStorage.setItem("cityList", JSON.stringify(cityList));
  }

  static getCity() {
    if (this.checkingLocalStorage()) {
      if (localStorage.getItem("cityList") !== null) return JSON.parse(localStorage.getItem("cityList"));
      else return [];
    }
  }

  static deleteCity(cityName) {
    let cityList = this.getCity();

    let newCityList = cityList.filter((city) => city.name != cityName);

    localStorage.setItem("cityList", JSON.stringify(newCityList));
  }
}

export default StorageAccess;
