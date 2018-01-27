class Item {
    constructor(
        private name: string,
        private desc: string,
        private useDesc: string
    ) {}

    public getName(): string {
        return this.name;
    }

    public getDesc(): string {
        return this.desc;
    }

    public getUseDesc(): string {
        return this.useDesc;
    }
}

export default Item;
