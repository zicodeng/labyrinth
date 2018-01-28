"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hazard {
    constructor(name, desc, removeBy) {
        this.name = name;
        this.desc = desc;
        this.removeBy = removeBy;
    }
    getName() {
        return this.name;
    }
    getDesc() {
        return this.desc;
    }
    getRemoveBy() {
        return this.removeBy;
    }
}
exports.default = Hazard;
//# sourceMappingURL=Hazard.js.map