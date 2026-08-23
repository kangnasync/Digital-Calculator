const currentDisplay = document.querySelector(".current-display");
const previousDisplay = document.querySelector(".previous-display");

let currentValue = "";
let previousValue = "";
let operator = null;
let shouldResetDisplay = false;


// Update display
function updateDisplay() {

    currentDisplay.textContent = currentValue || "0";

    if (operator && previousValue !== "") {
        previousDisplay.textContent = `${previousValue} ${operator}`;
    } else {
        previousDisplay.textContent = "";
    }
}


// Add numbers
function addNumber(number) {

    if (shouldResetDisplay) {
        currentValue = "";
        shouldResetDisplay = false;
    }

    if (number === "." && currentValue.includes(".")) {
        return;
    }

    if (number === "." && currentValue === "") {
        currentValue = "0";
    }

    if (currentValue === "0" && number !== ".") {
        currentValue = "";
    }

    currentValue += number;

    updateDisplay();
}


// Choose operator
function chooseOperator(selectedOperator) {

    if (currentValue === "") {
        return;
    }

    if (previousValue !== "" && operator !== null) {
        calculate();
    }

    previousValue = currentValue;
    operator = selectedOperator;
    currentValue = "";

    updateDisplay();
}


// Calculate result
function calculate() {

    if (
        previousValue === "" ||
        currentValue === "" ||
        operator === null
    ) {
        return;
    }

    const firstNumber = Number(previousValue);
    const secondNumber = Number(currentValue);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {
                currentValue = "Error";
                previousValue = "";
                operator = null;

                updateDisplay();
                return;
            }

            result = firstNumber / secondNumber;
            break;

        case "%":
            result = firstNumber % secondNumber;
            break;

        default:
            return;
    }

    currentValue = String(result);

    previousValue = "";
    operator = null;

    shouldResetDisplay = true;

    updateDisplay();
}


// Clear calculator
function clearCalculator() {

    currentValue = "";
    previousValue = "";
    operator = null;
    shouldResetDisplay = false;

    updateDisplay();
}


// Delete last number
function deleteNumber() {

    if (shouldResetDisplay) {
        return;
    }

    currentValue = currentValue.slice(0, -1);

    updateDisplay();
}


// Number buttons
document.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => {
        addNumber(button.dataset.number);
    });
});


// Operator buttons
document.querySelectorAll("[data-operator]").forEach(button => {
    button.addEventListener("click", () => {
        chooseOperator(button.dataset.operator);
    });
});


// All action buttons
document.querySelectorAll("[data-action]").forEach(button => {

    button.addEventListener("click", () => {

        const action = button.dataset.action;

        if (action === "calculate") {
            calculate();
        }

        if (action === "clear") {
            clearCalculator();
        }

        if (action === "delete") {
            deleteNumber();
        }

    });

});