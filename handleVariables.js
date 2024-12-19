import { ExpressionEvaluator } from "./EvaluateEx.js";

export function handleVariable(line, variables) {
    if (line.startsWith("let")) {
        line = line.split("=");
        line[0] = line[0].trim().split(" ");
        let [[variable, name], right] = line;
        if (!name || !variable || !right) throw new Error("Invalid syntax for variable declaration. Example: let x = 10;");
        let value;
        try {
            if (!isNaN(right)) {
                value = right.trim();
            } else {
                right = right.trim().slice(0, right.length - 2);
                const evaluator = new ExpressionEvaluator(variables); // This function is evaluating the variable expressions.
                value = evaluator.evaluate(right);
            }
            if (value === undefined) throw new Error(`Invalid value for variable: "${right}"`);
        } catch (error) {
            return error;
        }
        variables[name] = value;
        return `Variable "${name}" declared with value: ${value}`;
    }
}