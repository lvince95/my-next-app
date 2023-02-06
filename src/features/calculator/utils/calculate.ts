export const checkOperatorPriority = (operator: string): number => {
  switch (operator) {
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
      return 2;
    default:
      return 0;
  }
};

export const isOperator = (token: string): boolean => {
  return token === '+' || token === '-' || token === '*' || token === '/';
};

export const performOperation = (
  operator: string | undefined,
  operand1: number | undefined,
  operand2: number | undefined,
): number => {
  if (operand1 === undefined || operand2 === undefined) {
    throw new Error('Invalid operand');
  }

  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      return operand1 / operand2;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
};

export const countOperators = (operators: string[]) => {
  const operatorMap = new Map<string, number>();

  operators.map((operator) => {
    operatorMap.set(operator, (operatorMap.get(operator) ?? 0) + 1);
  });

  return operatorMap;
};

export const getOperatorName = (operator: string) => {
  switch (operator) {
    case '+':
      return 'Addition';
    case '-':
      return 'Subtraction';
    case '*':
      return 'Multiplication';
    case '/':
      return 'Division';
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
};

export const calculate = (expression: string) => {
  const isValid = expression.match(/^([-+/*]\d+(\.\d+)?)*/);

  if (!isValid) {
    throw new Error(
      'Invalid expression. Only numbers and the `+`, `-`, `*`, `/`, `(`, `)` symbols are supported.',
    );
  }

  const operandStack: number[] = [];
  const operatorStack: string[] = [];

  // used for record purposes
  const operationsStack: string[] = [];
  const operators: string[] = [];

  // split based on whitespaces for now. drawback is discussed in the article
  // const tokens = expression.replace(' ', '').match(/[^\d()]+|[\d.]+/g);
  const tokens = expression.split(/\s+/);

  if (tokens.length <= 1) {
    throw new Error(
      'Invalid expression. Spaces between each number and operator are required.',
    );
  }

  for (const token of tokens) {
    if (token === '(') {
      // push the left bracket and continue on.
      operatorStack.push(token);
    } else if (token === ')') {
      // evaluates everything inside the bracket before proceeding
      while (operatorStack[operatorStack.length - 1] !== '(') {
        const operator = operatorStack.pop();
        if (operator) operators.push(operator);
        const operand2 = operandStack.pop();
        const operand1 = operandStack.pop();
        const result = performOperation(operator, operand1, operand2);
        operationsStack.push(`${operand1} ${operator} ${operand2} = ${result}`);
        operandStack.push(result);
      }
      operatorStack.pop();
    } else if (isOperator(token)) {
      // evaluates the operators in the stack
      while (
        operatorStack.length > 0 &&
        operatorStack[operatorStack.length - 1] !== '(' &&
        checkOperatorPriority(token) <=
          checkOperatorPriority(operatorStack[operatorStack.length - 1])
      ) {
        const operator = operatorStack.pop();
        if (operator) operators.push(operator);
        const operand2 = operandStack.pop();
        const operand1 = operandStack.pop();
        const result = performOperation(operator, operand1, operand2);
        operationsStack.push(`${operand1} ${operator} ${operand2} = ${result}`);
        operandStack.push(result);
      }
      operatorStack.push(token);
    } else {
      operandStack.push(parseFloat(token));
    }
  }

  // evaluate remaining operators that are leftover
  while (operatorStack.length > 0) {
    const operator = operatorStack.pop();
    if (operator) operators.push(operator);
    const operand2 = operandStack.pop();
    const operand1 = operandStack.pop();
    const result = performOperation(operator, operand1, operand2);
    operationsStack.push(`${operand1} ${operator} ${operand2} = ${result}`);
    operandStack.push(result);
  }

  return { result: +operandStack[0].toFixed(2), operationsStack, operators };
};
