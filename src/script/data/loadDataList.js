import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";

const loadDataList = () => {
  fetch("https://raw.githubusercontent.com/mtegarsantosa/json-nama-daerah-indonesia/master/regions.json")
    .then((response) => response.json())
    .then((responseJson) => {
      let options = [];
      responseJson.forEach((location) =>
        location.kota.forEach((kota) => {
          options.push(kota);
        })
      );
      $("#brow").autocomplete({
        source: options,
      });
    });
};

export default loadDataList;
