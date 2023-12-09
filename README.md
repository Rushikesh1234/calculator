# Calculator

## Overview
A simple calculator web application built with React.

## Getting Started

### Features
* Basic arithmetic operations (addition, subtraction, multiplication, division)
* Parentheses support
* Clear and backspace functionality
* Responsive design

### Requirements
* Node.js

### Setup
* Install Node.js: [Node.js Download](https://nodejs.org/en)

### Running the Code
* Clone the repository:
```
git clone https://github.com/Rushikesh1234/calculators.git
```
* Navigate to the project directory:
```
cd calculators
```
* Install dependencies:
```
npm install
```
* Run the application locally:
```
npm start
```

### Technologies Used
* React
* JavaScript

### Code Structure / Flow
* **Input Handling**: User input is captured when buttons are clicked.
* **Expression Evaluation**: The input expression is sanitized and evaluated using a custom expression parser.
* **Arithmetic Operations**: Basic arithmetic operations (+, -, *, /) are supported.
* **Parentheses Support**: The calculator respects the order of operations, including parentheses.
* **Clear and Backspace**: Buttons allow clearing the entire input or removing the last character.
* **Responsive Design**: The calculator adapts to different screen sizes for a consistent user experience.

### Algorithm
The calculator utilizes a stack-based algorithm to evaluate mathematical expressions. It follows the order of operations (PEMDAS/BODMAS) and supports parentheses for prioritizing calculations.

The algorithm parses the input expression, converts it to a postfix notation, and then evaluates the expression using a stack.

## Screen Capture for Demonstrating Calculator

https://github.com/Rushikesh1234/calculators/assets/38386736/b2058c9f-aac2-4aa2-8531-be06835606a9
