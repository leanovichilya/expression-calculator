function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let stackValues = [];
    let stackChars = [];

    for (let i = 0; i < expr.length; i += 1) {
        if (expr[i] === ' ') {
            continue;
        }

        if (expr[i] >= '0' && expr[i] <= '9') {
            let strBuf = '';

            while (i < expr.length && expr[i] >= '0' && expr[i] <= '9') {
                strBuf += expr[i++];
            }

            i -= 1;

            stackValues.push(parseFloat(strBuf));
        }

        else if (expr[i] === '(') {
            stackChars.push(expr[i]);
        }

        else if (expr[i] === ')') {
            while (peek(stackChars) !== '(') {
                stackValues.push(operationCount(stackChars.pop(), stackValues.pop(), stackValues.pop()));
            }

            stackChars.pop();
        }

        else if (expr[i] === '+' || expr[i] === '-'
          || expr[i] === '*' || expr[i] === '/') {

            while (!(stackChars.length === 0) && prioritization(expr[i], peek(stackChars))) {
                stackValues.push(operationCount(stackChars.pop(), stackValues.pop(), stackValues.pop()));
            }

            stackChars.push(expr[i]);
        }
    }

    while (!(stackChars.length === 0)) {
        stackValues.push(operationCount(stackChars.pop(), stackValues.pop(), stackValues.pop()));
    }

    return stackValues.pop();
}

function peek(array) {
    return array[array.length - 1];
}

function prioritization(firstOperation, secondOperation) {
    if (secondOperation === '(' || secondOperation === ')') {
        return false;
    }

    if ((firstOperation === '*' || firstOperation === '/') && (secondOperation === '+' || secondOperation === '-')) {
        return false;
    } else {
        return true;
    }
}

function operationCount(operation, secondNum, firstNum) {
    switch (operation) {
        case '+':
            return firstNum + secondNum;
        case '-':
            return firstNum - secondNum;
        case '*':
            return firstNum * secondNum;
        case '/':
            if (secondNum === 0) {
                throw new Error("TypeError: Division by zero.");
            }
            return firstNum / secondNum;
    }
    throw new Error("ExpressionError: Brackets must be paired");
}

module.exports = {
    expressionCalculator
}