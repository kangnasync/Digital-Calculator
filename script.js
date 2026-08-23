const currentDisplay = document.querySelector(".current-display");
const previousDisplay = document.querySelector(".previous-display");

let currentValue = "";
let previousValue = "";
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    currentDisplay.textContent = currentValue || "0";

    if (operator && previousValue !== "") {
        previousDisplay.textContent = `${previousValue} ${operator}`;
    } else {
        previousDisplay.textContent = "";
    }
}

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

function calculate() {

    if (previousValue === "" || currentValue === "" || operator === null) {
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

    updateDisplay();
}

function clearCalculator() {
    currentValue = "";
    previousValue = "";
    operator = null;
    shouldResetDisplay = false;

    updateDisplay();
}

function deleteNumber() {
    if (shouldResetDisplay) {
        return;
    }

    currentValue = currentValue.slice(0, -1);
    updateDisplay();
}

document.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => {
        addNumber(button.dataset.number);
    });
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", function () {
        const selectedOperator = this.getAttribute("data-operator");
        chooseOperator(selectedOperator);
    });
});
document.querySelector('[data-action="calculate"]')
    .addEventListener("click", calculate);

document.querySelector('[data-action="clear"]')
    .addEventListener("click", clearCalculator);

document.querySelector('[data-action="delete"]')
    .addEventListener("click", deleteNumber);

// Keyboard support
document.addEventListener("keydown", event => {

    if (
        (event.key >= "0" && event.key <= "9") ||
        event.key === "."
    ) {
        addNumber(event.key);
    }

    if (["+", "-", "*", "/", "%"].includes(event.key)) {
        chooseOperator(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }

    if (event.key === "Backspace") {
        deleteNumber();
    }

    if (event.key === "Escape") {
        clearCalculator();
    }
});