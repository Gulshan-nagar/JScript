import { handleVariable } from "./handleVariables.js";
import { handlePrint } from "./handlePrint.js";
import { handleFunction } from "./handleFunction.js";

document.addEventListener('DOMContentLoaded', () => {
    const runButton = document.getElementById('run-button');
    const clearButton = document.getElementById('clear-button');
    const editor = document.getElementById('editor');
    const consoleOutput = document.getElementById('console-output');

    var variables = {};
    // Execute entire code
    function executeCode(code) {
        let lines = code.split("\n");
        let output = "";

        while (lines.length > 0) {
            let line = lines.shift().trim();
            if(line === "") continue;
            try {
                output += executeLine(line, lines) + "\n";
            } catch (error) {
                output += `Error: ${error.message}\n`;
            }
        }

        return output;
    }

    // Execute a single line of code
    function executeLine(line, lines) {

        // Handle variable declaration
        if (line.startsWith("let")) {
            return handleVariable(line, variables);
        }

        // Work here guys :)

        else if (line.startsWith("if")) {
            // return handleIf(line, variables);
        }

        else if (line.startsWith("loop")) {
            // return handleLoop(line, variables);
        }

        else if (line.startsWith("function")) {
            let functionLines = [line];
            let bracesCount = 1;

            while(bracesCount > 0){
                let nextLines = lines.shift().trim();

                functionLines.push(nextLines);

                if(nextLines.includes("{")) bracesCount++;
                if(nextLines.includes("}")) bracesCount--;
            }
            return handleFunction(functionLines, variables);
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
