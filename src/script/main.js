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

  searchBtn.addEventListener("click", (e) => {
    let inputElement = document.querySelector("#brow");

    let inputValue = inputElement.value;

    StorageAccess.addCity(inputValue);
    cityListElement.CityList = StorageAccess.getCity();
  });

  loadDataList();
  cityListElement.deleteEvent = deleteEvent;
  cityListElement.CityList = StorageAccess.getCity();
}

export default main;
