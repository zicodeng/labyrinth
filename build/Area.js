"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Area {
    constructor(name, desc) {
        this.name = name;
        this.desc = desc;
        this.item = null;
        this.hazard = null;
    }
    getName() {
        return this.name;
    }
    getDesc() {
        return this.desc;
    }
    addItem(item) {
        this.item = item;
    }
    getItem() {
        return this.item;
    }
    removeItem() {
        this.item = null;
    }
    addHazard(hazard) {
        this.hazard = hazard;
    }
    getHazard() {
        return this.hazard;
    }
    removeHazard() {
        this.hazard = null;
    }
}
exports.default = Area;
//# sourceMappingURL=Area.js.map