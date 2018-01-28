"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Area_1 = require("./Area");
const Character_1 = require("./Character");
const Item_1 = require("./Item");
const Hazard_1 = require("./Hazard");
const Monster_1 = require("./Monster");
class Labyrinth {
    constructor(labyrinthData) {
        this.name = labyrinthData.name;
        this.desc = labyrinthData.desc;
        this.areas = this.createLabyrinthAreas(labyrinthData);
        this.character = new Character_1.default(labyrinthData.character.name, labyrinthData.character.desc);
        const monsterPos = {
            x: this.areas.length - 1,
            y: this.areas.length - 1
        };
        this.monster = new Monster_1.default(labyrinthData.monster.name, labyrinthData.monster.desc, monsterPos);
    }
    createLabyrinthAreas(labyrinthData) {
        const size = Math.sqrt(labyrinthData.areas.length);
        if (size % 1 !== 0) {
            throw 'Invalid matrix size: a valid matrix needs to be in a form of N x N';
        }
        const areas = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const areaData = labyrinthData.areas[i * size + j];
                row.push(new Area_1.default(areaData.name, areaData.desc));
            }
            areas.push(row);
        }
        this.addItemsToAreas(areas, labyrinthData.items);
        this.addHazardsToAreas(areas, labyrinthData.hazards);
        return areas;
    }
    addItemsToAreas(areas, itemData) {
        for (let i = 0; i < itemData.length; i++) {
            const currItemData = itemData[i];
            areas[Math.floor(i / areas.length)][i % areas.length].addItem(new Item_1.default(currItemData.name, currItemData.desc, currItemData.useDesc));
        }
    }
    addHazardsToAreas(areas, hazardData) {
        // Hard-coded hazard positions.
        // This can be improved in the future by randomly adding hazards to different areas.
        areas[0][1].addHazard(new Hazard_1.default(hazardData[0].name, hazardData[0].desc, hazardData[0].removeBy));
        areas[1][0].addHazard(new Hazard_1.default(hazardData[1].name, hazardData[1].desc, hazardData[1].removeBy));
    }
    getName() {
        return this.name;
    }
    getDesc() {
        return this.desc;
    }
    getCharacterName() {
        return this.character.getName();
    }
    getCharacterDesc() {
        return this.character.getDesc();
    }
    getCharacterCurrentArea() {
        const pos = this.character.getPosition();
        return this.areas[pos.x][pos.y];
    }
    getCharacterCurrentAreaName() {
        return this.getCharacterCurrentArea().getName();
    }
    getCharacterCurrentAreaDesc() {
        return this.getCharacterCurrentArea().getDesc();
    }
    getCharacterCurrentAreaHazard() {
        return this.getCharacterCurrentArea().getHazard();
    }
    printCharacterCurrentAreaItemDesc() {
        const item = this.getCharacterCurrentArea().getItem();
        if (item) {
            console.log(item.getDesc());
        }
    }
    printCharacterPocket() {
        this.character.printPocket();
    }
    printCharacterCurrentArea() {
        console.log(this.getCharacterCurrentAreaName().toUpperCase());
        console.log(this.getCharacterCurrentAreaDesc());
    }
    characterTakeItem(itemName) {
        const item = this.getCharacterCurrentArea().getItem();
        if (!item ||
            itemName.toLocaleLowerCase() !== item.getName().toLocaleLowerCase()) {
            return;
        }
        this.character.addItem(item);
        console.log(`You took the ${item.getName()} and put it in your pocket.`);
        const area = this.getCharacterCurrentArea();
        area.removeItem();
    }
    characterUseItem(itemName) {
        const itemNameLowerCase = itemName.toLowerCase().trim();
        const pocket = this.character.getPocket();
        const item = pocket.get(itemNameLowerCase);
        if (item) {
            const hazard = this.getCharacterCurrentAreaHazard();
            if (hazard &&
                item.getName().toLowerCase() ===
                    hazard.getRemoveBy().toLowerCase()) {
                this.character.useItem(item);
                this.getCharacterCurrentArea().removeHazard();
                this.printCharacterCurrentAreaItemDesc();
                this.promptAvailableDirections();
                return;
            }
            if (this.encounterMonster()) {
                this.character.useItem(item);
                this.monster = null;
                return;
            }
            console.log('You cannot use this item here.');
        }
        else {
            console.log('No such item found in your pocket.');
            this.character.printPocket();
        }
    }
    validateMove(direction) {
        const d = direction.toLowerCase().trim();
        const surr = this.getCharacterSurroundings();
        if (!surr[d]) {
            console.log('You cannot go that direction.');
            this.promptAvailableDirections();
            return false;
        }
        return true;
    }
    moveCharacter(direction) {
        const newPos = this.character.getPosition();
        switch (direction) {
            case 'north':
                newPos.x--;
                break;
            case 'east':
                newPos.y++;
                break;
            case 'south':
                newPos.x++;
                break;
            case 'west':
                newPos.y--;
                break;
            default:
                break;
        }
        this.character.setPosition(newPos);
    }
    getCharacterSurroundings() {
        const pos = this.character.getPosition();
        const areas = this.areas;
        // Check North
        const north = pos.x === 0 ? null : areas[pos.x - 1][pos.y];
        // Check East
        const east = pos.y === areas.length - 1 ? null : areas[pos.x][pos.y + 1];
        // Check South
        const south = pos.x === areas.length - 1 ? null : areas[pos.x + 1][pos.y];
        // Check West
        const west = pos.y === 0 ? null : areas[pos.x][pos.y - 1];
        const surroundings = {
            north: north,
            east: east,
            south: south,
            west: west
        };
        return surroundings;
    }
    promptAvailableDirections() {
        const surr = this.getCharacterSurroundings();
        const availableDirections = [
            'You can take the following directions:',
            surr.north ? 'North' : '',
            surr.east ? 'East' : '',
            surr.south ? 'South' : '',
            surr.west ? 'West' : ''
        ]
            .filter(item => item)
            .join('\n');
        console.log(availableDirections);
    }
    greeting() {
        console.log(`Hi, ${this.getCharacterName()}! ${this.getCharacterDesc()}. Welcome to ${this.name}`);
    }
    checkForWin() {
        const treasure = 'aegis';
        if (this.getCharacterCurrentArea().getName() === 'Labyrinth Exit' &&
            this.character.getPocket().has(treasure)) {
            return true;
        }
        return false;
    }
    // Monster moves in a clockwise direction.
    moveMonster() {
        if (!this.monster) {
            return;
        }
        const newPos = this.monster.getPosition();
        if (newPos.y > 0 && newPos.x === this.areas.length - 1) {
            newPos.y--;
        }
        else if (newPos.x > 0) {
            newPos.x--;
        }
        else if (newPos.y < this.areas.length - 1) {
            newPos.y++;
        }
        else {
            newPos.x++;
        }
        this.monster.setPosition(newPos);
    }
    // Returns true if the character encounters the monster
    // and has an appropriate item to kill the monster.
    // Otherwise, returns false.
    encounterMonster() {
        if (!this.monster) {
            return false;
        }
        const characterPos = this.character.getPosition();
        const monsterPos = this.monster.getPosition();
        return (characterPos.x === monsterPos.x && characterPos.y === monsterPos.y);
    }
    canKillMonster() {
        const pocket = this.character.getPocket();
        return pocket.has('pepper spray');
    }
    printMonster() {
        if (!this.monster) {
            return;
        }
        console.log(`You encountered ${this.monster.getName()}, ${this.monster.getDesc()}`);
    }
}
exports.default = Labyrinth;
//# sourceMappingURL=Labyrinth.js.map