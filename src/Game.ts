import { Command, CommandParser } from './Parser';
import Labyrinth from './Labyrinth';
const data = require('./../labyrinths.json');

class Game {
    private labyrinth: Labyrinth;

    constructor() {
        this.labyrinth = new Labyrinth(data.labyrinths[0]);
    }

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
