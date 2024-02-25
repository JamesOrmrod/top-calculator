// initialise display variables
let inputArray = [];
let scrnDisplay = "0";

const screen = document.querySelector("#screen");

const numButtons = document.querySelectorAll(".num-button");

numButtons.forEach((button) => {
    button.addEventListener('click', (e) => pressNumButton(button));
});


const clrButton = document.querySelector(".fn-button#clr");
clrButton.addEventListener('click', () => clearScreen());

const equalsButton = document.querySelector(".fn-button#equals");
equalsButton.addEventListener('click', () => calculate());

const operButtons = document.querySelectorAll(".operator-button");

operButtons.forEach((button) => {
    button.addEventListener('click', (e) => pressOperButton(button));
})

const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    'x': (a, b) => a * b,
    '÷': (a, b) => a / b,
}

// store the input in an array for use when calculating and update the screen
function pressNumButton(input) {
    if (inputArray.length % 2 === 0) {
        inputArray.push(input.textContent);
    } else {
        inputArray[inputArray.length - 1] += input.textContent;
    }
    updateDisplay();
}

function pressOperButton(input) {
    if (inputArray.length > 0 && inputArray.length % 2 != 0) {
        inputArray.push(input.textContent);
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


function clearScreen() {
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
    
    if (fnArr.length > 2 && (fnArr.length % 2 != 0) && validInput(fnArr)) {
        let num1 = +fnArr[0];
        let oper = fnArr[1];
        let num2 = +fnArr[2];
        let result = 0;
        
        result = operators[oper](num1, num2);
        inputArray = [];
        inputArray[0] = result;
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

