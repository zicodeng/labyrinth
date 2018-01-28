"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    constructor(name, desc, useDesc) {
        this.name = name;
        this.desc = desc;
        this.useDesc = useDesc;
    }
    getName() {
        return this.name;
    }
    getDesc() {
        return this.desc;
    }
    getUseDesc() {
        return this.useDesc;
    }
}
exports.default = Item;
//# sourceMappingURL=Item.js.map