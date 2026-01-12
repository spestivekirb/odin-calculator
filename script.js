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
    if (y === 0) {
        return undefined;
    }
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
    if (calculator.firstNumber === undefined) {
        display.textContent = 0;
    } else if (calculator.result !== undefined) {
        display.textContent = calculator.result;
    } else if (calculator.operator !== undefined) {
        if (calculator.secondNumber === undefined) {
            display.textContent = 0;
        } else {
            display.textContent = calculator.secondNumber;
        }
    // } else if (calculator.operator !== undefined) {
    //     display.textContent = ""
    } else {
        display.textContent = calculator.firstNumber;
    }

    if (display.textContent.length > 9) {
        if (display.textContent.includes('.')) {
            display.textContent = display.textContent.substring(0,12);
        } else {
            display.textContent = display.textContent.substring(0,11);

        }
    }
}

digits = document.querySelectorAll(".digit");

for (digit of digits) {
    digit.addEventListener("click", function(e) {
        // Reset calculator if last operation was "="
        if (calculator.result !== undefined) {
            calculator.result = undefined;
        }
        
        if (e.target.id === "decimal") {

            if (calculator.firstNumber === undefined) {
                calculator.firstNumber = "0.";
            } else if (calculator.operator === undefined) {
                if (!String(calculator.firstNumber).includes(".")) {
                    calculator.firstNumber += ".";
                }
            } else {
                if (calculator.secondNumber === undefined) {
                    calculator.secondNumber = "0."
                } else {
                    if(!String(calculator.secondNumber).includes(".")) {
                        calculator.secondNumber += ".";

                    }
                }
            }

        } else {
            let number = e.target.textContent;
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
            if (calculator.firstNumber !== undefined) {
                    calculator.firstNumber = Number(calculator.firstNumber);
            }
            if (calculator.secondNumber !== undefined) {
                calculator.secondNumber = Number(calculator.secondNumber);
            }

        }
        
        
        updateDisplay(calculator);
    });
}


function clearSelection() {
    const operations = document.querySelectorAll(".operator");
    for (const op of operations) {
        op.classList.remove("selected");
    }
}
// Operators (non =)
const operations = document.querySelectorAll(".operator");
for (op of operations) {
    op.addEventListener("click", function(e) {
        select = e.target.id;
        // Case: Operator never selected.
        if (calculator.operator === undefined || calculator.secondNumber == undefined) {
            calculator.operator = select;
            if (calculator.result !== undefined) {
                calculator.firstNumber = calculator.result
                calculator.result = undefined;
        
            }
            clearSelection();
            e.target.classList.add("selected");


        // Case: Operator previously selected. Need to evaluate, and set result to first.
        } else {
            let res = operate(calculator.operator, Number(calculator.firstNumber), Number(calculator.secondNumber));
            // Divide by zero
            if (res === undefined) {
                display.textContent = "Seriously?"
                calculator.firstNumber = undefined;
                calculator.secondNumber = undefined;
                calculator.operator = undefined;
                calculator.result = undefined;
            } else {
                calculator.firstNumber = res;
                calculator.secondNumber = undefined;
                updateDisplay(calculator);
                calculator.operator = select;
                clearSelection();
                e.target.classList.add("selected");

            }
            
        }
    }) 
}
const evaluate = document.querySelector("#eq")
evaluate.addEventListener("click", function() {
    // Case: Empty calc or only first num selected
    if (calculator.firstNumber === undefined || calculator.operator === undefined) {
            // Do Nothing
    //Case: No second number
    } else if (calculator.secondNumber === undefined) {
        let result = operate(calculator.operator, Number(calculator.firstNumber), Number(calculator.firstNumber));

        if (result === undefined) {
            display.textContent = "Seriously?"
            calculator.firstNumber = undefined;
            calculator.secondNumber = undefined;
            calculator.operator = undefined;
            calculator.result = undefined;
            clearSelection();
        } else {
            calculator.result = result;
            updateDisplay(calculator);
            calculator.firstNumber = undefined;
            calculator.secondNumber = undefined;
            calculator.operator = undefined;
            clearSelection();
        }
        
    // General case
    } else {
        let result = operate(calculator.operator, Number(calculator.firstNumber), Number(calculator.secondNumber));

        if (result === undefined) {
            display.textContent = "Seriously?"
            calculator.firstNumber = undefined;
            calculator.secondNumber = undefined;
            calculator.operator = undefined;
            calculator.result = undefined;
            clearSelection();
        } else {
            calculator.result = result;
            updateDisplay(calculator);
            calculator.firstNumber = undefined;
            calculator.secondNumber = undefined;
            calculator.operator = undefined;
            clearSelection();
        }
    }
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", function() {
    calculator.firstNumber = undefined;
    calculator.secondNumber = undefined;
    calculator.operator = undefined;
    calculator.result = undefined;
    updateDisplay(calculator);
});

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", function () {
    // Case: second number blank, should remove last digit of first nubmer IF POSSIBLE.
    if (calculator.operator === undefined) {
        if (!(calculator.firstNumber === undefined || String(calculator.firstNumber).length === 1)) {
            calculator.firstNumber = String(calculator.firstNumber).slice(0, -1);
        } else if (calculator.firstNumber !== undefined && String(calculator.firstNumber).length === 1) {
            calculator.firstNumber = undefined;
        }
    // Case: delete from second number.
    } else {
        if (!(calculator.secondNumber === undefined || String(calculator.secondNumber).length === 1)) {
            calculator.secondNumber = String(calculator.secondNumber).slice(0, -1);
        } else if (calculator.secondNumber !== undefined && String(calculator.secondNumber).length === 1) {
            calculator.secondNumber = undefined;
        }
    }


    updateDisplay(calculator);
}) 



// Keyboard input section
function getButtonFromKey(key) {
    if (key === "clear") {
        return document.querySelector("#clear");
    }
    if (key === "=") {
        return document.querySelector("#eq");
    }
    if (key === "Backspace") {
        return document.querySelector("#backspace")
    }
    if (key === ".") {
        return document.querySelector("#decimal");
    }
    
    const digits = document.querySelectorAll(".digit");
    for (const digit of digits) {
        if (digit.textContent === key) {
            return digit;
        }
    }
    const ops = document.querySelectorAll(".operator");
    for (const e of ops) {
        if (e.id === key) {
            return e;
        }
    }


    return null;
}


document.addEventListener("keydown", function(e) {
    let key = e.key;

    if (key === "C" || key == "Escape") {
        key = "clear";
    }
    if (key === "Enter") {
        key = "=";
    }

    let button = getButtonFromKey(key);
    if (button){
        button.click();
    }
})