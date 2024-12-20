import { ExpressionEvaluator } from "./EvaluateEx.js";

export function handlePrint(line, variables) {
    if (line.startsWith("print")) {
        line = line.split("(");
        let [print, right] = line;
        if (right.endsWith(");")) {
            right = right.slice(0, right.length - 2);
        }
        else if (right.endsWith(")")) {
            right = right.slice(0, right.length - 1);
        }
        else {
            throw new Error("Invalid syntax for print statement. Example: print(x);");
        }
        if (right.startsWith("\"") && right.endsWith("\"")) {
            return right.slice(1, -1); // Remove surrounding quotes
        }
        else {
            right = right.trim();
        }
        console.log(variables.hasOwnProperty(right));
        const evaluator = new ExpressionEvaluator(variables);
        return evaluator.evaluate(right);
    }
}