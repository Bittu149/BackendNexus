const {sum,Sub} = require("./Second"); // common js module system CJS
console.log("Hello, I am First");


sum(3,4);
Sub(5,2);
// I need second.js code in my first.js file
// iife ko dekhna hai mdn docs me 