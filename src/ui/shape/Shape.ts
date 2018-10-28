import { Object3d } from "../../core/Object3d";

export class Shape extends Object3d {
  constructor(name: string = 'plan') {
    super(name)
    this._gemotry.setVertices([
      0, 0, 0,
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
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

  public get vertices() {
    return this._gemotry.vertices;
  }

  public get indices() {
    return this._gemotry.indeices;
  }

  public get colors() {
    return this._gemotry.colors;
  }

  public get textCoords() {
    return this._gemotry.textCoords;
  }
}