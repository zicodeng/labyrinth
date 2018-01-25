import { LabyrinthData } from 'interfaces';

class Labyrinth {
    private name: string;
    private desc: string;

    constructor(labyrinthData: LabyrinthData) {
        this.name = labyrinthData.name;
        this.desc = labyrinthData.desc;
    }

    public getName(): string {
        return this.name;
    }

    public getDesc(): string {
        return this.desc;
    }
}

export default Labyrinth;
