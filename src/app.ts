import {Command, CommandParser} from './Parser';

//example input handler function
function handleInput(cmd:Command, arg:string):boolean {
  console.log("Handling", cmd, "with argument '"+arg+"'");
  return true; //should prompt for another input
}

//example of using the CommandParser
let parser = new CommandParser(handleInput);
console.log('Input a command:')
parser.start();
