"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
//example input handler function
function handleInput(cmd, arg) {
    console.log("Handling", cmd, "with argument '" + arg + "'");
    return true; //should prompt for another input
}
//example of using the CommandParser
let parser = new Parser_1.CommandParser(handleInput);
console.log('Input a command:');
parser.start();
//# sourceMappingURL=app.js.map