import { Coordinate } from './interfaces';
import Item from './Item';
import { Pocket } from './interfaces';

class Character {
    private position: Coordinate = { x: 0, y: 0 };
    private pocket: Pocket = new Map<string, Item>();

    constructor(private name: string, private desc: string) {}

    public getName(): string {
        return this.name;
    }

    public getDesc(): string {
        return this.desc;
    }

    public getPosition(): Coordinate {
        return this.position;
    }

    public setPosition(newPosition: Coordinate): void {
        this.position = newPosition;
    }

    public getPocket(): Pocket {
        return this.pocket;
    }

    public printPocket(): void {
        const itemList = Array.from(this.pocket.values()).map((item, i) => {
            return `(${i + 1})${item.getName()}`;
        });
        if (itemList.length === 0) {
            console.log('Your pocket is empty.');
            return;
        }
        console.log(`Pocket: ${itemList.join(' ')}`);
    }

    public addItem(item: Item) {
        this.pocket.set(item.getName().toLowerCase(), item);
    }

    public useItem(item: Item): void {
        console.log(item.getUseDesc());
        this.removeItem(item);
    }

    private removeItem(item: Item) {
        this.pocket.delete(item.getName().toLocaleLowerCase());
    }
}

export default Character;
