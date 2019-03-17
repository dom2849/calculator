const operators = new Map([['+', 1], ['\u2014', 1], ['*', 2], ['/', 2]]);

/*
 The operator delimeters represent all the operators supported by the calculator 
 which are addition, minus, times, and division. They are wrapped in parenthesis
 so as to ensure they are included in the array after splitting the infix string.
 Without the parenthesis, the operators would be lost.
*/
let operatorDelimeters = /([\+\u2014\*\/])/

getPostfixExpression('10\u20145+2*2/4\u20148*2/2');

function getPostfixExpression(infixExpression){
    let terms = infixExpression.split(operatorDelimeters);
    let postfixExpression = [];
    let operatorStack = [];

    for (let i = 0; i<terms.length; i++){
        let currentTerm = terms[i];
        if (operators.has(currentTerm)){
            performNecessaryActionWithOperator(currentTerm, postfixExpression, operatorStack)
        }
        else{
            postfixExpression.push(currentTerm);
        }
    }
    pushRemainingOperators(operatorStack, postfixExpression);
    console.log(postfixExpression);
}

function performNecessaryActionWithOperator(currentTerm, postfixExpression, operatorStack){
    while (operatorStack.length !== 0 && 
        precedenceOfTop(operatorStack) >= operators.get(currentTerm)){
            let poppedTerm = operatorStack.pop();
            postfixExpression.push(poppedTerm);
    }
    operatorStack.push(currentTerm);
}

function precedenceOfTop(operatorStack){
    let top = operatorStack[operatorStack.length - 1];
    return operators.get(top);
}

function pushRemainingOperators(operatorStack, postfixExpression) {
    while(operatorStack.length !== 0){
        let poppedTerm = operatorStack.pop();
        postfixExpression.push(poppedTerm)
    }
}



