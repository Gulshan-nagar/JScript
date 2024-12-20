import { handleVariable } from "./handleVariables.js";
import { handlePrint } from "./handlePrint.js";
import { handleIf } from "./handleIf.js";

document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('run-button');
    const clearButton = document.getElementById('clear-button');
    const editor = document.getElementById('editor');
    const consoleOutput = document.getElementById('console-output');

    var variables = {};

    // Execute entire code
    function executeCode(code) {
        const lines = code.split("\n");
        let output = "";

        for (let line of lines) {
            try {
                output += executeLine(line.trim()) + "\n";
            } catch (error) {
                output += `Error: ${error.message}\n`;
            }
        }

        return output;
    }

    // Execute a single line of code
    function executeLine(line) {

        // Handle variable declaration
        if (line.startsWith("let")) {
            return handleVariable(line, variables);
        }

        // Work here guys :)

        else if (line.startsWith("if")) {
            return handleIf(line, variables);
        }

        else if (line.startsWith("loop")) {
            let loopCountMatch = line.match(/loop\(([^)]+)\)/);
            if (!loopCountMatch || loopCountMatch.length < 2) {
                throw new Error("Invalid loop syntax");
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

            // Extract the code block inside the curly braces using regex
            let codeBlockMatch = line.match(/{([^}]*)}/);
            if (!codeBlockMatch || codeBlockMatch.length < 2) {
                throw new Error("Invalid syntax. Loop block must be enclosed in curly braces. Example: loop(5) { print(x); }");
            }

            let codeBlock = codeBlockMatch[1].trim();
            let result = '';

            // Execute the code inside the loop block 'loopCount' times
            for (let i = 0; i < loopCount; i++) {
                result += `Iteration ${i + 1}:\n`;
                result += executeCode(codeBlock); // Execute the block of code in each iteration
            }

            return result;
        }

        else if (line.startsWith("function")) {
            // return handleFunction(line, variables);
        }

        // Handle print statement
        if (line.startsWith("print")) {
            return handlePrint(line, variables);
        }

    }

    // Run code when Run button is clicked
    runButton.addEventListener('click', () => {
        const code = editor.value || editor.innerText; // Handle both textarea and contenteditable
        const result = executeCode(code);
        consoleOutput.textContent = `Executing code...\n${result}`;
    });

    // Clear editor and console when Clear button is clicked
    clearButton.addEventListener('click', () => {
        editor.value = ''; // For textarea
        editor.innerText = ''; // For contenteditable div
        consoleOutput.textContent = '';
    });
});
