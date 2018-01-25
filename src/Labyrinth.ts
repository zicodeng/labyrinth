import Area from './Area';
import { LabyrinthData, AreaData } from 'interfaces';

class Labyrinth {
    private name: string;
    private desc: string;
    private areas: Area[][];

    constructor(labyrinthData: LabyrinthData) {
        this.name = labyrinthData.name;
        this.desc = labyrinthData.desc;
        this.areas = this.createLabyrinthAreas(labyrinthData.areas);
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
}

export default Labyrinth;
