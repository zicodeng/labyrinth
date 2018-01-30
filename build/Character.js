"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Character {
    constructor(name, desc) {
        this.name = name;
        this.desc = desc;
        this.position = { x: 0, y: 0 };
        this.pocket = new Map();
    }
    getName() {
        return this.name;
    }
    getDesc() {
        return this.desc;
    }
    getPosition() {
        return this.position;
    }
    setPosition(newPosition) {
        this.position = newPosition;
    }
    getPocket() {
        return this.pocket;
    }
    printPocket() {
        const itemList = Array.from(this.pocket.values()).map((item, i) => {
            return `(${i + 1})${item.getName()}`;
        });
        if (itemList.length === 0) {
            console.log('Your pocket is empty.');
            return;
        }
        console.log(`Pocket: ${itemList.join(' ')}`);
    }
    addItem(item) {
        this.pocket.set(item.getName().toLowerCase(), item);
    }
    useItem(item) {
        console.log(item.getUseDesc());
        this.removeItem(item);
    }
    removeItem(item) {
        this.pocket.delete(item.getName().toLocaleLowerCase());
    }
    move(areas, direction) {
        if (!this.validateMove(areas, direction)) {
            return false;
        }
        const newPos = this.position;
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
        this.position = newPos;
        return true;
    }
    validateMove(areas, direction) {
        const d = direction.toLowerCase().trim();
        const surr = this.getCharacterSurroundings(areas);
        if (!surr[d]) {
            console.log('You cannot go that direction.');
            return false;
        }
        return true;
    }
    getCharacterSurroundings(areas) {
        const pos = this.position;
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
}
exports.default = Character;
//# sourceMappingURL=Character.js.map