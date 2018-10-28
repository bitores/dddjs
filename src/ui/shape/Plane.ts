import { Shape } from "./Shape";

export class Plane extends Shape {
  constructor(name: string = 'plan') {
    super(name)
    this._gemotry.setVertices([
      1.0, 1.0, 1.0,
      1.0, -1.0, 1.0,
      -1.0, -1.0, 1.0,
      -1.0, 1.0, 1.0
    ])

    this._gemotry.setColors([
      0, 0, 1, 1,
      1, 0, 0, 1,
      0, 1, 0, 1,
      1, 0, 1, 1
    ])

    this._gemotry.setTextCoords([
      0.0, 1.0,
      1.0, 1.0,
      1.0, 0.0,
      0.0, 0.0,
    ])

    this._gemotry.setIndices([
      0, 1, 2,
      0, 2, 3
    ])
  }
}