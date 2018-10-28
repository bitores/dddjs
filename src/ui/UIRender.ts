import Base from "../Base";
import { UICamera } from "./UICamera";
import { UICanvas } from "./UICanvas";
import { GLTools } from "./GLTools";
import { Shape } from "./shape/Shape";

export class UIRender extends Base {
  public ctx: WebGLRenderingContext | null;
  private pool: Object[] = [];
  constructor(public canvas: UICanvas, public camera: UICamera) {
    super()
    this.ctx = canvas.ctx;
  }

  addRenderObject(obj: Shape, image: HTMLImageElement | null = null) {
    let shader = obj._material;
    if (!this.ctx || !shader) return;
    shader.init(this.ctx);
    let vbo = GLTools.createVBO(this.ctx, obj.vertices, false, true);
    let cbo = GLTools.createVBO(this.ctx, obj.colors, false, true);
    let tbo = GLTools.createVBO(this.ctx, obj.textCoords, false, true);
    let ibo = GLTools.createVBO(this.ctx, obj.indices, true, true);

    this.pool.push({
      obj,
      vbo,
      cbo,
      tbo,
      ibo,
      shader,
      name: obj.name,
    });

    obj._children.forEach(item => {
      this.addRenderObject(item, image);
    })
  }

  getTargetMatrix(obj) {
    if (obj._parent) {
      return obj._modelMatrix.clone().dot(this.getTargetMatrix(obj._parent))
    }
    return obj._modelMatrix;
  }


  renderItem(item: any) {
    if (this.ctx === null) return;
    let gl = this.ctx,
      shader = item.shader,
      vbo = item.vbo,
      cbo = item.cbo,
      tbo = item.tbo,
      ibo = item.ibo,
      obj = item.obj;

    shader.use();
    shader.upload(this.camera, obj);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.vertexAttribPointer(shader.location('position'), 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(shader.location('position'));

    if (shader.location('color')) {
      gl.bindBuffer(gl.ARRAY_BUFFER, cbo);
      gl.vertexAttribPointer(shader.location('color'), 4, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(shader.location('color'));
    }

    if (shader.location('a_TextCoord')) {
      gl.bindBuffer(gl.ARRAY_BUFFER, tbo);
      gl.vertexAttribPointer(shader.location('a_TextCoord'), 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(shader.location('a_TextCoord'));
    }


    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.drawElements(gl.TRIANGLES, obj.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  clean() {
    if (this.ctx === null) return;
    let gl = this.ctx;
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0.5, 0.5, 0.5, 0.9);
    gl.clearDepth(1.0);

    gl.viewport(0.0, 0.0, this.canvas.width, this.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  render() {
    this.clean()
    this.pool.forEach(item => {
      this.renderItem(item);
    })
  }

  get className() {
    return 'UIRender';
  }

  clone() {
    // return new UIShader(this.ctx, this.vertSource, this.fragSource, this.name);
  }

  toString() {
    return '()';
  }
}