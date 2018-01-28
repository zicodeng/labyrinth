import Area from './Area';
import Item from './Item';

export interface LabyrinthData {
    name: string;
    desc: string;
    areas: AreaData[];
    items: ItemData[];
    hazards: HazardData[];
    character: CharacterData;
}

export interface AreaData {
    name: string;
    desc: string;
}

export interface ItemData {
    name: string;
    desc: string;
    useDesc: string;
}

export interface HazardData {
    name: string;
    desc: string;
    removeBy: string;
}

interface CharacterData {
    name: string;
    desc: string;
}

export interface Coordinate {
    x: number;
    y: number;
}

export interface Surroundings {
    north: Area | null;
    east: Area | null;
    south: Area | null;
    west: Area | null;

    // Add an index signature to avoid index signature of object type
    // implicitly has type 'any' error.
    [key: string]: Area | null;
}

export type Pocket = Map<string, Item>;
