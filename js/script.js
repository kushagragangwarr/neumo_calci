// Variables initialization and declarations

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

// GLOBAL variables

SUM = 0;
SUB = 0;
MUL = 0;
DIV = 0;
TOTAL = 0;
KEYPRESS = "";
LIST_OF_KEYS = [];

// Function declaration starts

function getTotal() {
    if (KEYPRESS.length > 0 && KEYPRESS !== "0")
        LIST_OF_KEYS.push(parseInt(KEYPRESS));
    if (isNaN(LIST_OF_KEYS[LIST_OF_KEYS.length - 1]) && LIST_OF_KEYS.length !== 0) {
        alert("You are supposed to enter a number after an arithemtic sign.");
        return;
    }
    KEYPRESS = "";
    console.log(LIST_OF_KEYS);
    while (LIST_OF_KEYS.length !== 1) {
        if (LIST_OF_KEYS.indexOf("/") > -1) {
            console.log("DIVIDING");
            TOTAL = LIST_OF_KEYS[LIST_OF_KEYS.indexOf("/") - 1] / LIST_OF_KEYS[LIST_OF_KEYS.indexOf("/") + 1];
            LIST_OF_KEYS.splice(LIST_OF_KEYS.indexOf("/") - 1, 3, TOTAL);
        } else if (LIST_OF_KEYS.indexOf("*") > -1) {
            console.log("MULTIPLYING");
            TOTAL = LIST_OF_KEYS[LIST_OF_KEYS.indexOf("*") - 1] * LIST_OF_KEYS[LIST_OF_KEYS.indexOf("*") + 1];
            LIST_OF_KEYS.splice(LIST_OF_KEYS.indexOf("*") - 1, 3, TOTAL);
        } else if (LIST_OF_KEYS.indexOf("+") > -1) {
            console.log("ADDING");
            TOTAL = LIST_OF_KEYS[LIST_OF_KEYS.indexOf("+") - 1] + LIST_OF_KEYS[LIST_OF_KEYS.indexOf("+") + 1];
            LIST_OF_KEYS.splice(LIST_OF_KEYS.indexOf("+") - 1, 3, TOTAL);
        } else if (LIST_OF_KEYS.indexOf("-") > -1) {
            console.log("SUBTRACTING");
            TOTAL = LIST_OF_KEYS[LIST_OF_KEYS.indexOf("-") - 1] - LIST_OF_KEYS[LIST_OF_KEYS.indexOf("-") + 1];
            LIST_OF_KEYS.splice(LIST_OF_KEYS.indexOf("-") - 1, 3, TOTAL);
        }
    }
    displayOnScreen(TOTAL);
    console.log(LIST_OF_KEYS);
}

function arithmetics() {
    if (KEYPRESS.length > 0 && KEYPRESS !== "0")
        LIST_OF_KEYS.push(parseInt(KEYPRESS));
    // if (LIST_OF_KEYS.length === 0)
    //     return;

    if (!isNaN(LIST_OF_KEYS[LIST_OF_KEYS.length - 1])) {
        if (this.innerText == '+') {
            LIST_OF_KEYS.push('+');
        } else if (this.innerText == '-') {
            LIST_OF_KEYS.push('-');
        } else if (this.innerText == 'X') {
            LIST_OF_KEYS.push('*');
        } else {
            LIST_OF_KEYS.push('/');
        }
    } else {
        LIST_OF_KEYS.pop();
        if (this.innerText == 'X')
            LIST_OF_KEYS.push('*');
        else
            LIST_OF_KEYS.push(this.innerText);
    }
    KEYPRESS = "";
    displayOnScreen(LIST_OF_KEYS[LIST_OF_KEYS.length - 1]);
}

function displayOnScreen(key) {
    screen.innerText = key;
}

// function for concatinating the pressed button

function concatButton() {
    if (KEYPRESS === "0")
        KEYPRESS = "";
    if (LIST_OF_KEYS[0] === TOTAL && LIST_OF_KEYS.length === 1) {
        LIST_OF_KEYS.pop();
        if (KEYPRESS.length > 0 && KEYPRESS !== "0")
            LIST_OF_KEYS.push(parseInt(KEYPRESS));
    }
    screen.style.textAlign = "right";
    KEYPRESS += this.innerText;
    displayOnScreen(KEYPRESS);
    console.log(LIST_OF_KEYS);
}

function toggle_bg() {
    if (calci.classList.contains("button-bulb-click-black")) {
        bulb.src = "./images/idea-48-black.png";
        calci.classList.remove("button-bulb-click-black");
        calci.classList.add("button-bulb-click-white");
    } else {
        bulb.src = "./images/idea-48.png";
        calci.classList.remove("button-bulb-click-white");
        calci.classList.add("button-bulb-click-black");
    }
}

function backSpace() {
    screen.style.textAlign = "right";
    KEYPRESS = KEYPRESS.substring(0, KEYPRESS.length - 1);
    if (KEYPRESS.length == 0)
        KEYPRESS = "0";
    displayOnScreen(KEYPRESS);
};

function clearScreen() {
    screen.style.textAlign = "right";
    TOTAL = 0;
    LIST_OF_KEYS = [];
    KEYPRESS = "0"; // To clear the string which contains all keyPresses 
    displayOnScreen(KEYPRESS);
}

// Function declaration ends

// All events

bulb.onclick = toggle_bg;
button_c.onclick = clearScreen;
back.onclick = backSpace;
plus.onclick = arithmetics;
minus.onclick = arithmetics;
multiply.onclick = arithmetics;
divide.onclick = arithmetics;
equals.onclick = getTotal;
document.getElementById("button-one").onclick = concatButton;
document.getElementById("button-two").onclick = concatButton;
document.getElementById("button-three").onclick = concatButton;
document.getElementById("button-four").onclick = concatButton;
document.getElementById("button-five").onclick = concatButton;
document.getElementById("button-six").onclick = concatButton;
document.getElementById("button-seven").onclick = concatButton;
document.getElementById("button-eight").onclick = concatButton;
document.getElementById("button-nine").onclick = concatButton;
document.getElementById("button-zero").onclick = concatButton;
document.getElementById("button-decimal").onclick = concatButton;