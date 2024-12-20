export function handleIf(line, variables, codeLines) {
  // Regex to match "if (condition)"
  const conditionRegex = /^if\s*\(([^)]+)\)\s*\{?/;
  const match = conditionRegex.exec(line);

  if (!match) {
      throw new Error("Invalid if statement syntax");
  }

  const condition = match[1].trim(); // Extract condition
  const conditionResult = evaluateCondition(condition, variables);

  if (!conditionResult) {
      return ""; // Skip block if condition is false
  }

  // Execute the block
  return executeBlock(codeLines, variables);
}

function evaluateCondition(condition, variables) {
  // Replace variables with their values
  const expression = condition.replace(/\b\w+\b/g, (name) => {
      if (variables.hasOwnProperty(name)) {
          return variables[name];
      }
      return name; // Keep literals and operators
  });

  // Evaluate the condition
  try {
      return eval(expression); // true or false
  } catch (error) {
      throw new Error(`Error in condition: ${error.message}`);
  }
}

function executeBlock(codeLines, variables) {
  let output = "";
  let block = [];
  let braceCount = 0;

  for (let line of codeLines) {
      if (line.includes("{")) {
          braceCount++;
      }
      if (line.includes("}")) {
          braceCount--;
      }

      block.push(line.trim());
      if (braceCount === 0) break;
  }

  // Execute each line in the block
  for (const statement of block) {
      if (statement.startsWith("print")) {
          const printContent = statement.match(/print\s+"([^"]+)"/);
          if (printContent) {
              output += printContent[1] + "\n";
          } else {
              throw new Error("Invalid print statement inside if block");
          }
      } else if (statement.startsWith("let")) {
          const [_, name, value] = statement.match(/let\s+(\w+)\s*=\s*(.+)/) || [];
          if (name && value) {
              variables[name] = eval(value);
          } else {
              throw new Error("Invalid variable declaration inside if block");
          }
      }
  }

  return output.trim();
}
