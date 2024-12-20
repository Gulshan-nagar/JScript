export function handleLoop(line, variables, executeCode) {
    // Ensure the line starts with 'loop' and follows the correct syntax
    if (line.startsWith("loop")) {
        // Extract the loop count from the line using regex to find the number in parentheses
        let loopCountMatch = line.match(/loop\(([^)]+)\)/);
        if (!loopCountMatch || loopCountMatch.length < 2) {
            throw new Error("Invalid syntax for loop. Example: loop(5) { ... }");
        }

        let loopCount = loopCountMatch[1].trim();

        // Ensure the loop count is a valid number or a defined variable
        if (isNaN(loopCount)) {
            if (variables[loopCount] === undefined) {
                throw new Error(`Undefined variable "${loopCount}" used in loop.`);
            }
            loopCount = variables[loopCount];
        } else {
            loopCount = parseInt(loopCount, 10);
        }

        // Extract the code block inside the curly braces
        let codeBlockMatch = line.match(/{([\s\S]*)}/); // [\s\S] handles multiple lines within the block
        if (!codeBlockMatch || codeBlockMatch.length < 2) {
            throw new Error("Invalid syntax. Loop block must be enclosed in curly braces. Example: loop(5) { print(x); }");
        }

        let codeBlock = codeBlockMatch[1].trim();
        let result = '';

        // Execute the code block 'loopCount' times
        for (let i = 0; i < loopCount; i++) {
            result += `Iteration ${i + 1}:\n`;

            // Split the block of code into individual lines
            const lines = codeBlock.split('\n').map(line => line.trim()).filter(line => line.length > 0);

            // Execute each line inside the loop
            for (let codeLine of lines) {
                result += executeCode(codeLine) + '\n'; // Execute each line and collect the result
            }
        }

        return result;
    } else {
        throw new Error("Invalid loop syntax.");
    }
}
