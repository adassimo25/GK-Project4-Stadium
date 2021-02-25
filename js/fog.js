
var slider = document.getElementById("fogRange");
var fogEnabled = document.getElementById("fogEnabled");
var output = document.getElementById("fogDensity");

var fogDensity = slider.value / 100000;
output.setAttribute("value", fogDensity);

slider.oninput = function () {
    fogDensity = slider.value / 100000;
    output.value = fogDensity;
}