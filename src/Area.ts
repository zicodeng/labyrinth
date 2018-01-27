import Item from './Item';

class Area {
    private item: Item | null = null;

    constructor(private name: string, private desc: string) {}

    public getName() {
        return this.name;
    }

    public getDesc() {
        return this.desc;
    }

    public addItem(item: Item) {
        this.item = item;
    }

    public getItem(): Item | null {
        return this.item;
    }

    public removeItem(): void {
        this.item = null;
    }
}

export default Area;
