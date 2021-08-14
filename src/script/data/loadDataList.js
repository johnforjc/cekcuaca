import $ from "jquery";
import "jquery-ui/ui/widgets/autocomplete";

const loadDataList = () => {
  fetch("https://raw.githubusercontent.com/yusufsyaifudin/wilayah-indonesia/master/data/list_of_area/regencies.json")
    .then((response) => response.json())
    .then((responseJson) => {
      let result = [];
      responseJson.forEach((res) => {
        let a = {
          label: res.name.toLowerCase(),
          value: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
        };
        result.push(a);
      });

      $("#brow").autocomplete({
        source: result,
      });

      $("#brow").on("autocompleteselect", function (event, ui) {
        event.preventDefault();
        $("#brow").val(ui.item.label);
        $("#brow").attr("data-latitude", ui.item.value.latitude);
        $("#brow").attr("data-longitude", ui.item.value.longitude);
      });
    });
};

export default loadDataList;
