const minus = '\u2014';
export const errorMessage = 'Bad expression';

export function evaluatePostfixExpression(postfixExpression, supportedOperators) {
    if (postfixExpression.length === 1) return errorMessage;
    let answerStack = [];
    for (let i = 0; i < postfixExpression.length; i++) {
        let currentTerm = postfixExpression[i];
        if (supportedOperators.has(currentTerm)) {
            if (answerStack.length < 2) return errorMessage;
            let firstOperand = answerStack.pop();
            let secondOperand = answerStack.pop();
            if (!isNumber(firstOperand) || !isNumber(secondOperand)) return errorMessage;

            let operationResult = performOperation(parseFloat(secondOperand), parseFloat(firstOperand), currentTerm);

            if (!isNumber(operationResult)) return errorMessage;
            answerStack.push(operationResult);
        }

        else {
            answerStack.push(currentTerm);
        }
    }
    return getFinalAnswer(answerStack);
}

function getFinalAnswer(answerStack) {
    return (answerStack.length == 1) ? answerStack.pop() : errorMessage;
}

function performOperation(first, second, operation) {
    switch (operation) {
        case '+':
            return first + second;
            break;
        case minus:
            return first - second;
            break;
        case '*':
            return first * second;
        case '/':
            return first / second;
    }
}

function isNumber(value) {
    if (typeof value !== "string" && typeof value !== 'number') return false // we only process strings and numbers
    if (value === Infinity) return false;
    if (value === NaN) return false;
    return !isNaN(value) && !isNaN(parseFloat(value))
}

