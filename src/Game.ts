import { Command, CommandParser } from './Parser';

class Game {
    constructor() {}

    public play() {
        let parser = new CommandParser(this.handleInput);
        console.log('Input a command:');
        parser.start();
    }

    private handleInput(cmd: Command, arg: string): boolean {
        console.log('Handling', cmd, "with argument '" + arg + "'");
        return true;
    }
}

export default Game;
