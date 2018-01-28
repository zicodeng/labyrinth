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
                if (this.labyrinth.characterUseItem(arg)) {
                    this.labyrinth.printCharacterCurrentAreaItemDesc();
                    this.labyrinth.promptAvailableDirections();
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

                if (!this.labyrinth.validateMove(arg)) {
                    return true;
                }
                this.labyrinth.setCharacterPosition(arg);
                this.labyrinth.moveMonster();
                this.enterNewArea();

                if (this.labyrinth.encounterMonster()) {
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

                if (
                    this.labyrinth
                        .getCharacterCurrentAreaName()
                        .toLocaleLowerCase() === 'exit'
                ) {
                    if (this.labyrinth.checkForWin()) {
                        console.log(
                            `${this.labyrinth.getCharacterName()}! Congrats, you have found the treasure! You will be honored!`
                        );
                        return false;
                    }
                    console.log(
                        'Seems like you have not found the treasure yet. A true hero will not quit unless he/she finds the treasure.'
                    );
                }

                break;

            default:
                break;
        }
        return true;
    }
}

export default Game;
