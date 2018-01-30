import Area from './Area';

export interface Movable {
    move(areas: Area[][], direction?: string): boolean;
}
