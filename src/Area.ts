import Item from './Item';
import Hazard from './Hazard';

class Area {
    private item: Item | null = null;
    private hazard: Hazard | null = null;

    constructor(private name: string, private desc: string) {}

    public getName(): string {
        return this.name;
    }

    public getDesc(): string {
        return this.desc;
    }

    public addItem(item: Item): void {
        this.item = item;
    }

    public getItem(): Item | null {
        return this.item;
    }

    public removeItem(): void {
        this.item = null;
    }

    public addHazard(hazard: Hazard): void {
        this.hazard = hazard;
    }

    public getHazard(): Hazard | null {
        return this.hazard;
    }

    public removeHazard(): void {
        this.hazard = null;
    }
}

export default Area;
