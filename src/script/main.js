import loadDataList from "./data/loadDataList.js";
import StorageAccess from "./data/StorageAccess.js";
import "./component/cityList.js";

function main() {
  let searchBtn = document.getElementById("searchbtn");
  let cityListElement = document.querySelector("city-list");

  const deleteEvent = (e) => {
    StorageAccess.deleteCity(e.target.dataset.city);

    cityListElement.CityList = StorageAccess.getCity();
  };

  const refresh = () => {
    cityListElement.render();
  };

  searchBtn.addEventListener("click", () => {
    let inputElement = document.querySelector("#brow");

    if (inputElement.dataset.latitude == undefined) {
      alert("Tolong pilih daerah yang ada di bantuan. Terima kasih.");
      document.querySelector("#brow").value = "";
      return;
    }

    let inputName = inputElement.value;
    let inputLatitude = inputElement.dataset.latitude;
    let inputLongitude = inputElement.dataset.longitude;

    let cityDetail = {
      name: inputName,
      latitude: inputLatitude,
      longitude: inputLongitude,
    };

    StorageAccess.addCity(cityDetail);
    cityListElement.CityList = StorageAccess.getCity();

    document.querySelector("#brow").value = "";
    delete inputElement.dataset.latitude;
    delete inputElement.dataset.longitude;
  });

  loadDataList();
  cityListElement.deleteEvent = deleteEvent;
  cityListElement.CityList = StorageAccess.getCity();
  setInterval(refresh, 5000 * 60);
}

export default main;
