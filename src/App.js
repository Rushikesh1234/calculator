import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("0");

  const calculateResult = () => {
    try {
      if (input.trim() == 0) {
        setResult("0");
      } else {
        const calculatedResult = evaluateExpression(input);
        setResult(calculatedResult);
      }
    } catch (error) {
      setResult("Error");
    }
  };

  const evaluateExpression = (expression) => {
    const modifiedExpression = expression.replace(/x/g, "*");
    const sanitizedExpression = modifiedExpression.replace(
      /[^\d+\-*/().]/g,
      "",
    );
    return evaluate(sanitizedExpression);
  };

  const evaluate = (expression) => {
    const operators = [];
    const operands = [];

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (char === "(") {
        operators.push(char);
      } else if (char === ")") {
        while (
          operators.length > 0 &&
          operators[operators.length - 1] !== "("
        ) {
          applyOperation(operators.pop(), operands);
        }
        operators.pop();
      } else if (isOperator(char)) {
        while (
          operators.length > 0 &&
          precedence(operators[operators.length - 1]) >= precedence(char)
        ) {
          applyOperation(operators.pop(), operands);
        }
        operators.push(char);
      } else {
        let operand = "";
        while (/\d|\./.test(expression[i])) {
          operand += expression[i];
          i++;
        }
        i--;

        operands.push(parseFloat(operand));
      }
    }

    while (operators.length > 0) {
      applyOperation(operators.pop(), operands);
    }

    return operands[0];
  };

  const applyOperation = (operator, operands) => {
    const b = operands.pop();
    const a = operands.pop();

    switch (operator) {
      case "+":
        operands.push(a + b);
        break;
      case "-":
        operands.push(a - b);
        break;
      case "*":
        operands.push(a * b);
        break;
      case "/":
        operands.push(a / b);
        break;
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  };

  const isOperator = (char) => ["+", "-", "*", "/"].includes(char);

  const precedence = (operator) => {
    switch (operator) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
        return 2;
      default:
        return 0;
    }
  };

  const handleButtonClick = (value) => {
    setInput((prevInput) => prevInput + value);
  };

  const ClearAll = () => {
    setInput("");
    setResult("0");
  };

  const ClearLastInput = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
    setResult("0");
  };

  return (
    <div style={calculatorStyle}>
      <h2 style={titleStyle}>Calculator</h2>
      <div>
        <input style={inputStyle} type="text" value={input} />
      </div>
      <div style={buttonContainerStyle}>
        {[7, 8, 9, "/"].map((number) => (
          <button
            style={buttonStyle}
            key={number}
            onClick={() => handleButtonClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <div style={buttonContainerStyle}>
        {[4, 5, 6, "*"].map((number) => (
          <button
            style={buttonStyle}
            key={number}
            onClick={() => handleButtonClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <div style={buttonContainerStyle}>
        {[1, 2, 3, "-"].map((number) => (
          <button
            style={buttonStyle}
            key={number}
            onClick={() => handleButtonClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <div style={buttonContainerStyle}>
        {[0, "(", ")", "+"].map((number) => (
          <button
            style={buttonStyle}
            key={number}
            onClick={() => handleButtonClick(number)}
          >
            {number}
          </button>
        ))}
      </div>
      <div style={resultButtonContainerStyle}>
        <button style={backspaceButtonStyle} onClick={ClearLastInput}>
          ←
        </button>
        <button style={clearButtonStyle} onClick={ClearAll}>
          C
        </button>
        <button style={calculateButtonStyle} onClick={calculateResult}>
          =
        </button>
      </div>
      <div style={resultContainerStyle}>
        <p style={resultLabelStyle}>Result:</p>
        <div style={resultStyle}>{result}</div>
      </div>
    </div>
  );
};

const calculatorStyle = {
  display: "grid",
  maxWidth: "100%",
  maxHeight: "100%",
  margin: "center",
  alignItems: "center",
  justifyContent: "center",
  background: "#1C1C1C",
  border: "1px solid #ccc",
  borderRadius: "5px",
  padding: "10px",
  fontSize: "2rem",
  boxShadow: "0 0 10px rgba(0, 0, 0, 5)",
};

const titleStyle = {
  textAlign: "center",
  margin: "5px",
  color: "#ffffff",
};

const inputStyle = {
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  border: "1px solid #ccc",
  padding: "8px",
  margin: "5px",
  color: "#ffffff",
  fontSize: "2rem",
  borderRadius: "5px",
  background: "#505050",
};

const buttonContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "10px",
  color: "#D4D4D2",
  borderRadius: "5px",
};

const buttonStyle = {
  background: "#D4D4D2",
  color: "#000000",
  padding: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "2px",
};

const resultButtonContainerStyle = {
  display: "grid",
  alignitems: "center",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "10px",
  padding: "8px",
};

const clearButtonStyle = {
  gridColumn: "span 1",
  background: "#FF9500",
  color: "#fff",
};

const backspaceButtonStyle = {
  gridColumn: "span 1",
  background: "#FF9500",
  color: "#fff",
};

const calculateButtonStyle = {
  gridColumn: "span 1",
  background: "#FF9500",
  color: "#fff",
};

const resultContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const resultLabelStyle = {
  marginLeft: "2px",
  marginRight: "2px",
  color: "#ffffff",
};

const resultStyle = {
  padding: "8px",
  background: "#505050",
  borderRadius: "5px",
  fontSize: "2rem",
  width: "100%",
  margin: "2px",
  color: "#ffffff",
  border: "1px solid #ccc",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
};

export default Calculator;