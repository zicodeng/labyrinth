import { Command, CommandParser } from './Parser';
import Labyrinth from './Labyrinth';
const data = require('./../labyrinth.json');

class Game {
    private labyrinth: Labyrinth;
    private parser = new CommandParser((cmd, arg) =>
        this.handleInput(cmd, arg)
    );

    constructor() {
        this.labyrinth = new Labyrinth(data);
    }

    public play() {
        this.labyrinth.greeting();
        this.enterNewArea();
        this.parser.start();
    }

    private enterNewArea() {
        this.labyrinth.printCharacterCurrentArea();
        const hazard = this.labyrinth.getCharacterCurrentAreaHazard();
        if (hazard) {
            console.log(hazard.getDesc());
        } else {
            this.labyrinth.printCharacterCurrentAreaItemDesc();
            this.labyrinth.promptAvailableDirections();
        }
        console.log('What would you like to do?');
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
                this.labyrinth.characterUseItem(arg);
                if (
                    this.labyrinth.getCharacterCurrentAreaName() ===
                    'Labyrinth Exit'
                ) {
                    return this.onExit();
                }
                break;

            case Command.INVENTORY:
                this.labyrinth.printCharacterPocket();
                break;

            case Command.GO:
                // Prevent character from moving when a hazard is present.
                const hazard = this.labyrinth.getCharacterCurrentAreaHazard();
                if (hazard) {
                    console.log(hazard.getDesc());
                    return true;
                }

                const direction = arg.toLowerCase().trim();
                if (!this.labyrinth.move(direction)) {
                    return true;
                }

                this.enterNewArea();

                if (this.labyrinth.encounterMonster()) {
                    this.labyrinth.printMonster();
                    if (this.labyrinth.canKillMonster()) {
                        console.log(
                            'Seems like you have an appropriate item to take this monster down.'
                        );
                        return true;
                    } else {
                        console.log('You are eaten by the monster.');
                        console.log('GAME OVER');
                        return false;
                    }
                }

                return this.onExit();

            default:
                break;
        }
        return true;
    }

    private onExit(): boolean {
        if (
            this.labyrinth.getCharacterCurrentAreaName() === 'Labyrinth Exit' &&
            this.labyrinth.checkForWin()
        ) {
            console.log(
                `${this.labyrinth.getCharacterName()}! Congrats, you have found the treasure! You will be honored!`
            );
            return false;
        }
        console.log(
            'Seems like you have not found the treasure yet. A true hero will not quit unless he/she finds the treasure.'
        );
        return true;
    }
}

export default Game;
