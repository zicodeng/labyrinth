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
}
exports.default = Character;
//# sourceMappingURL=Character.js.map