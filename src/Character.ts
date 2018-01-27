import { Coordinate } from './interfaces';

class Character {
    private position: Coordinate = { x: 0, y: 0 };
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
}

export default Character;
