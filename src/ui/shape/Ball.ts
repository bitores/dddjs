import { Shape } from "./Shape";

export class Ball extends Shape {
  constructor(name: string = 'ball', x: number = 0, y: number = 0) {
    super(name)

    var latitudeBands = 25;//纬度带
    var longitudeBands = 25;//经度带
    var positions: number[] = [];//存储x，y，z坐标
    var colors: number[] = [];//存储x，y，z坐标
    var indices: number[] = [];//三角形列表（索引值）
    var textureCoordData: number[] = [];//存储纹理坐标u，v，纹理坐标与顶点坐标一一对应

    for (var latNum = 0; latNum <= latitudeBands; latNum++) {
      var lat = latNum * Math.PI / latitudeBands - Math.PI / 2;//纬度范围从-π/2到π/2
      var sinLat = Math.sin(lat);
      var cosLat = Math.cos(lat);

      for (var longNum = 0; longNum <= longitudeBands; longNum++) {
        var lon = longNum * 2 * Math.PI / longitudeBands - Math.PI;//经度范围从-π到π
        var sinLon = Math.sin(lon);
        var cosLon = Math.cos(lon);

        var x = cosLat * cosLon;
        var y = cosLat * sinLon;
        var z = sinLat;
        var u = (longNum / longitudeBands);
        var v = (latNum / latitudeBands);

        positions.push(x);
        positions.push(y);
        positions.push(z);
        colors.push(x);
        colors.push(y);
        colors.push(z);
        colors.push(1.0);
        textureCoordData.push(u);
        textureCoordData.push(v);
      }
    }
    for (var latNum = 0; latNum < latitudeBands; latNum++) {
      for (var longNum = 0; longNum < longitudeBands; longNum++) {
        var first = latNum * (longitudeBands + 1) + longNum;
        var second = first + longitudeBands + 1;

        indices.push(first);
        indices.push(first + 1);
        indices.push(second);

        indices.push(second);
        indices.push(second + 1);
        indices.push(first + 1);
      }
    }

    this._gemotry.setVertices(positions)

    this._gemotry.setColors(colors)

    this._gemotry.setTextCoords(textureCoordData)

    this._gemotry.setIndices(indices)
  }


}