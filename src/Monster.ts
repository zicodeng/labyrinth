import { Coordinate } from './interfaces';

class Monster {
    constructor(
        private name: string,
        private desc: string,
        private position: Coordinate
    ) {}

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

export default Monster;
