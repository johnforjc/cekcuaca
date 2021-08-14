import loadDataList from "./data/loadDataList.js";
import StorageAccess from "./data/StorageAccess.js";
import "./component/cityList.js";

function main() {
  let searchBtn = document.getElementById("searchbtn");

  searchBtn.addEventListener("click", (e) => {
    let inputElement = document.querySelector("#brow");

    let inputValue = inputElement.value;

    StorageAccess.addCity(inputValue);
    StorageAccess.deleteCity("Kota Sabang");
  });

  loadDataList();
}

export default main;
