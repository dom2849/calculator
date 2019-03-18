const supportedOperators = new Map([['+', 1], ['\u2014', 1], ['*', 2], ['/', 2]]);

/*
 The operator delimeters represent all the operators supported by the calculator 
 which are addition, minus, times, and division. They are wrapped in parenthesis
 so as to ensure they are included in the array after splitting the infix string.
 Without the parenthesis, the operators would be lost.
*/

export function getPostfixExpression(infixTerms, supportedOperators){
    let postfixExpression = [];
    let operatorStack = [];

    for (let i = 0; i<infixTerms.length; i++){
        let currentTerm = infixTerms[i];
        if (supportedOperators.has(currentTerm)){
            performNecessaryActionWithOperator(currentTerm, postfixExpression, operatorStack)
        }
        else{
            postfixExpression.push(currentTerm);
        }
    }
    pushRemainingOperators(operatorStack, postfixExpression);
    return postfixExpression;
}

function performNecessaryActionWithOperator(currentTerm, postfixExpression, operatorStack){
    while (operatorStack.length !== 0 && 
        precedenceOfTop(operatorStack) >= supportedOperators.get(currentTerm)){
            let poppedTerm = operatorStack.pop();
            postfixExpression.push(poppedTerm);
    }
    operatorStack.push(currentTerm);
}

function precedenceOfTop(operatorStack){
    let top = operatorStack[operatorStack.length - 1];
    return supportedOperators.get(top);
}

function pushRemainingOperators(operatorStack, postfixExpression) {
    while(operatorStack.length !== 0){
        let poppedTerm = operatorStack.pop();
        postfixExpression.push(poppedTerm)
    }
}



