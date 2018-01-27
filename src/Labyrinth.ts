import Area from './Area';
import {
    LabyrinthData,
    AreaData,
    Coordinate,
    Surroundings
} from './interfaces';
import Character from './Character';

class Labyrinth {
    private name: string;
    private desc: string;
    private areas: Area[][];
    private character: Character;

    constructor(labyrinthData: LabyrinthData) {
        this.name = labyrinthData.name;
        this.desc = labyrinthData.desc;
        this.areas = this.createLabyrinthAreas(labyrinthData.areas);
        const characterData = labyrinthData.character;
        this.character = new Character(characterData.name, characterData.desc);
    }

    public createLabyrinthAreas(labyrinthAreaData: AreaData[]): Area[][] {
        const size = Math.sqrt(labyrinthAreaData.length);
        if (size % 1 !== 0) {
            throw 'Invalid matrix size: a valid matrix needs to be in a form of N x N';
        }
        const areas: Area[][] = [];
        for (let i = 0; i < size; i++) {
            const row: Area[] = [];
            for (let j = 0; j < size; j++) {
                const areaData = labyrinthAreaData[i * size + j];
                row.push(new Area(areaData.name, areaData.desc));
            }
            areas.push(row);
        }
        return areas;
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

    public getCharacterPosition(): Coordinate {
        return this.character.getPosition();
    }

    public setCharacterPosition(newPosition: Coordinate): void {
        this.character.setPosition(newPosition);
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
