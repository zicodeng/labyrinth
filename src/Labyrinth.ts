import Area from './Area';
import {
    LabyrinthData,
    ItemData,
    Surroundings,
    HazardData
} from './interfaces';
import Character from './Character';
import Item from './Item';
import Hazard from './Hazard';

class Labyrinth {
    private name: string;
    private desc: string;
    private areas: Area[][];
    private character: Character;

    constructor(labyrinthData: LabyrinthData) {
        this.name = labyrinthData.name;
        this.desc = labyrinthData.desc;
        this.areas = this.createLabyrinthAreas(labyrinthData);
        const characterData = labyrinthData.character;
        this.character = new Character(characterData.name, characterData.desc);
    }

    private createLabyrinthAreas(labyrinthData: LabyrinthData): Area[][] {
        const size = Math.sqrt(labyrinthData.areas.length);
        if (size % 1 !== 0) {
            throw 'Invalid matrix size: a valid matrix needs to be in a form of N x N';
        }
        const areas: Area[][] = [];
        for (let i = 0; i < size; i++) {
            const row: Area[] = [];
            for (let j = 0; j < size; j++) {
                const areaData = labyrinthData.areas[i * size + j];
                row.push(new Area(areaData.name, areaData.desc));
            }
            areas.push(row);
        }

        this.addItemsToAreas(size, areas, labyrinthData.items);
        this.addHazardsToAreas(areas, labyrinthData.hazards);

        return areas;
    }

    private addItemsToAreas(
        size: number,
        areas: Area[][],
        itemData: ItemData[]
    ) {
        for (let i = 0; i < itemData.length; i++) {
            const currItemData = itemData[i];
            areas[Math.floor(i / size)][i % size].addItem(
                new Item(
                    currItemData.name,
                    currItemData.desc,
                    currItemData.useDesc
                )
            );
        }
    }

    private addHazardsToAreas(areas: Area[][], hazardData: HazardData[]) {
        // Hard-coded hazard positions.
        // This can be improved in the future by randomly adding hazards to different areas.
        areas[0][1].addHazard(
            new Hazard(
                hazardData[0].name,
                hazardData[0].desc,
                hazardData[0].removeBy
            )
        );
        areas[1][0].addHazard(
            new Hazard(
                hazardData[1].name,
                hazardData[1].desc,
                hazardData[1].removeBy
            )
        );
    }

    public getName(): string {
        return this.name;
    }

    public getDesc(): string {
        return this.desc;
    }

    public getCharacterName(): string {
        return this.character.getName();
    }

    public getCharacterDesc(): string {
        return this.character.getDesc();
    }

    private getCharacterCurrentArea(): Area {
        const pos = this.character.getPosition();
        return this.areas[pos.x][pos.y];
    }

    public getCharacterCurrentAreaName(): string {
        return this.getCharacterCurrentArea().getName();
    }

    public getCharacterCurrentAreaDesc(): string {
        return this.getCharacterCurrentArea().getDesc();
    }

    public getCharacterCurrentAreaHazard(): Hazard | null {
        return this.getCharacterCurrentArea().getHazard();
    }

    public printCharacterCurrentAreaItemDesc(): void {
        const item = this.getCharacterCurrentArea().getItem();
        if (item) {
            console.log(item.getDesc());
        }
    }

    public printCharacterPocket(): void {
        this.character.printPocket();
    }

    public printCharacterCurrentArea(): void {
        console.log(this.getCharacterCurrentAreaName().toUpperCase());
        console.log(this.getCharacterCurrentAreaDesc());
    }

    public characterTakeItem(itemName: string): void {
        const item = this.getCharacterCurrentArea().getItem();
        if (
            !item ||
            itemName.toLocaleLowerCase() !== item.getName().toLocaleLowerCase()
        ) {
            return;
        }
        this.character.addItem(item);
        console.log(
            `You took the ${item.getName()} and put it in your pocket.`
        );

        const area = this.getCharacterCurrentArea();
        area.removeItem();
    }

    public characterUseItem(itemName: string): boolean {
        const itemNameLowerCase = itemName.toLowerCase().trim();
        const pocket = this.character.getPocket();
        const item = pocket.get(itemNameLowerCase);
        if (item) {
            const hazard = this.getCharacterCurrentAreaHazard();
            if (
                hazard &&
                item.getName().toLowerCase() ===
                    hazard.getRemoveBy().toLowerCase()
            ) {
                this.character.useItem(item);
                this.getCharacterCurrentArea().removeHazard();
                return true;
            } else {
                console.log('You cannot use this item here.');
            }
        } else {
            console.log('No such item found in your pocket.');
            this.character.printPocket();
        }
        return false;
    }

    // If this move is successful, return true;
    // otherwise, return false.
    public moveCharacter(direction: string): boolean {
        const d = direction.toLowerCase().trim();
        const surr = this.getCharacterSurroundings();
        if (!surr[d]) {
            console.log('You cannot go that direction.');
            this.promptAvailableDirections();
            return false;
        }
        this.setCharacterPosition(d);
        return true;
    }

    private setCharacterPosition(direction: string): void {
        const newPos = this.character.getPosition();
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
        this.character.setPosition(newPos);
    }

    public getCharacterSurroundings(): Surroundings {
        const pos = this.character.getPosition();
        const areas = this.areas;

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

    public promptAvailableDirections(): void {
        const surr = this.getCharacterSurroundings();
        const availableDirections = [
            'You can take the following directions:',
            surr.north ? 'North' : '',
            surr.east ? 'East' : '',
            surr.south ? 'South' : '',
            surr.west ? 'West' : ''
        ]
            .filter(item => item)
            .join('\n');
        console.log(availableDirections);
    }

    public greeting(): void {
        console.log(
            `Hi, ${this.getCharacterName()}! ${this.getCharacterDesc()}. Welcome to ${
                this.name
            }`
        );
    }
}

export default Labyrinth;
