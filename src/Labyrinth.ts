import Area from './Area';
import { LabyrinthData, ItemData, HazardData, Coordinate } from './interfaces';
import Character from './Character';
import Item from './Item';
import Hazard from './Hazard';
import Monster from './Monster';

class Labyrinth {
    private name: string;
    private desc: string;
    private areas: Area[][];
    private character: Character;
    private monster: Monster | null;

    constructor(labyrinthData: LabyrinthData) {
        this.name = labyrinthData.name;
        this.desc = labyrinthData.desc;
        this.areas = this.createLabyrinthAreas(labyrinthData);
        this.character = new Character(
            labyrinthData.character.name,
            labyrinthData.character.desc
        );

        const monsterPos: Coordinate = {
            x: this.areas.length - 1,
            y: this.areas.length - 1
        };
        this.monster = new Monster(
            labyrinthData.monster.name,
            labyrinthData.monster.desc,
            monsterPos
        );
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

        this.addItemsToAreas(areas, labyrinthData.items);
        this.addHazardsToAreas(areas, labyrinthData.hazards);

        return areas;
    }

    private addItemsToAreas(areas: Area[][], itemData: ItemData[]) {
        for (let i = 0; i < itemData.length; i++) {
            const currItemData = itemData[i];
            areas[Math.floor(i / areas.length)][i % areas.length].addItem(
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

    public getCharacterCurrentArea(): Area {
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

    public characterUseItem(itemName: string) {
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

                this.printCharacterCurrentAreaItemDesc();
                this.promptAvailableDirections();
                return;
            }

            if (this.encounterMonster()) {
                this.character.useItem(item);
                this.monster = null;
                return;
            }

            console.log('You cannot use this item here.');
        } else {
            console.log('No such item found in your pocket.');
            this.character.printPocket();
        }
    }

    public promptAvailableDirections(): void {
        const surr = this.character.getCharacterSurroundings(this.areas);
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

    // Returns a boolean to indicate if the move has been made successfully.
    public move(direction: string): boolean {
        if (
            !this.character.move(this.areas, direction) ||
            (this.monster && !this.monster.move(this.areas))
        ) {
            this.promptAvailableDirections();
            return false;
        }
        return true;
    }

    public greeting(): void {
        console.log(
            `Hi, ${this.getCharacterName()}! ${this.getCharacterDesc()}. Welcome to ${
                this.name
            }`
        );
    }

    public checkForWin(): boolean {
        const treasure = 'aegis';
        if (
            this.getCharacterCurrentArea().getName() === 'Labyrinth Exit' &&
            this.character.getPocket().has(treasure)
        ) {
            return true;
        }
        return false;
    }

    // Returns true if the character encounters the monster
    // and has an appropriate item to kill the monster.
    // Otherwise, returns false.
    public encounterMonster(): boolean {
        if (!this.monster) {
            return false;
        }
        const characterPos = this.character.getPosition();
        const monsterPos = this.monster.getPosition();

        return (
            characterPos.x === monsterPos.x && characterPos.y === monsterPos.y
        );
    }

    public canKillMonster(): boolean {
        const pocket = this.character.getPocket();
        return pocket.has('pepper spray');
    }

    public printMonster(): void {
        if (!this.monster) {
            return;
        }
        console.log(
            `You encountered ${this.monster.getName()}, ${this.monster.getDesc()}`
        );
    }
}

export default Labyrinth;
