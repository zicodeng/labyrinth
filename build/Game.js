"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./Parser");
const Labyrinth_1 = require("./Labyrinth");
const data = require('./../labyrinth.json');
class Game {
    constructor() {
        this.parser = new Parser_1.CommandParser((cmd, arg) => this.handleInput(cmd, arg));
        this.labyrinth = new Labyrinth_1.default(data);
    }
    play() {
        this.labyrinth.greeting();
        this.enterNewArea();
        this.parser.start();
    }
    enterNewArea() {
        this.labyrinth.printCharacterCurrentArea();
        const hazard = this.labyrinth.getCharacterCurrentAreaHazard();
        if (hazard) {
            console.log(hazard.getDesc());
        }
        else {
            this.labyrinth.printCharacterCurrentAreaItemDesc();
            this.labyrinth.promptAvailableDirections();
        }
        console.log('What would you like to do?');
    }
    handleInput(cmd, arg) {
        switch (cmd) {
            case Parser_1.Command.TAKE:
                this.labyrinth.characterTakeItem(arg);
                break;
            case Parser_1.Command.LOOK:
                this.labyrinth.printCharacterCurrentArea();
                break;
            case Parser_1.Command.USE:
                this.labyrinth.characterUseItem(arg);
                if (this.labyrinth.getCharacterCurrentAreaName() ===
                    'Labyrinth Exit') {
                    return this.onExit();
                }
                break;
            case Parser_1.Command.INVENTORY:
                this.labyrinth.printCharacterPocket();
                break;
            case Parser_1.Command.GO:
                // Prevent character from moving when a hazard is present.
                const hazard = this.labyrinth.getCharacterCurrentAreaHazard();
                if (hazard) {
                    console.log(hazard.getDesc());
                    return true;
                }
                const direction = arg.toLowerCase().trim();
                if (!this.labyrinth.validateMove(direction)) {
                    return true;
                }
                this.labyrinth.moveCharacter(direction);
                this.labyrinth.moveMonster();
                this.enterNewArea();
                if (this.labyrinth.encounterMonster()) {
                    this.labyrinth.printMonster();
                    if (this.labyrinth.canKillMonster()) {
                        console.log('Seems like you have an appropriate item to take this monster down.');
                        return true;
                    }
                    else {
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
    onExit() {
        if (this.labyrinth.getCharacterCurrentAreaName() === 'Labyrinth Exit' &&
            this.labyrinth.checkForWin()) {
            console.log(`${this.labyrinth.getCharacterName()}! Congrats, you have found the treasure! You will be honored!`);
            return false;
        }
        console.log('Seems like you have not found the treasure yet. A true hero will not quit unless he/she finds the treasure.');
        return true;
    }
}
exports.default = Game;
//# sourceMappingURL=Game.js.map