import * as evaluator from './expressionEvaluator.js';

const MINUS_CODE = '\u2014';
let calculator = document.querySelector('.calculator');
let display = document.querySelector('.calculator__output');
let clear = document.getElementById("clear");
let deleteCharacter = document.getElementById("delete");
let calculateResult = document.getElementById("calculate-result");

setEventListeners();

function setEventListeners() {
    calculator.addEventListener('click', appendToDisplay);
    clear.addEventListener('click', clearDisplay);
    deleteCharacter.addEventListener('click', deleteLastCharacter);
    calculator.addEventListener('keydown', deleteLastCharacter);
    calculator.addEventListener('keydown', calculateExpression);
    calculateResult.addEventListener('click', calculateExpression);
}


function appendToDisplay(e) {
    if (e.code === 'Enter') return;
    let buttonID = e.target.id;
    if (contentIsNotAppendable(buttonID)) {
        return;
    }
    removeErrorMessageIfNecessary();
    display.value += getContentToAppend(e);
}

function removeErrorMessageIfNecessary() {
    if (display.value === evaluator.errorMessage) {
        clearDisplay();
    }
}

function contentIsNotAppendable(text) {
    return (text.includes('calculate') || text.includes('clear') ||
        text.includes('delete'));
}

function getContentToAppend(e) {
    if (e.target.id.includes('minus')) {
        return MINUS_CODE;
    }

    return e.target.textContent;
}

function clearDisplay(e) {
    display.value = '';
}

function deleteLastCharacter(e) {
    if (e.type === 'click' || e.code === 'Backspace') {
        let displayLength = display.value.length;
        if (displayLength === 0) return;
        display.value = display.value.slice(0, displayLength - 1);
    }
}

function calculateExpression(e) {
    if (display.value.length === 0) return;

    if (e.type === 'click' || e.code === 'Enter') {
        display.value = evaluator.calculate(display.value);
    }
}





