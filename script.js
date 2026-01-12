// Basic Calculation Functions
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}

function operate(operation, x, y) {
    switch(operation) {
        case '+':
            return add(x, y);
            break;
        case '-':
            return subtract(x, y);
            break;
        case '*':
            return multiply(x, y);
            break;
        case '/':
            return divide(x, y);
            break;
    }
}

const calculator = {
    firstNumber: undefined,
    secondNumber: undefined,
    result: undefined,
    operator: undefined,
    
}

display = document.querySelector("#display")
function updateDisplay(calculator) {
    if (calculator.result !== undefined) {
        display.textContent = calculator.result;
    } else if (calculator.secondNumber !== undefined) {
        display.textContent = calculator.secondNumber;
    // } else if (calculator.operator !== undefined) {
    //     display.textContent = ""
    } else {
        display.textContent = calculator.firstNumber;
    }
}

digits = document.querySelectorAll(".digit");

for (digit of digits) {
    digit.addEventListener("click", function(e) {
        let number = e.target.textContent;
        console.log(number);
        // Case: Empty first number.
        if (calculator.firstNumber === undefined) {
            calculator.firstNumber = number;

        // Case: No operator pressed since last reset.
        } else if (calculator.operator === undefined) {
            calculator.firstNumber += number;

        // Case: Operator has been pressed at least once since last reset.
        } else {
            if (calculator.secondNumber === undefined) {
                calculator.secondNumber = number;
            } else {
                calculator.secondNumber += number;
            }
        }
        updateDisplay(calculator);
    });
}
const operations = document.querySelectorAll(".operator");
for (op of operations) {
    op.addEventListener("click", function(e) {
        select = e.target.id;
        // Case: Operator never selected.
        if (calculator.operator === undefined || calculator.secondNumber == undefined) {
            calculator.operator = select;

        // Case: Operator previously selected. Need to evaluate, and set result to first.
        } else {
            let res = operate(calculator.operator, Number(calculator.firstNumber), Number(calculator.secondNumber));
            calculator.firstNumber = res;
            calculator.secondNumber = undefined;
            updateDisplay(calculator);
            calculator.operator = select;
        }
    }) 
}

