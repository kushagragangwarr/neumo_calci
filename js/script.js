// NOTE:- Uncomment all console.log() for debugging purpose.

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

TOTAL = 0;
KEYPRESS = "";
LIST_OF_KEYS = [];
DOTCOUNT = 0;
FIRST_TIME = 0;


// -->> Function declaration starts <<--

// Function to get the total of the expression using BODMAS rule

function getTotal() {
    if (LIST_OF_KEYS.length <= 1 || KEYPRESS === '.') // If user enters a false key or decimal or presses equal button unintentionally
        return;

    if (KEYPRESS.length > 0 && KEYPRESS !== "0" && !isNaN(KEYPRESS)) { // Pushing the KEYPRESS into LIST_OF_KEYS according to their data type

        if (KEYPRESS.indexOf('.') > -1) {
            // console.log("PUSHED FLOAT IN TOTAL");
            LIST_OF_KEYS.push(parseFloat(KEYPRESS));
            DOTCOUNT = 1;
        } else {
            LIST_OF_KEYS.push(parseInt(KEYPRESS));
            // console.log("PUSHED INT IN TOTAL");
        }
    }
    if (isNaN(LIST_OF_KEYS[LIST_OF_KEYS.length - 1]) && LIST_OF_KEYS.length !== 0) {
        alert("You are supposed to enter a number after an arithemtic sign.");
        return;
    }
    // console.log(LIST_OF_KEYS);
    while (LIST_OF_KEYS.length !== 1) { // Loop for calculating the expression according to BODMAS rule and put the result in LIST_OF_KEYS

        if (LIST_OF_KEYS.indexOf("/") > -1) {
            // console.log("DIVIDING");
            TOTAL = LIST_OF_KEYS[LIST_OF_KEYS.indexOf("/") - 1] / LIST_OF_KEYS[LIST_OF_KEYS.indexOf("/") + 1];
            LIST_OF_KEYS.splice(LIST_OF_KEYS.indexOf("/") - 1, 3, TOTAL);
        } else if (LIST_OF_KEYS.indexOf("*") > -1) {
            // console.log("MULTIPLYING");
            TOTAL = LIST_OF_KEYS[LIST_OF_KEYS.indexOf("*") - 1] * LIST_OF_KEYS[LIST_OF_KEYS.indexOf("*") + 1];
            LIST_OF_KEYS.splice(LIST_OF_KEYS.indexOf("*") - 1, 3, TOTAL);
        } else if (LIST_OF_KEYS.indexOf("+") > -1) {
            // console.log("ADDING");
            TOTAL = LIST_OF_KEYS[LIST_OF_KEYS.indexOf("+") - 1] + LIST_OF_KEYS[LIST_OF_KEYS.indexOf("+") + 1];
            LIST_OF_KEYS.splice(LIST_OF_KEYS.indexOf("+") - 1, 3, TOTAL);
        } else if (LIST_OF_KEYS.indexOf("-") > -1) {
            // console.log("SUBTRACTING");
            TOTAL = LIST_OF_KEYS[LIST_OF_KEYS.indexOf("-") - 1] - LIST_OF_KEYS[LIST_OF_KEYS.indexOf("-") + 1];
            LIST_OF_KEYS.splice(LIST_OF_KEYS.indexOf("-") - 1, 3, TOTAL);
        }
    }
    KEYPRESS = "";
    DOTCOUNT = 0;
    displayOnScreen(TOTAL);
    // console.log(LIST_OF_KEYS);
}

// Function to add the arithmetic symbol and updating the LIST_OF_KEYS with that symbol and the value in KEYPRESS

function arithmetics() {
    if (KEYPRESS.length > 0 && KEYPRESS !== "0" && KEYPRESS !== '.') { // Pushing the KEYPRESS into LIST_OF_KEYS according to their data type
        if (KEYPRESS.indexOf('.') > -1) {
            // console.log("Pushed float");
            LIST_OF_KEYS.push(parseFloat(KEYPRESS));
            DOTCOUNT = 1;
        } else {
            // console.log("Pushed Int");
            LIST_OF_KEYS.push(parseInt(KEYPRESS));
        }
    }
    if (LIST_OF_KEYS.length > 1 && typeof LIST_OF_KEYS[LIST_OF_KEYS.length - 1] === typeof LIST_OF_KEYS[LIST_OF_KEYS.length - 2]) {
        LIST_OF_KEYS.pop();
        alert("You are supposed to enter a arithmetic sign after a number!");
        return;
    }
    if (KEYPRESS.length === 0 && LIST_OF_KEYS.length === 0 || KEYPRESS === '.') { // Preventing the false inputs 
        return;
    }
    // Checking if their is already an arithmetic symbol inside the LIST_OF_KEYS and if not then pushing the current symbol inside LIST_OF_KEYS
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
    } else { // To be executed if their is already an arithmetic symbol present in the LIST_OF_KEYS

        LIST_OF_KEYS.pop(); // Removing the current arithmetic symbol from LIST_OF_KEYS to make space for the new one
        if (this.innerText == 'X')
            LIST_OF_KEYS.push('*');
        else
            LIST_OF_KEYS.push(this.innerText);
    }
    KEYPRESS = "";
    DOTCOUNT = 0;
    // console.log(LIST_OF_KEYS);
    displayOnScreen(LIST_OF_KEYS[LIST_OF_KEYS.length - 1]);
}

// Function for concatinating the pressed button

function concatButton() {
    if (KEYPRESS === "0") // Preventing false input
        KEYPRESS = "";

    if (this.innerText === "0" && KEYPRESS.length === 0) // Preventing false input
        return;

    if (this.innerText != '.' && LIST_OF_KEYS.length === 1) {
        if (this.innerText === '0') // Preventing false input
            return;
        // console.log("Popped the total");
        LIST_OF_KEYS.pop(); // If the user enters a new value just after entering a value then removing the previous value for making space for new one.
    }

    // If the users enters a decimal then checking if there is already a decimal present in KEYPRESS or not.
    if (this.innerText === '.' && DOTCOUNT === 0 && (FIRST_TIME === 0 || typeof LIST_OF_KEYS[LIST_OF_KEYS.length - 1] === "string")) {
        // Add after DOTCOUNT === 0 && (FIRST_TIME === 0 ||
        // console.log("DOT ADDED");
        KEYPRESS += '.';
        DOTCOUNT = 1;
    }
    // Preventing false inputs when user presses 0
    else if ((this.innerText === '0' && FIRST_TIME === 0) || (this.innerText !== '.' && KEYPRESS != "")) {
        // Add after (this.innerText === '0' && FIRST_TIME === 0)
        KEYPRESS += this.innerText;
    } else if (this.innerText !== '0' && this.innerText !== '.') { // Adding values to KEYPRESS other than 0 and decimal
        KEYPRESS += this.innerText;
    } else // Preventing false inputs
        return;

    displayOnScreen(KEYPRESS);
    // console.log(LIST_OF_KEYS);
}

// Function for backspace i.e. removing the particular KEYPRESS.

function backSpace() {
    if (KEYPRESS.length === 0 && typeof LIST_OF_KEYS[LIST_OF_KEYS.length - 1] === "string")
        LIST_OF_KEYS.pop();

    KEYPRESS = KEYPRESS.substring(0, KEYPRESS.length - 1);
    if (KEYPRESS.indexOf('.') === -1 || KEYPRESS.indexOf('.') === 0)
        DOTCOUNT = 0;

    if (KEYPRESS.length == 0 || KEYPRESS === '.') {
        KEYPRESS = "0";
        displayOnScreen(KEYPRESS);
        KEYPRESS = "";
    } else {
        displayOnScreen(KEYPRESS);
    }
    // console.log("Backspace");
    // console.log(LIST_OF_KEYS);
}

// Function to clear the screen and set the defaults

function clearScreen() {
    FIRST_TIME = 0;
    DOTCOUNT = 0;
    TOTAL = 0;
    LIST_OF_KEYS = [];
    KEYPRESS = "0";
    displayOnScreen(KEYPRESS);
    KEYPRESS = "";
    // console.log("List cleared");
}

// Function to display the pressed key and all the results on the calci's screen.

function displayOnScreen(key) {
    screen.style.textAlign = "right";
    screen.innerText = key;
}

// Function to change the color of the background and the calci whenever user presses the bulb button.

function toggle_bg() {
    if (calci.classList.contains("button-bulb-click-black")) {
        bulb.src = "./images/idea-48-black.png";
        calci.classList.remove("button-bulb-click-black");
        calci.classList.add("button-bulb-click-white");
        document.body.classList.remove("body-bg-dark");
        document.body.classList.add("body-bg-white");

    } else {
        bulb.src = "./images/idea-48.png";
        calci.classList.remove("button-bulb-click-white");
        calci.classList.add("button-bulb-click-black");
        document.body.classList.remove("body-bg-white");
        document.body.classList.add("body-bg-dark");
    }
}

// -->> Function declaration ends <<--

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