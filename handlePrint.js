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
        if (!isNaN(right)) {
            return right;
        } else {
            right = right.trim();
        }
        const evaluator = new ExpressionEvaluator(variables);
        return evaluator.evaluate(right);
    }
}