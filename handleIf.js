export function handleIf(line, variables) {
    // Define a regex pattern to match if, else if, and else blocks
    const ifRegex = /if\s*\(([^)]+)\)\s*\{([^}]*)\}/;
    const elseIfRegex = /else\s+if\s*\(([^)]+)\)\s*\{([^}]*)\}/;
    const elseRegex = /else\s*\{([^}]*)\}/;

    if (line.startsWith("if")) {
        const match = line.match(ifRegex);
        if (!match) throw new Error("Invalid syntax for if statement. Example: if (x > 10) { print(x); }");

        const condition = match[1].trim();
        const body = match[2].trim();

        if (evaluateCondition(condition, variables)) {
            return executeBlock(body, variables);
        }
    } else if (line.startsWith("else if")) {
        const match = line.match(elseIfRegex);
        if (!match) throw new Error("Invalid syntax for else if statement. Example: else if (x > 10) { print(x); }");

        const condition = match[1].trim();
        const body = match[2].trim();

        if (evaluateCondition(condition, variables)) {
            return executeBlock(body, variables);
        }
    } else if (line.startsWith("else")) {
        const match = line.match(elseRegex);
        if (!match) throw new Error("Invalid syntax for else statement. Example: else { print(x); }");

        const body = match[1].trim();
        return executeBlock(body, variables);
    }

    throw new Error("No matching condition in if-else block.");
}

// Evaluate the condition of an if/else if statement
function evaluateCondition(condition, variables) {
    const evaluator = new ExpressionEvaluator(variables); // Use the existing ExpressionEvaluator
    try {
        return !!evaluator.evaluate(condition); // Convert to boolean
    } catch (error) {
        throw new Error(`Invalid condition: ${condition}`);
    }
}

// Execute the block of code inside if/else if/else
function executeBlock(body, variables) {
    const lines = body.split(";");
    let output = "";

    for (let line of lines) {
        line = line.trim();
        if (line) {
            output += executeLine(line, variables) + "\n"; // Use executeLine from `main.js`
        }
    }

    return output.trim();
}
