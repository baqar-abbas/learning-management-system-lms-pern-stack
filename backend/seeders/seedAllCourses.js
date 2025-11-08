const { sequelize, Course, Lesson, Quiz, Option } = require("../models");

// Courses to seed (excluding "JavaScript for Beginners")
const coursesData = [
  {
    title: "C++",
    description: "Learn C++ from scratch by Robert Lafore",
    status: "published",
    lessons: [
      {
        order: 0,
        title: "Introduction to C++",
        content: `C++ is a general-purpose programming language created by Bjarne Stroustrup. It is widely used for system/software development, game development, and competitive programming. Basic syntax includes variables, functions, and classes.`,
        quizzes: [
          {
            question: "Who created C++?",
            options: [
              "Bjarne Stroustrup",
              "Dennis Ritchie",
              "James Gosling",
              "Guido van Rossum",
            ],
            correctOption: "Bjarne Stroustrup",
          },
          {
            question: "C++ is a ____ language?",
            options: [
              "Procedural",
              "Object-Oriented",
              "Functional",
              "All of the above",
            ],
            correctOption: "All of the above",
          },
          {
            question: "Which operator is used for scope resolution?",
            options: ["::", ".", "->", ":"],
            correctOption: "::",
          },
          {
            question: "C++ supports which memory management?",
            options: ["Automatic", "Manual", "Both", "None"],
            correctOption: "Both",
          },
          {
            question: "Which header is required for input/output?",
            options: ["<iostream>", "<stdio.h>", "<stdlib.h>", "<conio.h>"],
            correctOption: "<iostream>",
          },
        ],
      },
      {
        order: 1,
        title: "Variables and Data Types in C++",
        content: `C++ variables store data values. Types include int, float, double, char, bool, and string. Understanding variable declaration, initialization, and scope is crucial.`,
        quizzes: [
          {
            question: "Which type is used for integer values?",
            options: ["int", "float", "char", "bool"],
            correctOption: "int",
          },
          {
            question: "Which keyword declares a constant?",
            options: ["const", "let", "var", "#define"],
            correctOption: "const",
          },
          {
            question: "C++ boolean values are?",
            options: ["true/false", "1/0", "Yes/No", "On/Off"],
            correctOption: "true/false",
          },
          {
            question: "Floating-point type with double precision?",
            options: ["float", "double", "int", "char"],
            correctOption: "double",
          },
          {
            question: "Character type in C++?",
            options: ["char", "string", "text", "letter"],
            correctOption: "char",
          },
        ],
      },
      {
        order: 2,
        title: "Operators and Expressions in C++",
        content: `C++ operators include arithmetic (+, -, *, /, %), comparison (==, !=, >, <), logical (&&, ||, !), and bitwise operators. Expressions combine variables and operators to produce values.`,
        quizzes: [
          {
            question: "Which operator is for modulo?",
            options: ["%", "&", "*", "/"],
            correctOption: "%",
          },
          {
            question: "Logical AND operator?",
            options: ["&&", "||", "!", "&"],
            correctOption: "&&",
          },
          {
            question: "Equality comparison operator?",
            options: ["==", "=", "!=", "<>"],
            correctOption: "==",
          },
          {
            question: "Increment operator?",
            options: ["++", "+", "--", "**"],
            correctOption: "++",
          },
          {
            question:
              "Expression combining values to produce one value is called?",
            options: ["Expression", "Statement", "Function", "Operator"],
            correctOption: "Expression",
          },
        ],
      },
      {
        order: 3,
        title: "Conditional Statements in C++",
        content: `Conditional statements allow you to execute code based on conditions. Use if, else if, else, and switch statements to control program flow.`,
        quizzes: [
          {
            question: "Which keyword starts a conditional statement?",
            options: ["if", "switch", "while", "for"],
            correctOption: "if",
          },
          {
            question: "Which keyword executes alternative code if 'if' fails?",
            options: ["else", "elif", "elseif", "switch"],
            correctOption: "else",
          },
          {
            question: "Switch statement requires what?",
            options: ["cases", "loops", "functions", "variables"],
            correctOption: "cases",
          },
          {
            question: "Can if statements be nested?",
            options: ["Yes", "No", "Sometimes", "Depends on compiler"],
            correctOption: "Yes",
          },
          {
            question: "Ternary operator is used as?",
            options: ["Inline if", "Loop", "Function", "Variable"],
            correctOption: "Inline if",
          },
        ],
      },
      {
        order: 4,
        title: "Loops in C++",
        content: `Loops allow repeated execution of code. Common loops: for, while, and do-while. Loops are useful for iterating over arrays and performing repeated tasks.`,
        quizzes: [
          {
            question: "Which loop executes at least once?",
            options: ["for", "while", "do-while", "foreach"],
            correctOption: "do-while",
          },
          {
            question: "Loop with known iteration count?",
            options: ["for", "while", "do-while", "foreach"],
            correctOption: "for",
          },
          {
            question: "Loop with unknown iterations?",
            options: ["for", "while", "do-while", "foreach"],
            correctOption: "while",
          },
          {
            question: "Which statement exits a loop?",
            options: ["break", "continue", "return", "skip"],
            correctOption: "break",
          },
          {
            question: "Statement to skip current iteration?",
            options: ["break", "continue", "return", "skip"],
            correctOption: "continue",
          },
        ],
      },
      {
        order: 5,
        title: "Functions in C++",
        content: `Functions are reusable blocks of code. Declare with return type, name, and parameters. Functions improve code modularity and readability.`,
        quizzes: [
          {
            question: "How do you declare a function?",
            options: [
              "returnType functionName(params) {}",
              "func name() {}",
              "def name() {}",
              "function name() {}",
            ],
            correctOption: "returnType functionName(params) {}",
          },
          {
            question: "Functions can return?",
            options: ["Values", "Nothing", "Both", "Depends on type"],
            correctOption: "Both",
          },
          {
            question: "Function parameters are used for?",
            options: ["Input values", "Output values", "Loops", "Variables"],
            correctOption: "Input values",
          },
          {
            question: "Which keyword calls a function?",
            options: [
              "functionName()",
              "call functionName",
              "run functionName()",
              "execute functionName()",
            ],
            correctOption: "functionName()",
          },
          {
            question: "Can functions be overloaded?",
            options: ["Yes", "No", "Sometimes", "Depends on compiler"],
            correctOption: "Yes",
          },
        ],
      },
      {
        order: 6,
        title: "Arrays and Strings in C++",
        content: `Arrays store multiple elements of the same type. Strings are character arrays. Access elements via index, and iterate using loops.`,
        quizzes: [
          {
            question: "Array index starts from?",
            options: ["0", "1", "-1", "Depends on type"],
            correctOption: "0",
          },
          {
            question: "String is a type of?",
            options: ["Array", "Class", "Function", "Variable"],
            correctOption: "Array",
          },
          {
            question: "Access array element?",
            options: ["arr[index]", "arr.index", "arr->index", "arr{index}"],
            correctOption: "arr[index]",
          },
          {
            question: "Change array value at index?",
            options: [
              "arr[index]=value",
              "arr.value=index",
              "arr[index]==value",
              "arr[index]->value",
            ],
            correctOption: "arr[index]=value",
          },
          {
            question: "Length of array?",
            options: ["Depends on type", "Fixed", "Dynamic", "Unknown"],
            correctOption: "Depends on type",
          },
        ],
      },
      {
        order: 7,
        title: "Classes and Objects in C++",
        content: `C++ supports object-oriented programming. Classes are blueprints, and objects are instances. Use constructors, methods, and access specifiers to manage properties and behavior.`,
        quizzes: [
          {
            question: "What is a class?",
            options: ["Blueprint for objects", "Function", "Variable", "Array"],
            correctOption: "Blueprint for objects",
          },
          {
            question: "Object is an instance of?",
            options: ["Class", "Function", "Array", "Operator"],
            correctOption: "Class",
          },
          {
            question: "Constructor is used to?",
            options: [
              "Initialize objects",
              "Destroy objects",
              "Call function",
              "Allocate memory",
            ],
            correctOption: "Initialize objects",
          },
          {
            question: "Access specifiers include?",
            options: [
              "public, private, protected",
              "int, float, char",
              "if, else, switch",
              "class, object, method",
            ],
            correctOption: "public, private, protected",
          },
          {
            question: "Methods in class are?",
            options: ["Functions", "Variables", "Objects", "Operators"],
            correctOption: "Functions",
          },
        ],
      },
    ],
  },
  // JavaScript Mastery and Web Development Basics will be filled similarly
  {
    title: "JavaScript Mastery",
    description: "A complete JS course from beginner to advanced",
    status: "published",
    lessons: [
      {
        order: 0,
        title: "Advanced JavaScript Concepts",
        content: `Covers closures, callbacks, promises, async/await, ES6+ features like spread/rest, destructuring, modules.`,
        quizzes: [
          {
            question: "What is a closure?",
            options: [
              "A function with access to outer scope",
              "A class method",
              "An object property",
              "A variable",
            ],
            correctOption: "A function with access to outer scope",
          },
          {
            question: "Promise resolves with?",
            options: ["Value", "Function", "Object", "Error"],
            correctOption: "Value",
          },
          {
            question: "Which keyword defines block scope?",
            options: ["let", "var", "const", "function"],
            correctOption: "let",
          },
          {
            question: "Async function returns?",
            options: ["Promise", "Value", "Function", "Array"],
            correctOption: "Promise",
          },
          {
            question: "Destructuring is used for?",
            options: [
              "Extracting values",
              "Looping",
              "Conditionals",
              "Functions",
            ],
            correctOption: "Extracting values",
          },
        ],
      },
      {
        order: 1,
        title: "DOM Manipulation",
        content: `Learn how to access and manipulate HTML elements using JavaScript. Covers selectors, events, creating and removing elements dynamically.`,
        quizzes: [
          {
            question: "Which method selects elements by ID?",
            options: [
              "getElementById",
              "querySelectorAll",
              "getElementsByClassName",
              "getElementsByTagName",
            ],
            correctOption: "getElementById",
          },
          {
            question: "Add event listener using?",
            options: [
              "addEventListener",
              "attachEvent",
              "onEvent",
              "listenEvent",
            ],
            correctOption: "addEventListener",
          },
          {
            question: "Inner HTML content access?",
            options: ["innerHTML", "textContent", "value", "content"],
            correctOption: "innerHTML",
          },
          {
            question: "Remove an element from DOM?",
            options: ["remove()", "delete()", "destroy()", "detach()"],
            correctOption: "remove()",
          },
          {
            question: "Create a new element?",
            options: [
              "document.createElement()",
              "createNode()",
              "new Element()",
              "document.newElement()",
            ],
            correctOption: "document.createElement()",
          },
        ],
      },
      {
        order: 2,
        title: "Events in JavaScript",
        content: `Learn about event types, bubbling, delegation, and how to handle user interactions effectively.`,
        quizzes: [
          {
            question: "Event bubbling is?",
            options: [
              "Events propagate from child to parent",
              "Events propagate from parent to child",
              "Event stops immediately",
              "Only works on buttons",
            ],
            correctOption: "Events propagate from child to parent",
          },
          {
            question: "Event delegation allows?",
            options: [
              "Handling events on parent for children",
              "Stopping event propagation",
              "Binding multiple events",
              "Creating custom events",
            ],
            correctOption: "Handling events on parent for children",
          },
          {
            question: "Prevent default action method?",
            options: [
              "event.preventDefault()",
              "stopPropagation()",
              "return false",
              "event.stop()",
            ],
            correctOption: "event.preventDefault()",
          },
          {
            question: "Which event triggers when page loads?",
            options: ["load", "click", "DOMContentLoaded", "mouseover"],
            correctOption: "load",
          },
          {
            question: "Attach event using HTML attribute?",
            options: ["onclick", "onhover", "onchange", "onselect"],
            correctOption: "onclick",
          },
        ],
      },
      {
        order: 3,
        title: "ES6 Classes",
        content: `Introduction to ES6 classes, constructor, methods, inheritance, and static properties.`,
        quizzes: [
          {
            question: "How to define a class in ES6?",
            options: [
              "class MyClass {}",
              "function MyClass() {}",
              "object MyClass {}",
              "var MyClass = {}",
            ],
            correctOption: "class MyClass {}",
          },
          {
            question: "Constructor method is used for?",
            options: [
              "Initializing object",
              "Deleting object",
              "Calling function",
              "Static method",
            ],
            correctOption: "Initializing object",
          },
          {
            question: "Static methods are called on?",
            options: ["Class itself", "Instance", "Both", "None"],
            correctOption: "Class itself",
          },
          {
            question: "Inheritance uses which keyword?",
            options: ["extends", "implements", "super", "inherit"],
            correctOption: "extends",
          },
          {
            question: "Super keyword is used for?",
            options: [
              "Calling parent constructor",
              "Declaring variable",
              "Creating object",
              "Deleting object",
            ],
            correctOption: "Calling parent constructor",
          },
        ],
      },
      {
        order: 4,
        title: "Modules in JavaScript",
        content: `Learn about ES6 modules: export, import, default export, and organizing code.`,
        quizzes: [
          {
            question: "Default export syntax?",
            options: [
              "export default function()",
              "export function()",
              "module.exports = function()",
              "export function default()",
            ],
            correctOption: "export default function()",
          },
          {
            question: "Import default module?",
            options: [
              "import MyModule from './file.js'",
              "import {MyModule} from './file.js'",
              "require('./file.js')",
              "module.import('./file.js')",
            ],
            correctOption: "import MyModule from './file.js'",
          },
          {
            question: "Named exports use?",
            options: [
              "export {name}",
              "export default",
              "export name",
              "export class",
            ],
            correctOption: "export {name}",
          },
          {
            question: "Import named export?",
            options: [
              "import {name} from './file.js'",
              "import name from './file.js'",
              "require('name')",
              "import name() from './file.js'",
            ],
            correctOption: "import {name} from './file.js'",
          },
          {
            question: "Modules help in?",
            options: [
              "Code organization",
              "Styling",
              "Debugging only",
              "Loops",
            ],
            correctOption: "Code organization",
          },
        ],
      },
      {
        order: 5,
        title: "Async JavaScript",
        content: `Promises, async/await, and handling asynchronous operations effectively.`,
        quizzes: [
          {
            question: "Promise rejects with?",
            options: ["Error", "Value", "Function", "Object"],
            correctOption: "Error",
          },
          {
            question: "Await keyword works inside?",
            options: ["async function", "regular function", "class", "object"],
            correctOption: "async function",
          },
          {
            question: "Then method is used for?",
            options: [
              "Handling resolved promise",
              "Rejecting promise",
              "Creating promise",
              "Stopping async function",
            ],
            correctOption: "Handling resolved promise",
          },
          {
            question: "Catch method is used for?",
            options: [
              "Handling rejected promise",
              "Creating function",
              "Looping",
              "Event handling",
            ],
            correctOption: "Handling rejected promise",
          },
          {
            question: "Async functions always return?",
            options: ["Promise", "Value", "Array", "Object"],
            correctOption: "Promise",
          },
        ],
      },
      {
        order: 6,
        title: "Error Handling",
        content: `Learn try, catch, finally, throw and custom error handling in JS.`,
        quizzes: [
          {
            question: "Keyword to throw error?",
            options: ["throw", "catch", "try", "finally"],
            correctOption: "throw",
          },
          {
            question: "Try block is for?",
            options: ["Code to test", "Catch error", "Finally code", "Looping"],
            correctOption: "Code to test",
          },
          {
            question: "Catch block is for?",
            options: [
              "Handling error",
              "Throwing error",
              "Executing finally",
              "Defining function",
            ],
            correctOption: "Handling error",
          },
          {
            question: "Finally block executes?",
            options: ["Always", "Sometimes", "Never", "Only on error"],
            correctOption: "Always",
          },
          {
            question: "Custom error created using?",
            options: [
              "new Error()",
              "throw Error()",
              "Error()",
              "function Error()",
            ],
            correctOption: "new Error()",
          },
        ],
      },
      {
        order: 7,
        title: "Web APIs",
        content: `Working with browser Web APIs like Fetch API, LocalStorage, SessionStorage, and DOM API.`,
        quizzes: [
          {
            question: "Fetch API is used for?",
            options: [
              "Making HTTP requests",
              "Styling DOM",
              "Creating loops",
              "Handling classes",
            ],
            correctOption: "Making HTTP requests",
          },
          {
            question: "LocalStorage stores data in?",
            options: ["Browser", "Server", "Database", "Memory"],
            correctOption: "Browser",
          },
          {
            question: "SessionStorage clears data when?",
            options: [
              "Session ends",
              "Page reloads",
              "Browser closes",
              "Never",
            ],
            correctOption: "Session ends",
          },
          {
            question: "DOM API allows?",
            options: [
              "Manipulating HTML elements",
              "Creating backend API",
              "Styling CSS",
              "Handling loops",
            ],
            correctOption: "Manipulating HTML elements",
          },
          {
            question: "Method to store data in LocalStorage?",
            options: [
              "localStorage.setItem()",
              "localStorage.add()",
              "localStorage.save()",
              "localStorage.put()",
            ],
            correctOption: "localStorage.setItem()",
          },
        ],
      },
    ],
  },
  {
    title: "Web Development Basics",
    description: "Learn HTML, CSS, JS, and basic front-end skills",
    status: "published",
    lessons: [
      {
        order: 0,
        title: "HTML Basics",
        content: `HTML is the standard markup language for creating web pages. Covers elements, tags, attributes, and structure.`,
        quizzes: [
          {
            question: "What does HTML stand for?",
            options: [
              "HyperText Markup Language",
              "Hyperlink Text Management Language",
              "HighText Markup Language",
              "Hyper Transfer Markup Language",
            ],
            correctOption: "HyperText Markup Language",
          },
          {
            question: "HTML tags are enclosed in?",
            options: ["<>", "()", "{}", "[]"],
            correctOption: "<>",
          },
          {
            question: "Main document structure tag?",
            options: ["<!DOCTYPE html>", "<html>", "<head>", "<body>"],
            correctOption: "<!DOCTYPE html>",
          },
          {
            question: "Which tag adds a link?",
            options: ["<a>", "<link>", "<href>", "<anchor>"],
            correctOption: "<a>",
          },
          {
            question: "HTML comments are written as?",
            options: [
              "<!-- Comment -->",
              "// Comment",
              "/* Comment */",
              "# Comment",
            ],
            correctOption: "<!-- Comment -->",
          },
        ],
      },
      {
        order: 1,
        title: "CSS Basics",
        content: `CSS styles HTML elements. Covers selectors, properties, box model, positioning, flexbox, and grid.`,
        quizzes: [
          {
            question: "What does CSS stand for?",
            options: [
              "Cascading Style Sheets",
              "Computer Style Sheets",
              "Creative Style Sheets",
              "Colorful Style Sheets",
            ],
            correctOption: "Cascading Style Sheets",
          },
          {
            question: "CSS property to change text color?",
            options: ["color", "font-color", "text-color", "font-style"],
            correctOption: "color",
          },
          {
            question: "CSS box model includes?",
            options: [
              "margin, border, padding, content",
              "width, height, color",
              "display, position, float",
              "none of the above",
            ],
            correctOption: "margin, border, padding, content",
          },
          {
            question: "Flex container defined by?",
            options: [
              "display: flex;",
              "display: block;",
              "display: grid;",
              "display: inline;",
            ],
            correctOption: "display: flex;",
          },
          {
            question: "Grid layout uses?",
            options: [
              "display: grid;",
              "display: flex;",
              "position: grid;",
              "grid-template: layout;",
            ],
            correctOption: "display: grid;",
          },
        ],
      },
      {
        order: 2,
        title: "JavaScript Introduction",
        content: `Introduction to JS syntax, variables, data types, operators, conditionals, loops, and functions.`,
        quizzes: [
          {
            question: "JS stands for?",
            options: ["JavaScript", "JavaSyntax", "JustScript", "JScript"],
            correctOption: "JavaScript",
          },
          {
            question: "Variable declaration with ES6?",
            options: ["let", "var", "const", "All"],
            correctOption: "All",
          },
          {
            question: "Equality operator?",
            options: ["==", "=", "!=", "<>"],
            correctOption: "==",
          },
          {
            question: "Block scope variable?",
            options: ["let", "var", "const", "function"],
            correctOption: "let",
          },
          {
            question: "Function definition?",
            options: [
              "function name(){}",
              "def name(){}",
              "fun name(){}",
              "func name(){}",
            ],
            correctOption: "function name(){}",
          },
        ],
      },
      {
        order: 3,
        title: "DOM and Events",
        content: `Manipulating DOM elements and handling user interactions with JS events.`,
        quizzes: [
          {
            question: "Select element by ID?",
            options: [
              "getElementById",
              "querySelector",
              "getElementsByClassName",
              "All",
            ],
            correctOption: "getElementById",
          },
          {
            question: "Event listener method?",
            options: [
              "addEventListener",
              "onEvent",
              "attachEvent",
              "listenEvent",
            ],
            correctOption: "addEventListener",
          },
          {
            question: "Click event type?",
            options: ["click", "onclick", "mouseClick", "onClick"],
            correctOption: "click",
          },
          {
            question: "Change inner HTML?",
            options: ["innerHTML", "textContent", "value", "content"],
            correctOption: "innerHTML",
          },
          {
            question: "Remove element?",
            options: ["remove()", "delete()", "destroy()", "detach()"],
            correctOption: "remove()",
          },
        ],
      },
      {
        order: 4,
        title: "Responsive Design",
        content: `Learn media queries, flexible layouts, and mobile-first design principles.`,
        quizzes: [
          {
            question: "Media queries in CSS?",
            options: ["@media", "@screen", "@responsive", "@query"],
            correctOption: "@media",
          },
          {
            question: "Mobile-first approach?",
            options: [
              "Design small to large",
              "Design large to small",
              "Any",
              "None",
            ],
            correctOption: "Design small to large",
          },
          {
            question: "Flexible layouts use?",
            options: ["%, vw, vh", "px", "pt", "em"],
            correctOption: "%, vw, vh",
          },
          {
            question: "CSS property for flexbox?",
            options: [
              "display:flex",
              "display:block",
              "display:grid",
              "display:inline",
            ],
            correctOption: "display:flex",
          },
          {
            question: "Grid uses?",
            options: ["display:grid", "display:flex", "float", "position"],
            correctOption: "display:grid",
          },
        ],
      },
      {
        order: 5,
        title: "Deployment Basics",
        content: `Learn how to deploy websites using GitHub Pages, Netlify, or Vercel.`,
        quizzes: [
          {
            question: "GitHub Pages hosts?",
            options: [
              "Static sites",
              "Dynamic sites",
              "Backend API",
              "Database",
            ],
            correctOption: "Static sites",
          },
          {
            question: "Netlify used for?",
            options: ["Deploy websites", "Create API", "Database", "Backend"],
            correctOption: "Deploy websites",
          },
          {
            question: "Vercel best for?",
            options: ["Next.js", "PHP", "Python", "Java"],
            correctOption: "Next.js",
          },
          {
            question: "Free hosting?",
            options: ["Yes", "No", "Sometimes", "Depends"],
            correctOption: "Yes",
          },
          {
            question: "Domain mapping possible?",
            options: ["Yes", "No", "Only paid", "Depends"],
            correctOption: "Yes",
          },
        ],
      },
    ],
  },
];

async function seed() {
  try {
    await sequelize.sync();

    for (const c of coursesData) {
      let course = await Course.findOne({ where: { title: c.title } });
      if (!course) {
        course = await Course.create({
          title: c.title,
          description: c.description,
          status: c.status,
        });
      }

      for (const l of c.lessons) {
        const [lesson] = await Lesson.findOrCreate({
          where: { title: l.title, courseId: course.id },
          defaults: { ...l, courseId: course.id },
        });

        for (const q of l.quizzes) {
          const [quiz] = await Quiz.findOrCreate({
            where: { question: q.question, lessonId: lesson.id },
            defaults: { lessonId: lesson.id },
          });

          for (const opt of q.options) {
            await Option.findOrCreate({
              where: { text: opt, quizId: quiz.id },
              defaults: {
                text: opt,
                isCorrect: opt === q.correctOption,
                quizId: quiz.id,
              },
            });
          }
        }
      }
    }

    console.log("Remaining courses seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
