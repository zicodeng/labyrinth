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
}
exports.default = Monster;
//# sourceMappingURL=Monster.js.map