"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Monster {
    constructor(name, desc, position) {
        this.name = name;
        this.desc = desc;
        this.position = position;
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
    // Monster moves in a clockwise direction.
    move(areas) {
        const newPos = this.position;
        if (newPos.y > 0 && newPos.x === areas.length - 1) {
            newPos.y--;
        }
        else if (newPos.x > 0) {
            newPos.x--;
        }
        else if (newPos.y < areas.length - 1) {
            newPos.y++;
        }
        else {
            newPos.x++;
        }
        this.position = newPos;
        return true;
    }
}
exports.default = Monster;
//# sourceMappingURL=Monster.js.map