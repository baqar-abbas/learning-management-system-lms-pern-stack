const { sequelize, Course, Lesson, Quiz, Option } = require("../models");

async function seed() {
  try {
    await sequelize.sync(); // Do NOT force true to avoid dropping tables

    // Check if the course already exists
    let course = await Course.findOne({
      where: { title: "JavaScript for Beginners" },
    });
    if (!course) {
      course = await Course.create({
        title: "JavaScript for Beginners",
        description: "Learn JavaScript from scratch.",
        status: "published",
      });
    }

    // Full Lessons Data
    const lessonsData = [
      {
        order: 0,
        title: "Introduction to JavaScript",
        content: `JavaScript is a versatile programming language primarily used for web development. It allows you to make web pages interactive and dynamic. You can use it in browsers and on the server-side with Node.js. Basic syntax includes variables, functions, operators, and control flow statements.`,
      },
      {
        order: 1,
        title: "Variables and Data Types",
        content: `Variables store data values. Use 'let' and 'const' for block-scoped variables. Primitive data types include string, number, boolean, null, undefined, and symbol. Understand how to declare and assign variables correctly.`,
      },
      {
        order: 2,
        title: "Operators and Expressions",
        content: `Operators allow you to perform operations on values and variables. Arithmetic operators: +, -, *, /, %. Comparison operators: ==, ===, !=, !==, >, <. Logical operators: &&, ||, !. Expressions combine values, variables, and operators to produce a single value.`,
      },
      {
        order: 3,
        title: "Conditional Statements",
        content: `Conditional statements control program flow based on conditions. Use 'if', 'else if', 'else' statements and ternary operators. Example: if (age >= 18) { console.log("Adult"); } else { console.log("Minor"); }`,
      },
      {
        order: 4,
        title: "Loops in JavaScript",
        content: `Loops execute code repeatedly. 'for' loop for a known number of iterations, 'while' loop for unknown iterations, 'do-while' loop executes at least once. Use loops to iterate arrays and objects efficiently.`,
      },
      {
        order: 5,
        title: "Functions and Scope",
        content: `Functions are reusable code blocks. Declare with 'function name(params) { }' or arrow functions. Scope determines variable visibility: global vs local. Understand return values and parameter passing.`,
      },
      {
        order: 6,
        title: "Arrays and Array Methods",
        content: `Arrays store multiple values. Access elements with index, iterate using loops or array methods. Common methods: push(), pop(), shift(), unshift(), map(), filter(), forEach(). Arrays are foundational for handling lists of data.`,
      },
      {
        order: 7,
        title: "Objects in JavaScript",
        content: `Objects store key-value pairs. Access properties with dot or bracket notation. Methods are functions inside objects. Objects are useful for representing real-world entities and structured data.`,
      },
    ];

    // Quiz data per lesson
    const quizBank = {
      0: [
        {
          question: "JavaScript is primarily used for?",
          options: [
            "Web development",
            "Mobile apps",
            "Database management",
            "Networking",
          ],
          correctOption: "Web development",
        },
        {
          question: "Which environment can run JS code?",
          options: ["Browser", "Server", "Both", "None"],
          correctOption: "Both",
        },
        {
          question: "JS code must be compiled?",
          options: ["Yes", "No", "Sometimes", "Always"],
          correctOption: "No",
        },
        {
          question: "JS is a ______ language?",
          options: ["Programming", "Markup", "Style", "Database"],
          correctOption: "Programming",
        },
        {
          question: "Which symbol starts a single-line comment?",
          options: ["//", "/*", "#", "<!--"],
          correctOption: "//",
        },
      ],
      1: [
        {
          question: "Which keyword declares a block-scoped variable?",
          options: ["var", "let", "const", "function"],
          correctOption: "let",
        },
        {
          question: "What is the type of `true` in JS?",
          options: ["string", "number", "boolean", "object"],
          correctOption: "boolean",
        },
        {
          question: "Which of the following is not a primitive type?",
          options: ["string", "number", "object", "boolean"],
          correctOption: "object",
        },
        {
          question: "What happens if you try to reassign a `const` variable?",
          options: ["Allowed", "Error", "Warning", "Converts to var"],
          correctOption: "Error",
        },
        {
          question: "How do you declare a variable without assigning a value?",
          options: ["let x;", "var x = null;", "const x;", "x = undefined"],
          correctOption: "let x;",
        },
      ],
      2: [
        {
          question: "Which operator is for strict equality?",
          options: ["==", "=", "===", "!="],
          correctOption: "===",
        },
        {
          question: "Which operator is for logical AND?",
          options: ["&&", "||", "!", "=="],
          correctOption: "&&",
        },
        {
          question: "5 + '5' equals?",
          options: ["55", "10", "Error", "NaN"],
          correctOption: "55",
        },
        {
          question: "Which operator compares value only?",
          options: ["==", "===", "=", "!="],
          correctOption: "==",
        },
        {
          question: "Which symbol is modulus operator?",
          options: ["%", "&", "$", "#"],
          correctOption: "%",
        },
      ],
      3: [
        {
          question: "Which statement executes when condition is true?",
          options: ["if", "else", "else if", "switch"],
          correctOption: "if",
        },
        {
          question: "Ternary operator uses symbol?",
          options: ["?", ":", "??", "&&"],
          correctOption: "?",
        },
        {
          question: "Which keyword is used for else block?",
          options: ["else", "elseif", "else if", "if"],
          correctOption: "else",
        },
        {
          question: "Can 'if' exist without 'else'?",
          options: ["Yes", "No", "Sometimes", "Error"],
          correctOption: "Yes",
        },
        {
          question: "Condition inside parentheses must return?",
          options: ["Boolean", "Number", "String", "Object"],
          correctOption: "Boolean",
        },
      ],
      4: [
        {
          question: "Which loop executes at least once?",
          options: ["for", "while", "do-while", "foreach"],
          correctOption: "do-while",
        },
        {
          question: "Which loop is used for known iterations?",
          options: ["for", "while", "do-while", "foreach"],
          correctOption: "for",
        },
        {
          question: "Which loop is used for unknown iterations?",
          options: ["for", "while", "do-while", "foreach"],
          correctOption: "while",
        },
        {
          question: "Which statement breaks a loop?",
          options: ["break", "continue", "return", "stop"],
          correctOption: "break",
        },
        {
          question: "Which statement skips current iteration?",
          options: ["break", "continue", "return", "skip"],
          correctOption: "continue",
        },
      ],
      5: [
        {
          question: "How do you declare a function?",
          options: [
            "function myFunc() {}",
            "func myFunc() {}",
            "def myFunc() {}",
            "var myFunc = function() {}",
          ],
          correctOption: "function myFunc() {}",
        },
        {
          question: "Arrow functions use which symbol?",
          options: ["=>", "->", "==>", "<-"],
          correctOption: "=>",
        },
        {
          question: "Can functions return values?",
          options: ["Yes", "No", "Sometimes", "Never"],
          correctOption: "Yes",
        },
        {
          question: "Variables inside function are in which scope?",
          options: ["Local", "Global", "Block", "Function"],
          correctOption: "Local",
        },
        {
          question: "How to call a function named myFunc?",
          options: ["myFunc()", "call myFunc", "run myFunc()", "func myFunc()"],
          correctOption: "myFunc()",
        },
      ],
      6: [
        {
          question: "Which method adds an element to array end?",
          options: ["push", "pop", "shift", "unshift"],
          correctOption: "push",
        },
        {
          question: "Which method removes last element?",
          options: ["push", "pop", "shift", "unshift"],
          correctOption: "pop",
        },
        {
          question: "Which method iterates array items?",
          options: ["map", "filter", "forEach", "reduce"],
          correctOption: "forEach",
        },
        {
          question: "Which method transforms array items?",
          options: ["map", "filter", "forEach", "reduce"],
          correctOption: "map",
        },
        {
          question: "Which method filters array items?",
          options: ["map", "filter", "forEach", "reduce"],
          correctOption: "filter",
        },
      ],
      7: [
        {
          question: "How to access object property?",
          options: ["dot notation", "bracket notation", "both", "none"],
          correctOption: "both",
        },
        {
          question: "Method inside object is called?",
          options: ["function", "method", "property", "variable"],
          correctOption: "method",
        },
        {
          question: "Objects are immutable?",
          options: ["Yes", "No", "Sometimes", "Always"],
          correctOption: "No",
        },
        {
          question: "Which keyword creates object?",
          options: ["var", "const", "let", "new"],
          correctOption: "new",
        },
        {
          question: "Accessing non-existing property returns?",
          options: ["undefined", "null", "error", "NaN"],
          correctOption: "undefined",
        },
      ],
    };

    for (let l of lessonsData) {
      const [lesson] = await Lesson.findOrCreate({
        where: { title: l.title, courseId: course.id },
        defaults: { ...l, courseId: course.id },
      });

      // Insert quizzes for this lesson
      const quizQuestions = quizBank[l.order];
      for (let q of quizQuestions) {
        const [quiz] = await Quiz.findOrCreate({
          where: { question: q.question, lessonId: lesson.id },
          defaults: { lessonId: lesson.id },
        });

        for (let opt of q.options) {
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

    console.log("Seeding completed!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

seed();
