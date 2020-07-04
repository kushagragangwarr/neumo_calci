var calci = document.getElementById("calci-container");
var screen = document.getElementById("screen");
var button_c = document.getElementById("button-c");
var back = document.getElementById("back");
var divide = document.getElementById("button-divide");
var multiply = document.getElementById("button-multiply");
var plus = document.getElementById("button-plus");
var minus = document.getElementById("button-minus");
var equals = document.getElementById("button-equals");
var bulb = document.getElementById("button-bulb");
console.log(button_c.innerText, back.innerText, divide.innerText, multiply.innerText, plus.innerText, minus.innerText, equals.innerText);

bulb.addEventListener("click", function() {
    if (calci.classList.contains("button-bulb-click-black")) {
        bulb.src = "./images/idea-48-black.png";
        calci.classList.remove("button-bulb-click-black");
        calci.classList.add("button-bulb-click-white");
    } else {
        bulb.src = "./images/idea-48.png";
        calci.classList.remove("button-bulb-click-white");
        calci.classList.add("button-bulb-click-black");
    }
});
button_c.addEventListener("click", function() {
    screen.style.textAlign = "right";
    screen.innerText = "0";
});