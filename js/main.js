import * as infixConverter from './infixToPostfixConverter.js';

const MINUS_CODE = '\u2014';
let calculator = document.querySelector('.calculator');
let display = document.querySelector('.calculator__output');
let clear = document.getElementById("clear");
let deleteCharacter = document.getElementById("delete");

setEventListeners();

function setEventListeners(){
    calculator.addEventListener('click', appendToDisplay);
    clear.addEventListener('click', clearDisplay);
    deleteCharacter.addEventListener('click', deleteLastCharacter);
}

function appendToDisplay(e){
    let buttonID = e.target.id;
    if (contentIsNotAppendable(buttonID)){
        return;
    }
    display.value += getContentToAppend(e);
}

function contentIsNotAppendable(text){
    return (text.includes('calculate') || text.includes('clear') ||
            text.includes('delete'));
}

function getContentToAppend(e){
    if (e.target.id.includes('minus')){
        return MINUS_CODE;
    }

    return e.target.textContent;

}

function clearDisplay(e){
    display.value = '';
}

function deleteLastCharacter(){
    let displayLength = display.value.length; 
    if (displayLength == 0) return;
    display.value = display.value.slice(0, displayLength - 1);
}




