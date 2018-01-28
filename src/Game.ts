import { Command, CommandParser } from './Parser';
import Labyrinth from './Labyrinth';
const data = require('./../labyrinths.json');

class Game {
    private labyrinth: Labyrinth;
    private parser = new CommandParser((cmd, arg) =>
        this.handleInput(cmd, arg)
    );

    constructor() {
        this.labyrinth = new Labyrinth(data.labyrinths[0]);
    }

    public play() {
        this.labyrinth.greeting();
        this.gameLoop();
    }

    private gameLoop() {
        this.labyrinth.printCharacterCurrentArea();
        const hazard = this.labyrinth.getCharacterCurrentAreaHazard();
        if (hazard) {
            console.log(hazard.getDesc());
        } else {
            this.labyrinth.printCharacterCurrentAreaItemDesc();
            this.labyrinth.promptAvailableDirections();
        }
        console.log('What would you like to do?');
        this.parser.start();
    }

    private handleInput(cmd: Command, arg: string): boolean {
        switch (cmd) {
            case Command.TAKE:
                this.labyrinth.characterTakeItem(arg);
                break;

            case Command.LOOK:
                this.labyrinth.printCharacterCurrentArea();
                break;

            case Command.USE:
                if (this.labyrinth.characterUseItem(arg)) {
                    this.labyrinth.printCharacterCurrentAreaItemDesc();
                    this.labyrinth.promptAvailableDirections();
                }
                break;

            case Command.INVENTORY:
                this.labyrinth.printCharacterPocket();
                break;

            case Command.GO:
                const hazard = this.labyrinth.getCharacterCurrentAreaHazard();
                if (hazard) {
                    console.log(hazard.getDesc());
                    return true;
                }
                if (this.labyrinth.moveCharacter(arg)) {
                    this.gameLoop();
                }
                break;

            default:
                break;
        }
        return true;
    }
}

export default Game;
