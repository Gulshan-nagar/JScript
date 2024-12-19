
export function handleLoop(line, variables) {
    console.log(line, line.lastIndexOf("}"));
    // Match loop syntax: loop (i = 0; i < 10; i = i + 1) {
    const loopMatch = line.match(/loop\s*\((.*);(.*);(.*)\)\s*{/);
    if (!loopMatch) {
        throw new Error("Invalid loop syntax");
    }

    const [_, initialization, condition, increment] = loopMatch;
    console.log(line, line.lastIndexOf("}"));

    // Parse initialization
    executeLine(initialization.trim(), variables);

    // Extract the block of code inside the loop
    const loopBodyStartIndex = line.indexOf("{") + 1;
    const loopBodyEndIndex = line.lastIndexOf("}");

    if (loopBodyStartIndex === -1 || loopBodyEndIndex === -1) {
        throw new Error("Invalid loop body. Ensure loop block is wrapped with {}.");
    }

    const block = line
        .slice(loopBodyStartIndex, loopBodyEndIndex)
        .split(";")
        .map((blockLine) => blockLine.trim())
        .filter((blockLine) => blockLine !== "");

    // Execute the loop
    while (evaluateCondition(condition, variables)) {
        for (let blockLine of block) {
            executeLine(blockLine, variables);
        }
        executeLine(increment.trim(), variables);
    }
}

function evaluateCondition(condition, variables) {
    // Replace variables in condition
    for (let variable in variables) {
        condition = condition.replace(new RegExp(`\\b${variable}\\b`, "g"), variables[variable]);
    }

    // Evaluate the condition
    try {
        return Function(`"use strict"; return (${condition})`)();
    } catch (error) {
        throw new Error("Invalid condition: " + condition);
    }
}
