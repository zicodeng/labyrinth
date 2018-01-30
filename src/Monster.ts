import { Coordinate } from './interfaces';
import { Movable } from './Movable';
import Area from './Area';

class Monster implements Movable {
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

    // Monster moves in a clockwise direction.
    public move(areas: Area[][]): boolean {
        const newPos = this.position;
        if (newPos.y > 0 && newPos.x === areas.length - 1) {
            newPos.y--;
        } else if (newPos.x > 0) {
            newPos.x--;
        } else if (newPos.y < areas.length - 1) {
            newPos.y++;
        } else {
            newPos.x++;
        }
        this.position = newPos;
        return true;
    }
}

export default Monster;
