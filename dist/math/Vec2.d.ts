declare abstract class Base {
    name: string;
    abstract toString(): string;
}
export declare class Vec2 extends Base {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    add(x: number, y: number): this;
    toString(): string;
}
export {};
