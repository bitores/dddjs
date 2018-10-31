import { Shape } from "./Shape";

export class AxesHelper extends Shape {
  constructor(name: string = 'AxesHelper') {
    super(name)
    this._gemotry.setVertices([
      0.0, 0.0, 0.0,
      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 1.0
    ])

    this._gemotry.setColors([
      1, 1, 1, 1,
      1, 0, 0, 1,
      0, 1, 0, 1,
      1, 0, 1, 1
    ])

    this._gemotry.setTextCoords([
      1.0, 1.0,
      1.0, 0.0,
      0.0, 0.0,
      0.0, 1.0,
    ])

    this._gemotry.setIndices([
      0, 1,
      0, 2,
      0, 3
    ])
  }
}