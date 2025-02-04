// public/form-handler.js
document.getElementById("form").addEventListener("submit", function (e) {
    const selectElement = document.getElementById("city-select");
    const selectedCityName =
        selectElement.options[selectElement.selectedIndex].text;
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "cityName";
    hiddenInput.value = selectedCityName;
    this.appendChild(hiddenInput);
});
