export class ExpressionEvaluator {
    constructor(variables) {
        this.variables = variables; // Object to hold variable definitions
    }

    evaluate(expression) {
        // Tokenize, validate, and evaluate the expression
        const tokens = this.tokenize(expression);
        const validatedTokens = this.validateTokens(tokens);
        const result = this.compute(validatedTokens);
        return result;
    }

    tokenize(expression) {
        // Regex to match numbers, operators, and variable names
        const tokenRegex = /\s*([a-zA-Z_]\w*|\d+|[+\-*/()])\s*/g;
        const tokens = [];
        let match;

        while ((match = tokenRegex.exec(expression)) !== null) {
            tokens.push(match[1]);
        }

        return tokens;
    }

    validateTokens(tokens) {
        const validOperators = ["+", "-", "*", "/", "(", ")"];
        const validatedTokens = tokens.map((token) => {
            if (this.isNumber(token) || validOperators.includes(token)) {
                return token; // Numbers and operators are valid
            }
            if (this.isVariable(token)) {
                if (!(token in this.variables)) {
                    throw new Error(`Undefined variable: ${token}`);
                }
                return this.variables[token]; // Replace variable with its value
            }
            throw new Error(`Invalid token: ${token}`);
        });
        return validatedTokens;
    }

    isNumber(token) {
        return /^\d+$/.test(token);
    }

    isVariable(token) {
        return /^[a-zA-Z_]\w*$/.test(token);
    }

    compute(tokens) {
        // Convert tokens to a postfix (RPN) expression and evaluate
        const postfix = this.toPostfix(tokens);
        return this.evaluatePostfix(postfix);
    }

    toPostfix(tokens) {
        const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
        const output = [];
        const operators = [];

        tokens.forEach((token) => {
            if (this.isNumber(token)) {
                output.push(Number(token));
            } else if (["+", "-", "*", "/"].includes(token)) {
                while (
                    operators.length &&
                    precedence[operators[operators.length - 1]] >= precedence[token]
                ) {
                    output.push(operators.pop());
                }
                operators.push(token);
            } else if (token === "(") {
                operators.push(token);
            } else if (token === ")") {
                while (operators.length && operators[operators.length - 1] !== "(") {
                    output.push(operators.pop());
                }
                operators.pop(); // Remove "("
            }
        });

        while (operators.length) {
            output.push(operators.pop());
        }

        return output;
    }

    evaluatePostfix(postfix) {
        const stack = [];

        postfix.forEach((token) => {
            if (typeof token === "number") {
                stack.push(token);
            } else {
                const b = stack.pop();
                const a = stack.pop();

                switch (token) {
                    case "+":
                        stack.push(a + b);
                        break;
                    case "-":
                        stack.push(a - b);
                        break;
                    case "*":
                        stack.push(a * b);
                        break;
                    case "/":
                        if (b === 0) throw new Error("Division by zero");
                        stack.push(a / b);
                        break;
                }
            }
        });

        return stack[0];
    }
}