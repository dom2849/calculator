import * as infixConverter from './infixToPostfixConverter.js';
import evaluatePostfixExpression from './postfixEvaluator.js';

const supportedOperators = new Map([['+', 1], ['\u2014', 1], ['*', 2], ['/', 2]]);

/*
 The operator delimeters represent all the operators supported by the calculator 
 which are addition, minus, times, and division. They are wrapped in parenthesis
 so as to ensure they are included in the array after splitting the infix string.
 Without the parenthesis, the operators would be lost.
*/
let operatorDelimeters = /([\+\u2014\*\/])/

export default function calculate(infixExpression){
    let terms = infixExpression.split(operatorDelimeters);
    let postfixResult = infixConverter.getPostfixExpression(terms, supportedOperators);
    return evaluatePostfixExpression(postfixResult, supportedOperators);
}
