import { handleVariable } from "./handleVariables.js";
import { handlePrint } from "./handlePrint.js";
import { handleIf } from "./handleIf.js";
import { handleLoop } from "./handleLoop.js";

var variables = {};
document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('run-button');
    const clearButton = document.getElementById('clear-button');
    const editor = document.getElementById('editor');
    console.log(editor);
    const consoleOutput = document.getElementById('console-output');

    
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
        return handleLoop(line, variables, executeCode);
    }

    else if (line.startsWith("function")) {
        // return handleFunction(line, variables);
    }

    // Handle print statement
    if (line.startsWith("print")) {
        return handlePrint(line, variables);
    }

}

