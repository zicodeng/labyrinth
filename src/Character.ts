import { Coordinate, Surroundings } from './interfaces';
import Item from './Item';
import { Pocket } from './interfaces';
import { Movable } from './Movable';
import Area from './Area';

class Character implements Movable {
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

    public move(areas: Area[][], direction: string): boolean {
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

    private validateMove(areas: Area[][], direction: string): boolean {
        const d = direction.toLowerCase().trim();
        const surr = this.getCharacterSurroundings(areas);
        if (!surr[d]) {
            console.log('You cannot go that direction.');
            return false;
        }
        return true;
    }

    public getCharacterSurroundings(areas: Area[][]): Surroundings {
        const pos = this.position;

        // Check North
        const north = pos.x === 0 ? null : areas[pos.x - 1][pos.y];

        // Check East
        const east =
            pos.y === areas.length - 1 ? null : areas[pos.x][pos.y + 1];

        // Check South
        const south =
            pos.x === areas.length - 1 ? null : areas[pos.x + 1][pos.y];

        // Check West
        const west = pos.y === 0 ? null : areas[pos.x][pos.y - 1];

        const surroundings: Surroundings = {
            north: north,
            east: east,
            south: south,
            west: west
        };

        return surroundings;
    }
}

export default Character;
