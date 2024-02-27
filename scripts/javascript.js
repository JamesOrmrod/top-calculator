// initialise display variables
let inputArray = [];
let scrnDisplay = "0";

const screen = document.querySelector("#screen");

const numButtons = document.querySelectorAll(".num-button");

numButtons.forEach((button) => {
    button.addEventListener('click', () => pressNumButton(button.textContent));
});

const clrButton = document.querySelector("#clr");
clrButton.addEventListener('click', () => clearScreen("button"));

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener('click', calculate);

const operButtons = document.querySelectorAll(".operator-button");

operButtons.forEach((button) => {
    button.addEventListener('click', (e) => pressOperButton(button.textContent));
})

const decimButton = document.querySelector("#decimal");
decimButton.addEventListener('click', pressDecimal);

const deleteButton = document.querySelector("#delete");
deleteButton.addEventListener('click', pressDelete);

// add a listener for keypresses to call functions
document.addEventListener('keydown', pressKey);


const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '÷': (a, b) => a / b,
}

// handle the keyboard press and call the correct function
function pressKey(e) {
    key = e.key;
    if (/[0-9]/.test(key)) {
        pressNumButton(key);
    } else if (key === ".") {
        pressDecimal();
    } else if (/[\/\*+-]/.test(key)) {
        switch (key) {
            case "/": pressOperButton("÷");
            case "*": pressOperButton("x");
            case "+": pressOperButton("+");
            case "-": pressOperButton("-");
        };
    } else if (key === "Enter" || key === "=") {
        calculate();
    } else if (key === "Backspace") {
        pressDelete();
    } else if (key === "Delete") {
        clearScreen("delete key");
    }
}

// store the input in an array for use when calculating and update the screen
function pressNumButton(input) {
    if (inputArray.length % 2 === 0) {
        inputArray.push(input);
    } else {
        inputArray[inputArray.length - 1] += input;
    }
    updateDisplay();
}

function pressOperButton(input) {
    if (inputArray.length === 1) {
        inputArray.push(input); 
        updateDisplay();
    } else if (inputArray.length === 3) {
        calculate();
        inputArray.push(input);
    } 
}


function pressDecimal() {
    if (inputArray.length % 2 === 0) {
        inputArray.push("0.");
    } else {
        // don't allow another decimal if the number already has one
        if (!(inputArray[inputArray.length - 1].includes("."))) {
            inputArray[inputArray.length - 1] += ".";
        }
    }
    updateDisplay();
}

function pressDelete() {
    currentIndex = inputArray.length - 1;
    current = inputArray[currentIndex];

    if (currentIndex >= 0) {
        if (current.length < 2) {
            inputArray.pop();
        } else if (current.length > 1) {
            inputArray[currentIndex] = current.slice(0, -1);
        }
        updateDisplay();
    }
}



// update the screen display
function updateDisplay() {
    if (inputArray.length === 0) {
        screen.textContent = "0";
    } else {
        screen.textContent = inputArray.join(" ");
    }
    console.log(inputArray);
    
}


function clearScreen(src) {
    console.log('clearing screen from source: ' + src);
    inputArray = [];
    updateDisplay();
}

function calculate() {
    // check the input string is valid to calculate a mathematical result
    console.log("calculting!")
    let fnArr = inputArray;

    console.log(`arr length = ${fnArr.length}`);
    console.log(`arr length % 2 = ${fnArr.length % 2}`);
    console.log(`valid check = ${validInput(fnArr)}`);
    
    if (fnArr.length === 3 && validInput(fnArr)) {
        let num1 = +fnArr[0];
        let oper = fnArr[1];
        let num2 = +fnArr[2];
        let result = 0;
        
        result = operators[oper](num1, num2);

        newArr = [result];
        inputArray = newArr;

        console.log(newArr);
        console.log(inputArray);

        updateDisplay();

        console.log(`num1 = ${num1}, num2 = ${num2}, oper = ${oper}`);
        console.log(`result = ${result}`);
    }    
}


function validInput(arr) {
    
    for(let i = 0; i < arr.length; i++) {
        if(i % 2 === 0 ) {
            if (isNaN(arr[i])) {
                return false; 
            }      
        } else if (!(arr[i] in operators)) {
            return false;
        }
    }

    return true;
}

